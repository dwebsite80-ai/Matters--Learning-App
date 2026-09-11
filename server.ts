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

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
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

  app.use(express.json());

  // Health checks
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });
  app.get('/healthz', (req, res) => {
    res.json({ status: 'ok' });
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
        return res.status(400).json({ error: 'Message cannot be empty' });
      }

      const isHindi = language === 'hi';
      const course = getCourseScope(context?.subjectId, context);

      // Server-Side Gemini AI Pipeline
      const gemini = getGeminiClient();
      let generatedDisplayText = '';
      let generatedSpeechText = '';
      let quickActions: string[] = [];

      if (gemini) {
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
CORE IDENTITY:
You behave as: "General AI assistant + current course expert".
The current course is your specialty and area of deep focus, NOT a restriction or boundary.

CRITICAL MANDATES:
1. TIA MUST ANSWER ALL REASONABLE QUESTIONS:
   - Whatever the user asks, answer the ACTUAL latest question: "${userText}".
   - Remove every course boundary. Never refuse or restrict the user.
   - If the question relates to the current course (${course.name}) -> Answer with deep course expertise.
   - If the question is about general knowledge, public figures (e.g. Narendra Modi, Virat Kohli), programming (e.g. Python), recipes (e.g. Pizza), science, or everyday life -> Answer directly, accurately, and informatively!
   - Connect naturally with the current course ONLY IF it makes intuitive sense (e.g. connecting GDP to Economics). If not relevant, answer normally and helpfully.
   - NEVER, UNDER ANY CIRCUMSTANCES, SAY:
     - "This is outside your course."
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
     - speechText: Natural spoken Hindi in pure DEVANAGARI script for the Indian TTS engine (hi-IN). English technical names (e.g. Python, GDP, Virat Kohli) can stay, but all conversational Hindi words MUST be in Devanagari script so TTS pronounces them properly. DO NOT put asterisks (*), markdown hashes (#), bullet points, URLs, or emojis in speechText.
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

          const userContextPrompt = `CURRENT_COURSE: ${course.name} (${course.description})
ACTIVE_LESSON_TITLE: ${context?.lessonTitle || course.name}
${lessonSections ? `ACTIVE_LESSON_SUMMARY:\n${lessonSections.slice(0, 400)}\n` : ''}
${recentHistory ? `CONVERSATION_HISTORY:\n${recentHistory}\n` : ''}
USER_LATEST_QUESTION: "${userText}"
TARGET_LANGUAGE: ${isHindi ? 'Hindi (speechText in Devanagari script)' : 'English'}`;

          const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
          // Prioritize gemini-3.1-flash-lite for ultra-fast, high-quota response
          const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
          let response: any = null;

          for (let i = 0; i < modelsToTry.length; i++) {
            const modelName = modelsToTry[i];
            try {
              response = await gemini.models.generateContent({
                model: modelName,
                contents: userContextPrompt,
                config: {
                  systemInstruction: systemPrompt,
                  temperature: 0.7,
                  maxOutputTokens: 650,
                  responseMimeType: 'application/json',
                },
              });
              if (response?.text) break;
            } catch (err: any) {
              const isHighDemand =
                err?.status === 503 ||
                err?.message?.includes('503') ||
                err?.message?.includes('high demand') ||
                err?.message?.includes('UNAVAILABLE');
              console.info(
                `Model ${modelName} temporarily busy${isHighDemand ? ' (high demand spike)' : ''}, checking next fallback...`
              );
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

            try {
              const parsed = JSON.parse(rawText);
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
          console.warn('Gemini error during Tia chat:', geminiErr?.message || geminiErr);
        }
      }

      // If AI generation failed, DO NOT show lesson content as answer!
      // Provide the clean, graceful connection message requested by user.
      if (!generatedDisplayText) {
        generatedDisplayText = isHindi
          ? 'Oops, Tia ka connection thoda slow ho gaya 😅. Ek baar phir try karo.'
          : "Oops, Tia's connection hit a slight bump 😅. Please try asking again!";
        generatedSpeechText = isHindi
          ? 'Oops, Tia ka connection thoda slow ho gaya. Ek baar phir try karo.'
          : "Oops, Tia's connection hit a slight bump. Please try asking again!";
        quickActions = isHindi
          ? ['फिर से पूछें', `💡 ${course.name} समझाइए`, '🎯 झटपट क्विज़']
          : ['Ask again', `💡 Explain ${course.name}`, '🎯 Quick quiz'];
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
    } catch (err) {
      console.error('Error handling /api/tia/chat:', err);
      return res.status(500).json({ error: 'Internal server error processing Tia chat' });
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
