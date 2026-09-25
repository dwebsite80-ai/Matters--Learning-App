import { GoogleGenAI } from '@google/genai';
import { getCourseScope } from './tiaCourseRegistry';
import { cleanTiaSpeechText } from './tiaLanguageConfig';
import { TiaLessonContext, TiaMessage } from '../types';

export function getGeminiApiKey(): string | undefined {
  const rawKey =
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
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

export function getGeminiClient(): GoogleGenAI | null {
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

export interface TiaChatRequestBody {
  message?: string;
  question?: string;
  userText?: string;
  prompt?: string;
  text?: string;
  input?: string;
  context?: TiaLessonContext | null;
  course?: any;
  currentCourse?: any;
  lesson?: any;
  currentLesson?: any;
  relevantCourseContext?: any;
  mode?: string;
  language?: 'hi' | 'en';
  conversationHistory?: any[];
  history?: any[];
  messages?: any[];
}

export interface TiaChatResult {
  status: number;
  data: {
    ok: boolean;
    error?: string;
    code?: string;
    text?: string;
    answer?: string;
    displayText?: string;
    speechText?: string;
    quickActions?: string[];
    message?: TiaMessage;
  };
}

export async function processTiaChat(body: TiaChatRequestBody): Promise<TiaChatResult> {
  // 1. Extract question/message from any common parameter name
  const rawUserText =
    body.message ||
    body.question ||
    body.userText ||
    body.prompt ||
    body.text ||
    body.input ||
    '';

  const userText = String(rawUserText).trim();
  const hasKey = Boolean(getGeminiApiKey());
  console.log(`[Tia AI] Request received | Question: "${userText}" | Lang: ${body.language || 'hi'} | GEMINI_API_KEY present: ${hasKey}`);

  if (!userText) {
    return {
      status: 400,
      data: {
        ok: false,
        error: 'Message cannot be empty',
        code: 'EMPTY_MESSAGE',
      },
    };
  }

  const language = body.language === 'en' ? 'en' : 'hi';
  const isHindi = language === 'hi';

  // 2. Safely resolve course and lesson context (fully optional)
  let courseName = '';
  let courseDescription = '';
  let lessonTitle = '';

  // Check explicit course parameters or context
  const rawCourse =
    body.course ??
    body.currentCourse ??
    (isHindi ? body.context?.subjectName_hi || body.context?.subjectName : body.context?.subjectName);
  if (rawCourse && typeof rawCourse === 'string' && rawCourse.trim()) {
    courseName = rawCourse.trim();
  } else if (rawCourse && typeof rawCourse === 'object' && rawCourse.name) {
    courseName = String(rawCourse.name).trim();
    if (rawCourse.description) courseDescription = String(rawCourse.description).trim();
  } else if (body.context?.subjectId) {
    const scope = getCourseScope(body.context.subjectId, body.context);
    courseName = isHindi ? scope.name_hi || scope.name : scope.name;
    courseDescription = isHindi ? scope.description_hi || scope.description : scope.description;
  }

  const rawLesson =
    body.lesson ??
    body.currentLesson ??
    (isHindi ? body.context?.lessonTitle_hi || body.context?.lessonTitle : body.context?.lessonTitle);
  if (rawLesson && typeof rawLesson === 'string' && rawLesson.trim()) {
    lessonTitle = rawLesson.trim();
  } else if (rawLesson && typeof rawLesson === 'object' && rawLesson.title) {
    lessonTitle = String(rawLesson.title).trim();
  }

  // 3. Extract relevant course content / sections safely, capped to prevent payload bloat
  let relevantContentText = '';
  const rawSections = body.relevantCourseContext ?? body.context?.sections;
  if (Array.isArray(rawSections)) {
    relevantContentText = rawSections
      .slice(0, 5)
      .map((s) => {
        if (!s) return '';
        if (typeof s === 'string') return `• ${s}`;
        const title = isHindi ? s.title_hi || s.title : s.title;
        const content = isHindi ? s.content_hi || s.content : s.content;
        return `• ${title || ''}: ${content || ''}`;
      })
      .filter(Boolean)
      .join('\n');
  } else if (typeof rawSections === 'string') {
    relevantContentText = rawSections.slice(0, 800);
  }

  // Truncate relevant content to 800 characters maximum
  if (relevantContentText.length > 800) {
    relevantContentText = relevantContentText.slice(0, 800) + '...';
  }

  // 4. Extract conversation history safely
  const rawHistory = body.conversationHistory || body.history || body.messages || [];
  const historyList: string[] = [];
  if (Array.isArray(rawHistory)) {
    const slice = rawHistory.slice(-4);
    for (const m of slice) {
      if (!m) continue;
      const sender = m.sender === 'user' || m.role === 'user' ? 'User' : 'Tia';
      const text = m.text || m.content || m.message || '';
      if (text) historyList.push(`${sender}: ${String(text).slice(0, 200)}`);
    }
  }
  const historyString = historyList.join('\n');

  // 5. Check Gemini client availability
  const gemini = getGeminiClient();
  if (!gemini) {
    console.warn(
      '[Tia AI] GEMINI_API_KEY is not configured in this environment.'
    );
    return {
      status: 500,
      data: {
        ok: false,
        error: 'GEMINI_API_KEY is not configured on the server',
        code: 'MISSING_API_KEY',
      },
    };
  }

  // 6. Build prompt instructions
  const hasCourse = Boolean(courseName);
  const systemPrompt = `You are Tia, an intelligent, conversational, warm, and highly engaging AI learning assistant.
CORE IDENTITY:
- You behave as: "General AI assistant + active course expert".
- USER'S LATEST QUESTION = HIGHEST PRIORITY.
${hasCourse ? `- CURRENT ACTIVE COURSE: ${courseName} (Context & specialty, NEVER a restriction).` : '- GENERAL MODE: No active course restriction. You can answer any topic.'}

CRITICAL MANDATES:
1. ALWAYS ANSWER THE USER'S ACTUAL QUESTION:
   - Latest user query: "${userText}".
   - Answer directly, accurately, and informatively.
   - If the question is about general knowledge, public figures (e.g., Virat Kohli, Modi), programming (e.g., Python), business cases (e.g., Airbnb), economics (e.g., GDP), science, recipes, or daily life -> ANSWER IMMEDIATELY!
   ${hasCourse ? `- Connect naturally to ${courseName} ONLY IF it makes intuitive pedagogical sense. If not, answer normally without forcing connections.` : ''}
   - NEVER, UNDER ANY CIRCUMSTANCES, SAY:
     - "This is outside your course."
     - "This question is outside your course."
     - "I can only answer course-related questions."
     - "Please ask something related to your lesson."
   Tia NEVER rejects or blocks a user's question!

2. TONE & ACCESSIBILITY:
   - Warm, encouraging, clear, simple, slightly witty when appropriate.
   - Keep answers between 2 to 4 concise, readable paragraphs.
   - Ideal for mobile screens and pleasant voice narration.

3. QUICK ACTIONS:
   - Provide 2 to 4 helpful, relevant clickable follow-ups.
   ${hasCourse ? `- If answering a general inquiry, offer one option to return to ${courseName} (e.g., "📖 वापस ${courseName} पर चलें").` : ''}

4. LANGUAGE & VOICE RULES:
   - Language: ${isHindi ? 'Hindi' : 'English'}
   - If Hindi:
     - displayText: Friendly, natural Hindi/Hinglish with markdown bolding (**शब्द**) for emphasis.
     - speechText: Natural spoken Hindi in pure DEVANAGARI script for the Indian TTS engine (hi-IN). English technical names (e.g. Python, GDP, Virat Kohli, Airbnb) can stay, but all conversational Hindi words MUST be in Devanagari script so TTS pronounces them properly. DO NOT put asterisks (*), markdown hashes (#), bullet points, URLs, or emojis in speechText.
   - If English:
     - displayText: Fluent, natural English with markdown bolding.
     - speechText: Natural spoken English without asterisks or emojis.

5. OUTPUT FORMAT:
   Return ONLY a valid JSON object with this exact shape:
   {
     "displayText": "Your formatted response with markdown for UI display",
     "speechText": "Spoken text optimized for TTS without markdown symbols or emojis",
     "quickActions": ["Suggested action 1", "Suggested action 2", "Suggested action 3"]
   }`;

  const userContextPrompt = `${hasCourse ? `ACTIVE_COURSE: ${courseName} ${courseDescription ? `(${courseDescription})` : ''}\n` : ''}${lessonTitle ? `ACTIVE_LESSON: ${lessonTitle}\n` : ''}${relevantContentText ? `COURSE_CONTEXT:\n${relevantContentText}\n` : ''}${historyString ? `RECENT_CONVERSATION:\n${historyString}\n` : ''}USER_LATEST_QUESTION (HIGHEST PRIORITY): "${userText}"
TARGET_LANGUAGE: ${isHindi ? 'Hindi (speechText in pure Devanagari script for hi-IN TTS)' : 'English'}`;

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  // Prefer ultra-fast, high-availability gemini-3.1-flash-lite first to avoid 503 demand spikes
  const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];
  let response: any = null;
  let lastGeminiError: any = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const modelName = modelsToTry[i];
    console.log(`[Tia AI] Gemini request started | Model: ${modelName} | Prompt length: ${userContextPrompt.length}`);
    try {
      response = await gemini.models.generateContent({
        model: modelName,
        contents: userContextPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          maxOutputTokens: 1500,
          responseMimeType: 'application/json',
        },
      });
      if (response?.text) {
        console.log(`[Tia AI] Gemini response received | Model: ${modelName} | Length: ${response.text.length}`);
        break;
      }
    } catch (err: any) {
      lastGeminiError = err;
      const status = err?.status || err?.code;

      // Fast fail on auth error immediately
      if (
        status === 400 ||
        status === 401 ||
        status === 403 ||
        err?.message?.includes('API key not valid') ||
        err?.message?.includes('API_KEY_INVALID')
      ) {
        console.error(`[Tia AI] Authentication error with Gemini API: ${err?.message || err}`);
        return {
          status: 401,
          data: {
            ok: false,
            error: `Gemini API authentication failed: ${err?.message || 'Invalid API key'}`,
            code: 'AUTH_FAILED',
          },
        };
      }

      if (i < modelsToTry.length - 1) {
        console.log(`[Tia AI] Model ${modelName} temporary issue (status: ${status}); failing over to next model...`);
        await sleep(250);
      } else {
        console.error(`[Tia AI] All models failed | Final model: ${modelName} | Status: ${status} | Error: ${err?.message || err}`);
      }
    }
  }

  let generatedDisplayText = '';
  let generatedSpeechText = '';
  let quickActions: string[] = [];

  if (response?.text) {
    const rawText = response.text.trim();
    let parsedDisplay = '';
    let parsedSpeech = '';
    let parsedActions: string[] = [];

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

      // Regex fallback for partially truncated JSON
      if (!parsedDisplay) {
        const displayMatch = rawText.match(/"displayText"\s*:\s*"((?:\\.|[^"\\])*)"/s);
        if (displayMatch && displayMatch[1]) {
          try {
            parsedDisplay = JSON.parse(`"${displayMatch[1]}"`);
          } catch {
            parsedDisplay = displayMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
          }
        }

        const speechMatch = rawText.match(/"speechText"\s*:\s*"((?:\\.|[^"\\])*)"/s);
        if (speechMatch && speechMatch[1]) {
          try {
            parsedSpeech = JSON.parse(`"${speechMatch[1]}"`);
          } catch {
            parsedSpeech = speechMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
          }
        }
      }
    }

    if (!parsedDisplay) {
      // If rawText starts with JSON bracket, strip it
      let fallbackText = rawText;
      if (fallbackText.startsWith('{') && fallbackText.includes('"displayText"')) {
        const idx = fallbackText.indexOf('"displayText"');
        const colonIdx = fallbackText.indexOf(':', idx);
        if (colonIdx !== -1) {
          fallbackText = fallbackText.slice(colonIdx + 1).replace(/^[\s"]+/, '');
          const quoteIdx = fallbackText.indexOf('",');
          if (quoteIdx !== -1) {
            fallbackText = fallbackText.slice(0, quoteIdx);
          }
        }
      }
      parsedDisplay = fallbackText.replace(/\\n/g, '\n').replace(/\\"/g, '"');
      parsedSpeech = cleanTiaSpeechText(parsedDisplay, isHindi);
    }

    if (parsedDisplay && parsedDisplay.trim().length > 3) {
      generatedDisplayText = parsedDisplay.trim();
      generatedSpeechText = cleanTiaSpeechText(parsedSpeech || parsedDisplay, isHindi);
      quickActions = parsedActions;
    }
  }

  if (!generatedDisplayText) {
    console.warn('[Tia AI] Generation produced no text; returning 503 unavailable');
    return {
      status: 503,
      data: {
        ok: false,
        error: lastGeminiError?.message || 'Gemini AI service temporarily unavailable',
        code: 'AI_UNAVAILABLE',
      },
    };
  }

  if (quickActions.length === 0) {
    quickActions = isHindi
      ? hasCourse
        ? ['💡 आसान उदाहरण दो', '😂 मज़ाकिया बनाओ', `📖 वापस ${courseName} पर चलें`]
        : ['💡 आसान उदाहरण दो', '😂 मज़ाकिया बनाओ', '🎯 झटपट सवाल पूछो']
      : hasCourse
        ? ['💡 Give simple example', '😂 Make it funny', `📖 Back to ${courseName}`]
        : ['💡 Give simple example', '😂 Make it funny', '🎯 Ask a quick question'];
  }

  const messagePayload: TiaMessage = {
    id: `tia-resp-${Date.now()}`,
    sender: 'tia',
    text: generatedDisplayText,
    speechText: generatedSpeechText,
    timestamp: Date.now(),
    quickActions,
  };

  return {
    status: 200,
    data: {
      ok: true,
      text: generatedDisplayText,
      answer: generatedDisplayText,
      displayText: generatedDisplayText,
      speechText: generatedSpeechText,
      quickActions,
      message: messagePayload,
    },
  };
}
