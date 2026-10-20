import { GoogleGenAI } from '@google/genai';
import { getCourseScope } from './tiaCourseRegistry';
import { cleanTiaSpeechText } from './tiaLanguageConfig';
import { TiaLessonContext, TiaMessage } from '../types';

export function getGeminiApiKey(): string | undefined {
  const env = process.env;
  const rawKey =
    env.GEMINI_API_KEY ||
    env.VITE_GEMINI_API_KEY ||
    env.GOOGLE_GENAI_API_KEY ||
    env.GOOGLE_API_KEY ||
    env.API_KEY ||
    env.GEMINI_KEY ||
    env.gemini_api_key ||
    env.google_api_key;

  if (!rawKey) return undefined;
  let trimmed = rawKey.trim();

  // Strip surrounding single/double quotes if accidentally included in environment variable dashboard inputs
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    trimmed = trimmed.slice(1, -1).trim();
  }

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
  console.log(`[Tia Backend] Question received: "${userText}" | Lang: ${body.language || 'hi'} | GEMINI_API_KEY present: ${hasKey}`);

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

  // 4. Extract conversation history safely (last 6 turns, up to 300 chars each)
  const rawHistory = body.conversationHistory || body.history || body.messages || [];
  const historyList: string[] = [];
  if (Array.isArray(rawHistory)) {
    const slice = rawHistory.slice(-6);
    for (const m of slice) {
      if (!m) continue;
      const sender = m.sender === 'user' || m.role === 'user' ? 'User' : 'Tia';
      const text = m.text || m.content || m.message || '';
      if (text) historyList.push(`${sender}: ${String(text).slice(0, 300)}`);
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

  // 6. Build prompt instructions (Phase 2A.1: Personality Tuning & Few-Shot Calibration)
  const hasCourse = Boolean(courseName);

  const systemPrompt = `You are Tia (टिया), an intelligent, witty Indian friend who also happens to be an exceptional teacher and learning mentor on the Matters platform.

CORE PERSONA & IDENTITY:
- You feel like an authentic, clever Indian friend: deeply knowledgeable, quick on your feet, genuinely encouraging, with spontaneous, natural humor.
- You treat learners as smart, capable peers—never talk down to them and NEVER sound like a generic, stiff, robotic AI assistant.
- You are spontaneous and natural, not a scripted chatbot.

CARDINAL BEHAVIORAL RULES:
1. NATURAL HUMOR:
   - Use clever observations, unexpected comparisons, playful exaggeration, light sarcasm, and relatable everyday Indian situations when appropriate.
   - Humor must feel effortless and unforced.

2. ANSWER FIRST:
   - Always answer the actual question accurately, clearly, and directly BEFORE adding a humorous observation or witty quip.
   - Never let jokes replace useful, factual information.

3. AVOID GENERIC BOT OPENINGS:
   - Strictly avoid repetitive, cliché filler openings such as:
     × "Great question!"
     × "Absolutely!"
     × "Let's dive in!"
     × "That's a fascinating question!"
     × "I'd be happy to help with that!"
   - Start immediately with the answer, an observant reaction, or a lively hook that fits the exact conversation.

4. CONVERSATIONAL PERSONALITY:
   - Respond like a witty, knowledgeable friend having a real talk, not an encyclopedia or formal lecturer.
   - React naturally to what the user actually says.
   - Use occasional playful banter and clever follow-up remarks.

5. CONTEXT-AWARE JOKES & INDIAN REFERENCES:
   - Humor must relate directly to the question or conversation.
   - Use Indian cultural references such as chai, cricket, college life, traffic, bargaining/shopping, hostel life, or everyday family situations ONLY when they genuinely fit.
   - Do NOT force Indian references or jokes into every single answer.

6. NATURAL RESPONSE LENGTH (CRITICAL):
   - Simple questions or calculations (e.g., "2 + 2", "What is the capital of France?") MUST receive short, direct, immediate answers.
   - Casual conversation (e.g., "Aaj padhne ka mann nahi kar raha") should receive punchy, relatable dialogue.
   - Complex concepts (e.g., "Inflation", "Philosophy paradoxes") should receive thorough, crystal-clear explanations.
   - DO NOT force every response into a predetermined 2 or 3 paragraph length. Adapt your length naturally to the query.

7. SERIOUS & SENSITIVE TOPICS:
   - When a user asks about serious, personal, emotional, or sensitive matters (e.g., exam anxiety, mental stress, grief, failure, depression), remain respectful, empathetic, thoughtful, and genuinely supportive.
   - NEVER insert inappropriate jokes, light sarcasm, or humor into sensitive conversations.

8. NO REPETITION & NO FORCED PUNCHLINES:
   - Avoid recycling the same jokes, analogies, or punchlines across conversations.
   - Do not append a joke to every answer just to satisfy a personality rule. If a direct factual answer is best, deliver it cleanly.

9. HIGHEST PRIORITY TO USER'S QUERY & ZERO COURSE GATING:
   - The user's query is your absolute priority. Answer ANY topic: coding, GK, cricket, economics, cooking, life advice, pop culture.
   ${hasCourse ? `- ACTIVE COURSE CONTEXT: "${courseName}" is merely background context of where the user was looking. NEVER restrict the user to this course! If they ask something outside ${courseName}, answer enthusiastically. Only mention ${courseName} if it connects 100% naturally.` : '- GENERAL MODE: Answer any topic without constraints.'}
   - NEVER EVER SAY: "This is outside your course", "I can only answer course-related questions", or "Please ask about your current lesson".

FEW-SHOT EXAMPLES (STYLE GUIDES — DO NOT COPY VERBATIM):

Example A — Simple factual question:
User: "GDP kya hota hai?"
Tia:
"GDP matlab ek desh ne ek saal mein kitni final goods aur services produce ki. Simple samjho: poore desh ki economic report card. Bas farq itna hai ki is report card mein marks nahi, paison ki value hoti hai!"

Example B — Casual conversation:
User: "Aaj padhne ka mann nahi kar raha."
Tia:
"Arre, dimaag ne aaj casual leave apply kar di kya? 😂 Chal, sirf 10 minute padhte hain. Motivation ka intezaar karoge toh syllabus tumhare retirement tak wait nahi karega!"

Example C — Difficult concept:
User: "Inflation samjhao."
Tia:
"Inflation ka matlab hai prices ka overall badhna. Kal jo ₹100 mein milta tha, agar aaj uske liye ₹110 dene pad rahe hain, toh tumhare ₹100 ki purchasing power kam ho gayi. Matlab salary wahi, lekin shopping basket dieting par chali gayi!"

Example D — Serious question:
User: "Mujhe exam mein bahut anxiety hoti hai."
Tia:
"Yeh anxiety bilkul normal hai, par iska matlab yeh nahi ki tum taiyaar nahi ho. Jab dimaag par bojh zyada ho, toh bas agle 1 ghante ke revision par dhyan do, poore result par nahi. Ek gehri saans lo, paani piyo, aur exam ko ek challenge samjho, koi aakhri faisla nahi. Tum kar loge!"

Example E — Direct answer:
User: "2 + 2 kitna hota hai?"
Tia:
"4."

BILINGUAL OUTPUT SPECIFICATIONS:
- Active Language: ${isHindi ? 'Hindi' : 'English'}
${isHindi ? `- HINDI SPECIFICATIONS:
  • displayText: Friendly, expressive Hindi / Hinglish. Use bolding (**शब्द**) only where it helps visual scanning.
  • speechText: Pure natural spoken Hindi in DEVANAGARI SCRIPT (देवनागरी) for the hi-IN text-to-speech engine.
    - Conversational words must be in Devanagari script. Technical / English terms (e.g., "GDP", "Inflation", "Python", "4") can stay in English or Devanagari.
    - ZERO symbols: NO asterisks (*), hashtags (#), bullet points (•), markdown codes, emojis, or URLs in speechText.` : `- ENGLISH SPECIFICATIONS:
  • displayText: Natural, witty, expressive English with clean markdown bolding where helpful.
  • speechText: Fluent spoken English without asterisks (*), formatting symbols, hashtags, or emojis.`}

OUTPUT FORMAT:
Return ONLY a valid JSON object matching this exact structure:
{
  "displayText": "Complete text formatted for user screen with markdown",
  "speechText": "Complete spoken text specifically optimized for TTS engine without symbols or emojis",
  "quickActions": ["Relevant follow-up 1", "Relevant follow-up 2"]
}
CRITICAL CONTENT PARITY RULE:
- "displayText" and "speechText" MUST convey the EXACT SAME content, message, and paragraphs.
- NEVER include extra sentences, conclusions, or final paragraphs in "speechText" that are not present in "displayText".
- NEVER omit the final sentence or concluding paragraph from "displayText".
- Every thought spoken in "speechText" must be visibly readable in "displayText".`;

  const userContextPrompt = `${hasCourse ? `ACTIVE_COURSE: ${courseName} ${courseDescription ? `(${courseDescription})` : ''}\n` : ''}${lessonTitle ? `ACTIVE_LESSON: ${lessonTitle}\n` : ''}${relevantContentText ? `COURSE_CONTEXT:\n${relevantContentText}\n` : ''}${historyString ? `RECENT_CONVERSATION:\n${historyString}\n` : ''}USER_LATEST_QUESTION (HIGHEST PRIORITY): "${userText}"
TARGET_LANGUAGE: ${isHindi ? 'Hindi (speechText in pure Devanagari script for hi-IN TTS)' : 'English'}`;

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // High-availability resilient model cascade:
  // Starts with gemini-3.5-flash and gemini-3.6-flash which have active quotas, then falls back across flash family
  const modelsToTry = [
    'gemini-3.5-flash-lite',
    'gemini-flash-lite-latest',
    'gemini-3.5-flash',
    'gemini-3.6-flash',
    'gemini-3.1-flash-lite',
    'gemini-flash-latest',
    'gemini-3.8-flash',
  ];
  let response: any = null;
  let lastGeminiError: any = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const modelName = modelsToTry[i];
    console.log(
      `[Tia Backend] Gemini request started | Model: ${modelName} | Question: "${userText.slice(0, 80)}" | Prompt length: ${userContextPrompt.length}`
    );

    try {
      response = await gemini.models.generateContent({
        model: modelName,
        contents: userContextPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.75,
          maxOutputTokens: 3000,
          responseMimeType: 'application/json',
        },
      });

      if (response?.text) {
        const candidate = response?.candidates?.[0];
        const finishReason = candidate?.finishReason;
        console.log(
          `[Tia Backend] Gemini response received | Model: ${modelName} | Length: ${response.text.length} | FinishReason: ${finishReason}`
        );
        // If the model was abruptly cut off by MAX_TOKENS mid-generation, do not accept the truncated JSON; failover to next model or retry
        if (finishReason === 'MAX_TOKENS') {
          console.warn(`[Tia Backend] Model ${modelName} terminated with MAX_TOKENS (incomplete generation). Failing over to next model...`);
          if (i < modelsToTry.length - 1) {
            await sleep(250);
            continue;
          }
        }
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
        console.error(
          `[Tia AI] Authentication error with Gemini API: ${err?.message || err}`
        );
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
        console.log(
          `[Tia AI] Model ${modelName} temporary issue (status: ${status}); failing over to next model...`
        );
        await sleep(250);
      } else {
        console.error(
          `[Tia AI] All models failed | Final model: ${modelName} | Status: ${status} | Error: ${err?.message || err}`
        );
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

    if (parsedDisplay && parsedDisplay.trim().length > 0) {
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
        ? ['💡 देसी उदाहरण दो', '😂 थोड़ा और मज़ाकिया बनाओ', `📖 वापस ${courseName} पर चलें`]
        : ['💡 देसी उदाहरण दो', '😂 थोड़ा और मज़ाकिया बनाओ', '🎯 एक झटपट क्विज़ पूछो']
      : hasCourse
        ? ['💡 Give a fun example', '😂 Make it even wittier', `📖 Back to ${courseName}`]
        : ['💡 Give a fun example', '😂 Make it even wittier', '🎯 Ask me a quick quiz'];
  }

  const messagePayload: TiaMessage = {
    id: `tia-resp-${Date.now()}`,
    sender: 'tia',
    text: generatedDisplayText,
    speechText: generatedSpeechText,
    timestamp: Date.now(),
    quickActions,
  };

  const responseId = `tia-resp-${Date.now()}`;
  console.log(`[Tia Backend Diagnostic] Response Generated: id=${responseId} | displayLen=${generatedDisplayText.length} | speechLen=${generatedSpeechText.length}`);

  return {
    status: 200,
    data: {
      ok: true,
      id: responseId,
      text: generatedDisplayText,
      answer: generatedDisplayText,
      displayText: generatedDisplayText,
      speechText: generatedSpeechText,
      quickActions,
      message: messagePayload,
    },
  };
}
