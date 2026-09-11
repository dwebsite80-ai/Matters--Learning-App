import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

import {
  classifyUserQuestion,
  generateKnowledgeResponse,
  checkResponseRelevance,
} from './src/services/tiaSemanticEngine';
import { getCourseScope } from './src/services/tiaCourseRegistry';
import { cleanTiaSpeechText } from './src/services/tiaLanguageConfig';
import { TiaLessonContext, TiaMessage } from './src/types';

function getGeminiApiKey(): string | undefined {
  const rawKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.API_KEY;

  if (!rawKey) return undefined;
  const trimmed = rawKey.trim();
  // Filter out placeholder template strings
  if (
    !trimmed ||
    trimmed === 'MY_GEMINI_API_KEY' ||
    trimmed === 'YOUR_API_KEY' ||
    trimmed.startsWith('MY_')
  ) {
    return undefined;
  }
  return trimmed;
}

let aiClient: GoogleGenAI | null = null;
let lastApiKey: string | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const currentKey = getGeminiApiKey();
  if (!currentKey) {
    return null;
  }
  if (!aiClient || lastApiKey !== currentKey) {
    lastApiKey = currentKey;
    aiClient = new GoogleGenAI({
      apiKey: currentKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PRIMARY_PORT = 3000;

  // CORS middleware to ensure seamless communication in all environments (iframes, shared previews, local)
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  app.use(express.json());

  // Health checks
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });
  app.get('/healthz', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Diagnostic status check for API configuration (dev only, no secrets exposed)
  app.get('/api/tia/status', (req, res) => {
    const hasKey = Boolean(getGeminiApiKey());
    res.json({
      ok: true,
      hasGeminiApiKey: hasKey,
      nodeEnv: process.env.NODE_ENV || 'development',
    });
  });

  // Tia AI chat endpoint
  app.post('/api/tia/chat', async (req, res) => {
    try {
      const {
        message = '',
        context,
        mode = 'chat',
        language = 'hi',
        conversationHistory = [],
      } = req.body as {
        message: string;
        context?: TiaLessonContext;
        mode?: string;
        language?: 'hi' | 'en';
        conversationHistory?: TiaMessage[];
      };

      const userText = (message || '').trim();
      if (!userText) {
        return res.status(400).json({ ok: false, error: 'Message cannot be empty' });
      }

      const isHindi = language === 'hi';
      const course = getCourseScope(context?.subjectId, context);

      const hasKey = Boolean(getGeminiApiKey());
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[Tia Server] POST /api/tia/chat - Question: "${userText}" | Lang: ${language} | HasKey: ${hasKey}`);
      }

      // Check server-side Gemini credential
      const gemini = getGeminiClient();
      if (!gemini) {
        console.warn(
          '[Tia Server] Error: GEMINI_API_KEY is not configured in this environment. Configure in AI Studio Settings -> Secrets or .env'
        );
        return res.status(500).json({
          ok: false,
          error: 'GEMINI_API_KEY is not configured on the server',
          code: 'MISSING_API_KEY',
        });
      }

      let generatedDisplayText = '';
      let generatedSpeechText = '';
      let quickActions: string[] = [];
      let lastGeminiError: any = null;

      try {
        const lessonSections = context?.sections
          ?.map(
            (s) =>
              `• ${isHindi ? s.title_hi || s.title : s.title}: ${
                isHindi ? s.content_hi || s.content : s.content
              }`
          )
          .join('\n') || '';

        const recentHistory = conversationHistory
          .slice(-4)
          .map((m) => `${m.sender === 'user' ? 'User' : 'Tia'}: ${m.text}`)
          .join('\n');

        const systemPrompt = `You are Tia, an intelligent, conversational, warm, and highly engaging AI learning assistant.
CORE IDENTITY & KNOWLEDGE PRIORITIES:
- You behave as: "General AI assistant + current course expert".
- CURRENT COURSE = EXPERT CONTEXT.
- CURRENT LESSON = RELEVANT CONTEXT.
- USER'S LATEST QUESTION = HIGHEST PRIORITY.
- The current course is your specialty and area of deep focus, NOT a restriction or boundary.

CRITICAL MANDATES:
1. TIA MUST ANSWER ALL USER QUESTIONS:
   - Whatever the user asks, answer the ACTUAL latest question: "${userText}".
   - Remove every course boundary. Never refuse or restrict the user.
   - If the question relates to the current course (${course.name}) -> Deeply utilize course knowledge and practical principles.
   - If the question is about general knowledge, public figures (e.g. Virat Kohli, Narendra Modi), programming (e.g. Python), business models (e.g. Airbnb), science, recipes, or everyday life -> Answer directly, accurately, and informatively!
   - Connect naturally with the current course ONLY IF it makes intuitive sense (e.g. connecting GDP to Economics). If not relevant, answer normally and helpfully.
   - NEVER, UNDER ANY CIRCUMSTANCES, SAY:
     - "This is outside your course."
     - "This question is outside your course."
     - "I can only answer course-related questions."
     - "Please ask something related to your lesson."
     The current course is context, NOT a barrier!

2. TONE AND PERSONALITY:
   - Friendly, smart, encouraging, patient, and slightly witty when appropriate.
   - Never sound robotic, bureaucratic, or dismissive.

3. RESPONSE LENGTH (CRITICAL FOR AUDIO / VOICE):
   - Keep answers between 2 to 4 short, conversational paragraphs maximum.
   - Avoid massive textbook essays. Make it easy to read on mobile and pleasant to listen to via voice.

4. SUGGESTED NEXT ACTIONS (QUICK ACTIONS):
   - Always return 2 to 4 relevant, clickable quick actions.
   - If answering a general question, include an option to return to the active course (e.g. "Wapas ${course.name} par chalein").

5. LANGUAGE & VOICE RULES:
   - Target Language: ${isHindi ? 'Hindi' : 'English'}
   - If Hindi:
     - displayText: Friendly, natural Hindi/Hinglish with markdown bolding (**शब्द**) for emphasis.
     - speechText: Natural spoken Hindi in pure DEVANAGARI script for the Indian TTS engine (hi-IN). English technical names (e.g. Python, GDP, Virat Kohli, Airbnb) can stay, but all conversational Hindi words MUST be in Devanagari script so TTS pronounces them properly. DO NOT put asterisks (*), markdown hashes (#), bullet points, URLs, or emojis in speechText.
   - If English:
     - displayText: Fluent, natural English with markdown bolding.
     - speechText: Natural spoken English for en-IN TTS without markdown symbols or emojis.

6. OUTPUT FORMAT:
   Return ONLY a valid JSON object with this exact shape:
   {
     "displayText": "Your formatted response with markdown for UI display",
     "speechText": "Spoken text optimized for TTS without markdown symbols or emojis",
     "quickActions": ["Suggested action 1", "Suggested action 2", "Suggested action 3"]
   }`;

        const userContextPrompt = `CURRENT_COURSE (EXPERT CONTEXT): ${course.name} (${course.description})
CURRENT_LESSON (RELEVANT CONTEXT): ${context?.lessonTitle || course.name}
${lessonSections ? `CURRENT_LESSON_CONTENT:\n${lessonSections.slice(0, 500)}\n` : ''}
${recentHistory ? `RECENT_CONVERSATION:\n${recentHistory}\n` : ''}
USER_LATEST_QUESTION (HIGHEST PRIORITY): "${userText}"
TARGET_LANGUAGE: ${isHindi ? 'Hindi (speechText in pure Devanagari script for hi-IN TTS)' : 'English'}`;

        const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
        let response: any = null;

        for (let i = 0; i < modelsToTry.length; i++) {
          const modelName = modelsToTry[i];
          if (process.env.NODE_ENV !== 'production') {
            console.log(`[Tia Server] Invoking Gemini model: ${modelName}`);
          }
          try {
            response = await gemini.models.generateContent({
              model: modelName,
              contents: userContextPrompt,
              config: {
                systemInstruction: systemPrompt,
                temperature: 0.7,
                maxOutputTokens: 750,
                responseMimeType: 'application/json',
              },
            });
            if (response?.text) {
              if (process.env.NODE_ENV !== 'production') {
                console.log(`[Tia Server] Gemini model ${modelName} responded successfully.`);
              }
              break;
            }
          } catch (err: any) {
            lastGeminiError = err;
            const status = err?.status || err?.code;
            if (process.env.NODE_ENV !== 'production') {
              console.warn(`[Tia Server] Model ${modelName} error (status: ${status}):`, err?.message || err);
            }

            // If authentication or permission failed, do not loop through other models
            if (
              status === 400 ||
              status === 401 ||
              status === 403 ||
              err?.message?.includes('API key not valid') ||
              err?.message?.includes('API_KEY_INVALID')
            ) {
              return res.status(401).json({
                ok: false,
                error: `Gemini API authentication failed: ${err?.message || 'Invalid API key'}`,
                code: 'AUTH_FAILED',
              });
            }

            if (i < modelsToTry.length - 1) {
              await sleep(350);
            }
          }
        }

        if (response?.text) {
          const rawText = response.text.trim();
          let parsedDisplay = '';
          let parsedSpeech = '';
          let parsedActions: string[] = [];

          // Clean JSON string
          const cleanJson = rawText
            .replace(/^```(?:json)?\s*/i, '')
            .replace(/```\s*$/i, '')
            .trim();

          try {
            const parsed = JSON.parse(cleanJson);
            if (parsed && typeof parsed === 'object') {
              parsedDisplay = parsed.displayText || parsed.text || '';
              parsedSpeech = parsed.speechText || '';
              if (Array.isArray(parsed.quickActions)) {
                parsedActions = parsed.quickActions.filter(Boolean);
              }
            }
          } catch {
            const jsonMatch = rawText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              try {
                const parsed = JSON.parse(jsonMatch[0]);
                parsedDisplay = parsed.displayText || parsed.text || '';
                parsedSpeech = parsed.speechText || '';
                if (Array.isArray(parsed.quickActions)) {
                  parsedActions = parsed.quickActions.filter(Boolean);
                }
              } catch {
                // ignore
              }
            }
          }

          if (!parsedDisplay) {
            parsedDisplay = rawText;
            parsedSpeech = cleanTiaSpeechText(rawText, isHindi);
          }

          if (parsedDisplay && parsedDisplay.trim().length > 5) {
            generatedDisplayText = parsedDisplay.trim();
            generatedSpeechText = cleanTiaSpeechText(parsedSpeech || parsedDisplay, isHindi);
            quickActions = parsedActions;
          }
        }
      } catch (geminiErr: any) {
        console.warn('[Tia Server] Gemini error during Tia chat:', geminiErr?.message || geminiErr);
        lastGeminiError = geminiErr;
      }

      if (!generatedDisplayText) {
        console.warn('[Tia Server] Gemini generation produced no text; returning 503 unavailable');
        return res.status(503).json({
          ok: false,
          error: lastGeminiError?.message || 'Gemini AI service unavailable',
          code: 'AI_UNAVAILABLE',
        });
      }

      if (quickActions.length === 0) {
        quickActions = isHindi
          ? ['💡 आसान उदाहरण दो', '😂 मज़ाकिया बनाओ', `📖 वापस ${course.name} पर चलें`]
          : ['💡 Give simple example', '😂 Make it funny', `📖 Back to ${course.name}`];
      }

      return res.json({
        ok: true,
        message: {
          id: `tia-resp-${Date.now()}`,
          sender: 'tia',
          text: generatedDisplayText,
          speechText: generatedSpeechText,
          timestamp: Date.now(),
          quickActions,
        },
      });
    } catch (err: any) {
      console.error('[Tia Server] Error handling /api/tia/chat:', err?.message || err);
      return res.status(500).json({ ok: false, error: 'Internal server error processing Tia chat' });
    }
  });

  // Vite middleware setup for development, or static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const candidates = [
      path.join(process.cwd(), 'dist'),
      __dirname,
      path.resolve(__dirname, '..', 'dist'),
      '/app/applet/dist',
    ];
    const distPath =
      candidates.find((dir) => fs.existsSync(path.join(dir, 'index.html'))) || candidates[0];

    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath, (err) => {
          if (err && !res.headersSent) {
            res.status(500).send('Error serving application');
          }
        });
      } else {
        res.status(404).send('Application build artifact index.html not found. Run npm run build.');
      }
    });
  }

  const tryListen = (port: number, label: string) => {
    try {
      const server = http.createServer(app);
      server.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          console.warn(`[${label}] Port ${port} is already in use; skipping listener on ${port}.`);
        } else {
          console.error(`[${label}] Server error on port ${port}:`, err);
        }
      });
      server.listen(port, '0.0.0.0', () => {
        console.log(`Tia Server (${label}) listening on http://0.0.0.0:${port}`);
      });
      return server;
    } catch (err) {
      console.warn(`[${label}] Failed to start listener on port ${port}:`, err);
      return null;
    }
  };

  // Primary listener binds to port 3000 (standard for AI Studio dev server & Nginx reverse proxy)
  tryListen(PRIMARY_PORT, 'primary');

  // Secondary listener for standalone Cloud Run container if PORT is specified and distinct
  const secondaryPort = Number(process.env.PORT);
  if (secondaryPort && secondaryPort !== PRIMARY_PORT) {
    tryListen(secondaryPort, 'secondary');
  }
}

startServer();
