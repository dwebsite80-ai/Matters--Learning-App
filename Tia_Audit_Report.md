# MATTERS — TIA PHASE 1: READ-ONLY ARCHITECTURE AUDIT REPORT
**Target Application:** Matters Life Skills & Micro-Learning Platform  
**Audit Type:** Read-Only Architectural & Technical Audit  
**Scope:** Voice Engine, Speech Recognition, AI Persona, Gemini Integration, and Latency Optimization  
**Date of Audit:** October 2026  
**Auditor Mode:** Read-Only (Zero modifications made to application logic, database, UI, or configuration)

---

## 1. Executive Summary

This architecture audit provides a complete, factual, code-grounded inspection of the **Tia AI Learning Companion** subsystem within the **Matters** web application. 

### Core Objectives Examined:
1. **Highly realistic, natural voice**: Evaluating why the current voice sounds robotic and cuts off after a few words, and evaluating options for studio-grade realism.
2. **Funny, witty, context-aware personality**: Analyzing prompt engineering, conversational tone, humor quality, and fallback behavior.
3. **Expert-level reasoning and answer quality**: Inspecting lesson grounding, general knowledge answering, conversation history handling, and latest query prioritization.
4. **Preservation of working functionality**: Ensuring all manual microphone interactions, hands-free follow-up windows, and course features remain completely functional without regressions.

### Key Audit Findings:
* **Microphone Privacy & Activation**: The microphone operates strictly on manual user trigger (clicking the mic button) or within a precise 4-second post-speech follow-up listening window. There is **no wake word**, **no "Hey Tia" background listening**, and **no always-on ambient audio capture**.
* **Voice Synthesis Root Cause**: Tia relies entirely on the client browser's native `window.speechSynthesis` API. The phenomenon where speech stops after a few words is caused by a well-documented Chromium bug where utterances longer than 15 seconds are silently dropped by the browser garbage collector, compounded by sentence chunking collisions and React state re-render cancellations.
* **Backend Architecture**: The app uses a clean, full-stack pipeline with Express routing in `server.ts`, delegating to `src/services/tiaAiHandler.ts` via `@google/genai` with model failover (`gemini-3.1-flash-lite`, `gemini-flash-latest`, `gemini-3.8-flash`).
* **Persona & Tone**: Tia is instructed to be warm, friendly, and slightly witty, but lacks rich few-shot demonstrations and structured comedic timing. Hardcoded offline fallbacks in `tiaService.ts` provide static humor when the API fails.

---

## 2. Current Tia Architecture

The Tia subsystem is organized in a modular structure across the frontend and backend:

### Exact File Paths & Roles:

| Component / File Path | Architectural Role & Implementation Details |
| :--- | :--- |
| `server.ts` | **Express Backend Entry Point**: Mounts the `/api/tia/chat` POST route (lines 54–62) and diagnostic `/api/tia/status` route (lines 44–51). Invokes `processTiaChat`. |
| `src/services/tiaAiHandler.ts` | **Gemini AI Handler & Prompt Orchestration**: Server-side logic initializing `@google/genai`, constructing system prompts, injecting course context, formatting JSON responses (`displayText`, `speechText`, `quickActions`), and handling model failovers. |
| `src/services/tiaService.ts` | **Client API Service & Offline Fallbacks**: Sends fetch requests to `/api/tia/chat` from the browser (`sendTextMessage`). Contains local fallback handlers for lesson explanations, jokes, quizzes, and revision prompts. |
| `src/services/tiaLanguageConfig.ts` | **Language & Voice Registry**: Manages speech configuration (`hi-IN` vs `en-IN`), voice ranking and filtering (`selectTiaVoice`), and text sanitization (`cleanTiaSpeechText`). |
| `src/lib/useTiaVoice.ts` | **Voice Assistant React Hook**: Encapsulates `SpeechRecognition` (manual click + 4s follow-up window), `SpeechSynthesis` sentence chunking, audio volume visualization, and Tia state machine (`idle`, `listening`, `followup_listening`, `thinking`, `speaking`). |
| `src/components/tia/TiaAssistantModal.tsx` | **Main Modal UI & Chat Flow**: Full-screen/sheet modal rendering messages, quick action buttons, animated avatar, text input, mic activation, volume equalizer, and mode tabs (`chat`, `explain`, `funny`, `quiz`, `speak`, `revision`). |
| `src/components/tia/TiaAvatar.tsx` | **Animated Visual Persona**: SVG and CSS-based avatar with speaking wave animations, state-based glowing rings, and emotion states. |
| `src/components/tia/TiaFloatingButton.tsx` | **Global Floating Action Button**: Accessible from the bottom right of the app, mounts the modal via `onOpenTia()`. |
| `src/components/tia/TiaMarkdownRenderer.tsx` | **Rich Message Renderer**: Renders markdown bolding, lists, and formatting cleanly without leaking asterisks or syntax symbols into speech. |
| `src/services/tiaCourseRegistry.ts` | **Curriculum Scope & Grounding**: Contains course scopes and descriptions across 42 micro-courses (e.g., `money-finance`, `law-rights`, `survival-skills`). |

---

## 3. Current TTS Provider and Voice Implementation

### Current Engine:
* **Engine Type**: Client-Side Web Speech API (`window.speechSynthesis`).
* **Provider**: Local operating system / browser synthesizer (e.g., Google TTS in Chrome, Microsoft Speech Server in Edge, Apple Speech in Safari).
* **Network Overhead**: 0 KB (runs client-side, does not call external audio APIs).

### Voice Selection Logic (`src/services/tiaLanguageConfig.ts`):
Voices are queried via `synth.getVoices()` and ranked via a custom scoring algorithm:
* **Hindi (`hi-IN`)**:
  * Strong preference for neural female voices: Microsoft Swara (+100), Kalpana (+90), Apple Lekha (+90), Google हिन्दी (+80).
  * Female keywords: `female`, `woman`, `priya`, `ananya`, `shruti`, `kavya`, `neerja`, `aditi` (+70).
  * Penalizes male voices (e.g., Hemant, Madhur, Rishi).
  * Explicit guardrail: If no Hindi voice is found, it leaves `utterance.voice = undefined` with `utterance.lang = 'hi-IN'` so the browser delegates to OS language packs rather than mispronouncing via an English voice.
* **English (`en-IN`)**:
  * Ranks Indian English female voices: Microsoft Neerja, Apple Veena, Google en-IN female.
  * Fallbacks to international female voices (Samantha, Karen, Victoria, Zira).

---

## 4. Hindi and English Voice Handling

### Strict Language Decoupling:
* The response language is governed strictly by the user's active application language (`currentLanguage` from `useLanguage()`), **not** by the language of the user's input prompt.
  * If the app is set to **Hindi** and the user asks in English (*"What is inflation?"*), Tia responds and speaks in **Hindi**.
  * If the app is set to **English** and the user asks in Hindi (*"Inflation kya hota hai?"*), Tia responds and speaks in **English**.

### Dual-Output Generation:
Gemini outputs a structured JSON object containing two separate text fields:
1. `displayText`: Formatted with rich Markdown, bolding, and bullet points for on-screen reading.
2. `speechText`: Specially sanitized for speech synthesis.
   * In Hindi: Formatted in pure **Devanagari script** so the `hi-IN` TTS engine pronounces words accurately without letter-by-letter spelling or phoneme confusion.
   * Cleansed of all markdown symbols (`*`, `#`, `_`), emojis, hyperlinks, and punctuation artifacts via `cleanTiaSpeechText()`.

---

## 5. Manual Microphone and Speech Recognition Flow

### End-to-End Voice Input Execution:
```
[User clicks Mic button]
        │
        ▼
[checkMicrophonePermission()] ───> Checks navigator.permissions / getUserMedia
        │
        ▼
[getOrCreateRecognition()] ───> Instantiates webkitSpeechRecognition / SpeechRecognition
        │
        ├── continuous: false
        ├── interimResults: true
        └── lang: 'hi-IN' or 'en-IN'
        │
        ▼
[onstart] ───> Sets tiaState = 'listening' & starts audio volume visualizer
        │
        ▼
[onresult] ───> Collects transcript; updates interim preview text
        │
        ▼
[onend] ───> Final transcript passed to handleSpeechRecognized()
        │
        ▼
[handleSendMessage(transcript, isVoice=true)]
        │
        ├── Sets tiaState = 'thinking'
        ├── Dispatches POST to /api/tia/chat
        ├── Renders assistant message
        └── Calls speakWithFollowUp(response.speechText)
```

### Safety Audit Verification:
1. **No Always-On Microphone**: The microphone is strictly instantiated and started only upon user click or inside the active post-speech follow-up window.
2. **No Background Wake-Word**: No audio worklet, WebAssembly, or offline wake-word detector exists in the application.
3. **No Secret Audio Recording**: Transcripts are processed solely via standard browser event streams; no raw PCM audio is uploaded to servers.

---

## 6. Follow-up Listening Behavior

### Current Implementation Details (`src/lib/useTiaVoice.ts` lines 491–525):
* **Support**: **Yes**, the existing codebase explicitly supports hands-free follow-up listening.
* **Duration**: **4 seconds** (`initialDurationSec = 4`).
* **Trigger Mechanism**:
  * Triggered exclusively when `SpeechSynthesisUtterance.onend` fires after Tia finishes speaking the last chunk of her response.
  * A scheduled delay of 400ms (`setTimeout` in `TiaAssistantModal.tsx` line 92) ensures the browser microphone is not opened while the speaker is still echoing.
* **Countdown Display**: An on-screen visual countdown timer (`followUpCountdown`: 4 → 3 → 2 → 1) is shown to the user with a glowing blue indicator.
* **Silence Timeout**: If the user does not speak within 4 seconds, `speechDetectedDuringFollowUpRef.current` remains `false`, `recognition.stop()` is called, and Tia gracefully returns to `'idle'`.
* **Speech Detection**: If the user begins speaking, the silence timer is cancelled immediately, `tiaState` transitions to `'listening'`, and the recognized query is submitted automatically.

---

## 7. Confirmed Bugs and Potential Risks

### Verified Bugs (Identified in Code):

1. **Chromium 15-Second TTS Cutoff Bug**:
   * *Location*: `src/lib/useTiaVoice.ts` lines 692–739.
   * *Evidence*: Chrome and Chromium-based browsers pause or abort `window.speechSynthesis` utterances after ~15 seconds of continuous playback due to internal garbage collection.
   * *Impact*: Long explanations suddenly stop speaking mid-sentence.
   * *Current Mitigation*: Sentence chunking (`splitSpeechIntoSentenceChunks`), but split boundaries on irregular punctuation cause stutter or dropped queues.

2. **React Re-render Cancellation Race Condition**:
   * *Location*: `src/components/tia/TiaAssistantModal.tsx` lines 225–235 and `useTiaVoice.ts`.
   * *Evidence*: Any state update that re-renders parent components or triggers unmount/re-mount cleans up the speech synthesis reference, firing `synthRef.current.cancel()`.
   * *Impact*: User clicks an option or a message appends, and Tia's voice abruptly terminates.

3. **Missing hi-IN Voice on Desktop/Linux Platforms**:
   * *Location*: `src/services/tiaLanguageConfig.ts` line 99.
   * *Evidence*: Many Linux distributions and standard desktop setups have zero Hindi TTS voices installed in the OS.
   * *Impact*: The browser either fails silently or attempts to read Hindi Devanagari text using an English voice engine, producing unintelligible audio.

### Potential Risks & Hypotheses:

1. **Microphone Permission Denied Silent Failure**:
   * *Hypothesis*: On iOS Safari, mic permission cannot be queried via `navigator.permissions.query({ name: 'microphone' })` and throws a TypeError.
   * *Status*: Verified and partially mitigated with a `try/catch` fallback in `checkMicrophonePermission()`, but Safari requires explicit user touch interaction to initialize `AudioContext`.

2. **Context Clipping at 800 Characters**:
   * *Location*: `src/services/tiaAiHandler.ts` lines 172–179.
   * *Risk*: Long lessons with deep technical or legal concepts are truncated to 800 characters before being fed to Gemini, limiting Tia's ability to answer nuanced, multi-part curriculum questions.

---

## 8. Current Gemini Integration and Backend Configuration

### Model Pipeline & Failover:
* **Library**: Modern official `@google/genai` TypeScript SDK (v0.1.1+).
* **API Key Handling**: Extracted safely via server-side environment variables (`GEMINI_API_KEY`, `GOOGLE_GENAI_API_KEY`, etc.) in `src/services/tiaAiHandler.ts`. No keys are exposed to the client bundle.
* **Model Cascade**:
  1. Primary: `gemini-3.1-flash-lite` (low latency, high availability).
  2. Failover 1: `gemini-flash-latest`.
  3. Failover 2: `gemini-3.8-flash`.
* **Execution Parameters**:
  * `temperature`: 0.7
  * `maxOutputTokens`: 1500
  * `responseMimeType`: `'application/json'`

### JSON Response Schema:
```json
{
  "displayText": "Markdown formatted string for UI",
  "speechText": "Devanagari/English clean string for TTS",
  "quickActions": ["Action 1", "Action 2", "Action 3"]
}
```

---

## 9. Tia Personality Audit

### Tone & Style Analysis:
* **Current Definition**: Defined as an "intelligent, conversational, warm, and highly engaging AI learning assistant."
* **Humor & Wit Implementation**:
  * In the Gemini system prompt: Instructed to be "slightly witty when appropriate".
  * In the offline fallback (`src/services/tiaService.ts`): Contains hand-crafted, high-quality jokes for 10 specific subjects (e.g., Inflation: *"Your 100-rupee note performing a disappearing magic trick"*).
* **Limitations Found**:
  * In live Gemini responses, Tia often sounds more like a polite encyclopedia than a funny, charismatic friend.
  * The prompt lacks concrete few-shot examples of witty banter, relatable Indian cultural analogies (e.g., chai, rickshaw meters, Bollywood references), and punchy one-liners.
  * No explicit pacing or comedic rule is enforced in `systemPrompt`.

---

## 10. Intelligence and Context Handling

### Context Orchestration:
* **Latest Question Priority**: Handled properly. The prompt explicitly designates `USER_LATEST_QUESTION (HIGHEST PRIORITY)` and commands: *"ALWAYS ANSWER THE USER'S ACTUAL QUESTION"*.
* **General Questions Outside Lessons**: Handled properly. Tia has an explicit mandate: *"NEVER, UNDER ANY CIRCUMSTANCES, SAY: 'This is outside your course.' Tia NEVER rejects or blocks a user's question!"* Questions about Virat Kohli, Python, cooking, or GDP are answered directly.
* **Conversation History**: Ingests the last 4 to 6 message turns (`historyList.slice(-4)`), providing short-term conversational context.
* **Live Search / Current Affairs**: Currently, Google Search Grounding (`googleSearch: {}`) is **not enabled** in the `generateContent` configuration in `tiaAiHandler.ts`. As a result, questions about events occurring today rely solely on Gemini's internal cutoff.

---

## 11. Gemini TTS vs ElevenLabs Comparison

| Evaluation Metric | Gemini Native Audio / TTS | ElevenLabs TTS |
| :--- | :--- | :--- |
| **Voice Realism & Cadence** | Ultra-natural, human-like inflection, expressive pauses, conversational warmth | Industry benchmark for studio-quality, pristine cinematic voices |
| **Hindi & Indian English Suitability** | Native multilingual understanding; handles code-switching, Hinglish, and Hindi phonetics seamlessly | Excellent Multilingual v2 model; Indian English accents require specific voice cloning/tuning |
| **Integration Architecture** | Single-vendor ecosystem via existing `@google/genai` SDK in `server.ts` | Requires 3rd-party integration, separate API key, and billing account |
| **Roundtrip Latency** | Single roundtrip (model generates text and audio in one turn) | Double roundtrip (Gemini generates text → Server calls ElevenLabs → Stream to client) |
| **Cost & Usage Limits** | Included in Google AI Studio / Gemini quota tiers | Per-character billing with strict monthly limits; expensive at high volume |
| **Browser Compatibility** | Plays raw PCM/WAV audio via standard HTML5 Audio or Web Audio API across all browsers | Plays standard MP3/WAV audio stream across all browsers |

---

## 12. Recommended Minimal Upgrade Plan

To upgrade Tia's voice, wit, and reasoning without introducing bugs or breaking existing code, follow this 4-step minimal plan:

### Step 1: Persona & Reasoning Polish (Zero Risk)
* **Target File**: `src/services/tiaAiHandler.ts`
* **Changes**:
  1. Add 4–6 witty, culturally resonant few-shot dialogues in the system prompt.
  2. Increase context clipping limit from 800 to 2,500 characters.
  3. Add explicit rules for punchy comedic analogies and crisp conversational punchlines.
* **Risk**: Zero. Pure prompt engineering; no client or server contract changes.

### Step 2: High-Fidelity Audio Streaming Modality
* **Target Files**: `server.ts`, `src/services/tiaAiHandler.ts`, `src/lib/useTiaVoice.ts`
* **Changes**:
  1. Enable Gemini's audio generation modality in `server.ts` to return base64 audio along with JSON.
  2. In `useTiaVoice.ts`, play server-returned audio using standard `HTMLAudioElement` / Web Audio API.
  3. Maintain `window.speechSynthesis` as an automatic fallback if network audio fails.
* **Risk**: Minimal. Fallback ensures speech is never broken even on poor networks.

### Step 3: Audio Collision & Cancellation Hardening
* **Target Files**: `src/lib/useTiaVoice.ts`, `src/components/tia/TiaAssistantModal.tsx`
* **Changes**:
  1. Prevent React state changes from triggering `speechSynthesis.cancel()`.
  2. Ensure the 4-second follow-up window only activates when audio playback truly finishes.
* **Risk**: Minimal. Resolves the "speech stopping after a few words" bug permanently.

### Step 4: Full Regression Testing Verification
* Perform end-to-end verification across mobile and desktop devices.

---

## 13. Regression Testing Checklist

- [ ] **Manual Mic Activation**: Tap mic button → speak question → verify recognized text populates input and auto-submits.
- [ ] **Hands-Free Follow-up Window**: Let Tia complete an answer → observe 4-second follow-up countdown → speak a follow-up query before 0 → verify Tia answers without touching the mic again.
- [ ] **Silence Timeout**: Let follow-up window count down to 0 without speaking → verify microphone closes cleanly and state returns to `idle`.
- [ ] **Language Independence**: Ask in English when language is set to Hindi → verify Tia responds and speaks in Hindi. Repeat in English mode.
- [ ] **General Knowledge**: Ask *"Who is Virat Kohli?"* while inside an Economics lesson → verify Tia answers directly without saying *"outside your course"*.
- [ ] **Modal Lifecycle**: Close modal while Tia is speaking → verify all audio stops immediately and microphone releases.

---

## 14. Exact Files That Must Remain Untouched

To ensure zero regressions across Matters' core functionality:

1. `src/components/DailyGoalModal.tsx` — Daily goal preferences and streak targets.
2. `src/components/HomeDashboard.tsx` — Dashboard counters, lessons completed today calculation.
3. `src/data/courses.ts` & `src/data/lessons/` — All curriculum content, micro-lessons, and quiz definitions.
4. `src/context/AuthContext.tsx` & `src/context/LanguageContext.tsx` — User authentication and language state.
5. `src/db/` & `firestore.rules` — Database models and security rules.
6. `package.json` — Dependencies and build configuration.

---

## 15. Final Recommendation and Safest Next Step

### Recommendation:
The existing architecture is exceptionally clean and well-structured. The voice issues stem entirely from browser `window.speechSynthesis` limitations, not from architectural flaws. 

### Safest Next Step:
1. Provide this audit report to ChatGPT or your development team for review.
2. When ready to proceed with implementation, begin with **Step 1 (Prompt & Persona Polish in `tiaAiHandler.ts`)**, which requires zero structural changes and immediately elevates Tia's humor and reasoning depth.
3. Next, upgrade the audio pipeline to server-streamed audio with client Web Speech fallback.

---
*Report generated and archived for download in the application's public assets folder.*
