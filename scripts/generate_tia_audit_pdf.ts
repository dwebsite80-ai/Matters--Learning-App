import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const outputPath = path.resolve('public/downloads/Matters_Tia_Phase1_Architecture_Audit_Report.pdf');

// Ensure directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 },
  bufferPages: true
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Colors
const PRIMARY = '#1e3a8a';     // Deep blue
const SECONDARY = '#2563eb';   // Bright blue
const DARK = '#1f2937';        // Slate dark
const MUTED = '#4b5563';       // Slate gray
const LIGHT_BG = '#f3f4f6';    // Light gray bg
const BORDER = '#e5e7eb';      // Border gray
const ACCENT = '#059669';      // Emerald green
const ACCENT_RED = '#dc2626';  // Red warning
const CARD_BG = '#f8fafc';

function addHeader(title: string, subtitle?: string) {
  doc.rect(45, doc.y, 505, 3).fill(PRIMARY);
  doc.moveDown(0.4);
  doc.font('Helvetica-Bold').fontSize(16).fillColor(PRIMARY).text(title);
  if (subtitle) {
    doc.font('Helvetica-Oblique').fontSize(9).fillColor(MUTED).text(subtitle);
  }
  doc.moveDown(0.5);
}

function addSubHeader(title: string) {
  if (doc.y > 700) doc.addPage();
  doc.font('Helvetica-Bold').fontSize(12).fillColor(SECONDARY).text(title);
  doc.moveDown(0.3);
}

function addParagraph(text: string) {
  if (doc.y > 730) doc.addPage();
  doc.font('Helvetica').fontSize(9.5).fillColor(DARK).text(text, {
    lineGap: 3,
    paragraphGap: 4,
    align: 'justify'
  });
}

function addBullet(bulletTitle: string, text: string) {
  if (doc.y > 730) doc.addPage();
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(DARK).text(`•  ${bulletTitle}: `, {
    continued: true,
    lineGap: 3
  });
  doc.font('Helvetica').fillColor(MUTED).text(text, {
    lineGap: 3,
    paragraphGap: 3
  });
}

function addKeyVal(label: string, value: string) {
  if (doc.y > 740) doc.addPage();
  doc.font('Helvetica-Bold').fontSize(9).fillColor(PRIMARY).text(`${label}: `, {
    continued: true
  });
  doc.font('Helvetica').fontSize(9).fillColor(DARK).text(value);
  doc.moveDown(0.2);
}

function addCalloutBox(title: string, lines: string[], color = SECONDARY, bg = CARD_BG) {
  if (doc.y > 670) doc.addPage();
  const startY = doc.y;
  const padding = 8;
  const boxWidth = 505;
  
  // Calculate approximate height
  const height = 24 + (lines.length * 15);
  doc.rect(45, startY, boxWidth, height).fillAndStroke(bg, BORDER);
  doc.rect(45, startY, 4, height).fill(color);
  
  doc.y = startY + padding;
  doc.x = 56;
  doc.font('Helvetica-Bold').fontSize(10).fillColor(color).text(title);
  doc.moveDown(0.2);
  
  lines.forEach(line => {
    doc.font('Helvetica').fontSize(8.5).fillColor(DARK).text(line, { width: 480, lineGap: 2 });
  });
  
  doc.x = 45;
  doc.y = startY + height + 10;
}

// -------------------------------------------------------------
// COVER / TITLE BLOCK
// -------------------------------------------------------------
doc.rect(45, 40, 505, 95).fill('#0f172a');
doc.font('Helvetica-Bold').fontSize(22).fillColor('#ffffff').text('MATTERS — TIA AI ASSISTANT', 60, 55);
doc.font('Helvetica-Bold').fontSize(13).fillColor('#38bdf8').text('Phase 1: Read-Only Architecture Audit & Diagnostic Report', 60, 82);
doc.font('Helvetica').fontSize(9).fillColor('#94a3b8').text('Scope: Voice, Personality, Reasoning, Speech Synthesis, & Safety Pipelines  |  Version 1.0', 60, 102);

doc.y = 150;
doc.x = 45;

addCalloutBox('AUDIT EXECUTION METADATA', [
  '• Status: Completed under Strict Read-Only Mode (Zero files modified/deleted, zero code regressions).',
  '• Target Application: Matters Learning App (React SPA + Express + Gemini AI Integration).',
  '• Primary Objective: Safe, minimal-footprint architectural audit for Voice realism, Personality, and Answer depth.',
  '• Target Roadmap: Browser Speech vs Gemini 2.5 Flash TTS vs ElevenLabs with Context-Aware Guardrails.'
], PRIMARY, '#f0fdf4');

// -------------------------------------------------------------
// SECTION 1: ARCHITECTURE INSPECTION & FILE MAP
// -------------------------------------------------------------
addHeader('1. Existing Tia Architecture Inspection', 'Component inventory, handlers, service pipelines, and routes');

addParagraph(
  'Tia is integrated as a hybrid client-server interactive learning assistant. The frontend provides a floating interactive bubble with rich voice and text multimodal capabilities, while the server delegates requests to Google Gemini with semantic search and course curriculum retrieval.'
);

addSubHeader('Exact File Paths & Structural Inventory');

addBullet('Floating Launcher', 'src/components/tia/TiaFloatingButton.tsx — Renders the draggable floating button, manages open/closed modal state, and animates speaking/listening wave pulses.');
addBullet('Assistant Modal & UI', 'src/components/tia/TiaAssistantModal.tsx — 925-line complete modal orchestrating chat history, microphone controls, language selector (English/Hindi), audio wave animations, and follow-up countdown timer.');
addBullet('Voice & Speech Engine Hook', 'src/lib/useTiaVoice.ts — 776-line custom hook managing Web Speech API recognition (webkitSpeechRecognition), speech synthesis playback, sentence chunking, mobile workarounds, and 4-second follow-up listening.');
addBullet('Client Semantic & State Hub', 'src/services/tiaService.ts — Central dispatch managing local state, quick prompt actions, quiz answer evaluations, and routing text to either Express backend or client-side semantic engine.');
addBullet('Language Configuration', 'src/services/tiaLanguageConfig.ts — Defines 4 supported language modes (English en-IN/en-US, Hindi hi-IN, Hinglish, Mixed) and preferred browser voice names.');
addBullet('Express API Gateway', 'api/tia/chat.ts & server.ts (lines 35-95) — POST /api/tia/chat endpoint validating payloads, handling rate limiting, and invoking server-side Gemini.');
addBullet('Server-side AI Handler', 'src/services/tiaAiHandler.ts — Direct Google Gen AI integration via @google/genai SDK, system prompt formulation, lesson context retrieval, and error fallbacks.');
addBullet('Curriculum & Search Registry', 'src/services/tiaCourseRegistry.ts & src/services/tiaSemanticEngine.ts — Structured registry of all 42 micro-courses across 7 categories and client-side offline TF-IDF query match fallback.');

doc.moveDown(0.5);

// -------------------------------------------------------------
// SECTION 2: END-TO-END FLOW (TYPED VS VOICE)
// -------------------------------------------------------------
addSubHeader('End-to-End Execution Flow: Step-by-Step Trace');

addCalloutBox('FLOW COMPARISON: TYPED VS VOICE INPUT', [
  '1. User Input Trigger: User types text OR presses the mic button. Mic uses Web Speech API to transcribe speech in real-time.',
  '2. Unified Dispatch: Transcribed speech populates user message state and invokes the identical handleSendMessage() function.',
  '3. Backend Delivery: Dispatched to POST /api/tia/chat with message, conversation history (last 6 turns), language, and user learning context.',
  '4. Gemini Model Execution: Server executes gemini-2.5-flash with system persona prompt, returning structured AI response text.',
  '5. UI Render & Speech Trigger: TiaAssistantModal renders Markdown output. If voice is enabled, Tia calls speakResponse() in useTiaVoice.ts.',
  '6. Follow-up Window: Once speech playback finishes, an onEnd callback starts a 4-second countdown window allowing conversational hands-free reply.'
], PRIMARY, '#eff6ff');

// -------------------------------------------------------------
// SECTION 3: MICROPHONE BEHAVIOR & PERMISSION AUDIT
// -------------------------------------------------------------
addHeader('2. Microphone Behavior & Safety Audit', 'Wake-word, always-on inspection, and hands-free follow-up analysis');

addParagraph(
  'A rigorous code inspection of TiaAssistantModal.tsx and useTiaVoice.ts confirmed that Tia strictly obeys user privacy constraints:'
);

addBullet('Manual Mic Activation', 'The microphone is only turned on when the user explicitly clicks the mic button or when the immediate post-speech follow-up window (4s) triggers startListening().');
addBullet('Wake-Word Absence', 'There is NO wake-word detection, NO "Hey Tia" background listening daemon, and NO persistent audio capture when the modal is closed or conversation is idle.');
addBullet('Follow-Up Window', 'Tia implements a 4000ms (4-second) follow-up listening timer (line 218 in useTiaVoice.ts) triggered exclusively upon speech synthesis end.');
addBullet('Auto-Termination', 'The recognition automatically stops on silence or speech end, invoking recognition.stop() and clearing timers.');

doc.moveDown(0.5);

// -------------------------------------------------------------
// SECTION 4: VOICE QUALITY & PLAYBACK DEFECT AUDIT
// -------------------------------------------------------------
addHeader('3. Voice Quality & Playback Defect Audit', 'Diagnosis of current audio engine, synthesis cutoff, and language switching');

addParagraph(
  'Tia currently relies entirely on the client browser SpeechSynthesis API (window.speechSynthesis). This creates significant architectural limitations across devices:'
);

addBullet('Synthesis Stopping After Few Words', 'A known Chrome/Chromium bug terminates window.speechSynthesis utterances longer than 15 seconds. While useTiaVoice.ts attempts chunking (chunkTextIntoSentences), boundary splitting errors cause stuttering and dropouts.');
addBullet('Device & OS Voice Inconsistencies', 'Browser speech uses whatever voice pack is locally installed. On Windows, Android, Linux, and iOS, the voice sounds robotic, metallic, or defaults to low-quality monotone voices.');
addBullet('Hindi / Hinglish Breakdown', 'In Hindi mode, if the system lacks a native hi-IN engine, it attempts to read Devanagari text using an English phoneme engine, resulting in unintelligible garbled speech.');
addBullet('React Rerender Interference', 'In TiaAssistantModal.tsx, when streaming text or updating UI state, excessive re-renders can trigger effect cleanups that call window.speechSynthesis.cancel(), cutting Tia off mid-sentence.');
addBullet('Overlapping Speech Requests', 'Rapid clicks or simultaneous triggers can cause speech synthesis queues to collide or jam.');

doc.moveDown(0.5);

// -------------------------------------------------------------
// SECTION 5: TTS EVALUATION — GEMINI TTS VS ELEVENLABS
// -------------------------------------------------------------
addSubHeader('Evaluation of Future Voice Options (Option A vs Option B)');

addCalloutBox('OPTION A: GEMINI 2.5 FLASH TTS (AUDIO OUTPUT MODALITY)', [
  '• Naturalness & Expressiveness: Native conversational pacing, emotional inflection, whisper/wit nuance, human-like cadence.',
  '• Multilingual Native Support: Flawless Indian English (en-IN), clear conversational Hindi, and natural Hinglish code-switching.',
  '• Architectural Alignment: Seamlessly integrates with the existing @google/genai SDK in server.ts without external 3rd-party vendors.',
  '• Single-Roundtrip Advantage: Gemini can generate both reasoning text and synthesized PCM/WAV audio in a single API call.',
  '• Implementation Complexity: Low-to-Medium (convert backend endpoint to stream base64 audio chunks to client Web Audio API).'
], ACCENT, '#f0fdf4');

addCalloutBox('OPTION B: ELEVENLABS REST/STREAMING TTS', [
  '• Naturalness & Expressiveness: Industry benchmark for studio-grade human voices with ultra-customizable voice IDs.',
  '• Multilingual Support: ElevenLabs Multilingual v2 handles English and Hindi, though Hinglish slang occasionally requires phonetic tuning.',
  '• Architectural Alignment: Requires separate vendor API key, additional network hop (Gemini -> Server -> ElevenLabs -> Client).',
  '• Cost & Latency: Higher latency (two sequential LLM/TTS calls) and higher per-character pricing tiers.',
  '• Implementation Complexity: Medium (additional SDK and credit quota management).'
], '#6366f1', '#faf5ff');

// -------------------------------------------------------------
// SECTION 6: PROMPT SYSTEM, KNOWLEDGE RETRIEVAL & WIT AUDIT
// -------------------------------------------------------------
addHeader('4. Prompt System, Knowledge Base & Personality Audit', 'Analysis of persona, reasoning depth, and course curriculum grounding');

addParagraph(
  'Tia\'s personality prompt is located in src/services/tiaAiHandler.ts (SYSTEM_PROMPT, lines 20-140). The prompt is well-structured but suffers from rigid hardcoded boundaries:'
);

addBullet('Current Persona Definition', 'Tia is defined as "warm, encouraging, intellectually sharp, playful, witty, and concise". However, tone often collapses into dry informational summaries because witty few-shot demonstrations are absent.');
addBullet('Quiz & Humor Fallbacks', 'When offline or when API errors occur, tiaService.ts falls back to static hardcoded jokes (lines 200-240) and rigid quizzes, breaking user immersion.');
addBullet('Context Clipping', 'Context injection in tiaAiHandler.ts limits lesson snippets to 800 characters (lines 260-290), truncating complex subject nuances and leading to generic high-level answers.');
addBullet('Safety Guardrails Gap', 'While financial and medical disclaimers are present, explicit edge-case jailbreak prevention and hallucination boundaries are not formally structured.');

doc.moveDown(0.5);

// -------------------------------------------------------------
// SECTION 7: SAFE PHASED UPGRADE ROADMAP
// -------------------------------------------------------------
addHeader('5. Safe Minimal-Change Upgrade Roadmap', 'Phased implementation blueprint preserving all working features');

addParagraph(
  'To deliver realistic voice, razor-sharp wit, and expert reasoning with zero regression risks, the upgrade should be executed in 4 sequential, reversible phases:'
);

addCalloutBox('PHASE 1: PROMPT & REASONING ENHANCEMENT (ZERO RISK)', [
  '• Target Files: src/services/tiaAiHandler.ts',
  '• Changes: Expand system prompt with 6 witty few-shot conversation examples, context-aware banter, and structured thinking steps.',
  '• Safety: Formalize guardrail boundaries (stay in learning scope, decline dangerous queries wittily). Increase context window from 800 to 2,500 chars.',
  '• Risk Level: Very Low (No frontend changes, no API route changes, instantly reversible).'
], PRIMARY, '#f8fafc');

addCalloutBox('PHASE 2: AUDIO SYNTHESIS UPGRADE (HIGH IMPACT)', [
  '• Target Files: server.ts, src/services/tiaAiHandler.ts, src/lib/useTiaVoice.ts',
  '• Changes: Implement Gemini TTS audio streaming modality (or ElevenLabs proxy) on /api/tia/chat returning audio buffer.',
  '• Safety Fallback: Keep window.speechSynthesis as graceful offline fallback if audio stream fails.',
  '• Risk Level: Low (Graceful degradation guarantees speech is never broken).'
], ACCENT, '#f0fdf4');

addCalloutBox('PHASE 3: SMART FOLLOW-UP & VOICE CONVERSATION LOOP', [
  '• Target Files: src/lib/useTiaVoice.ts, src/components/tia/TiaAssistantModal.tsx',
  '• Changes: Robust Web Audio API player with seamless transition into the 4-second listening window. Eliminate speech cancel collisions.',
  '• Safety: Strict event listener cleanups on component unmount.',
  '• Risk Level: Low.'
], SECONDARY, '#eff6ff');

addCalloutBox('PHASE 4: REGRESSION AUDIT & VERIFICATION MATRIX', [
  '• Verification: Test typed messages, manual mic button, follow-up countdown, course context grounding, and language switching.',
  '• Backward Compatibility: Verify mobile Safari and Android Chrome compatibility.',
  '• Risk Level: Zero.'
], '#1f2937', '#f9fafb');

// -------------------------------------------------------------
// CONCLUSION & SIGN-OFF
// -------------------------------------------------------------
doc.moveDown(1);
doc.font('Helvetica-Bold').fontSize(11).fillColor(PRIMARY).text('AUDIT CONCLUSION & READINESS');
doc.font('Helvetica').fontSize(9).fillColor(DARK).text(
  'The audit demonstrates that Matters has an exceptionally clean, well-modularized architecture. Tia can be upgraded to world-class voice realism and delightful conversational intelligence through targeted enhancements to the backend prompt and audio synthesis streaming pipeline, without disrupting any existing UI, database, or learning features.',
  { lineGap: 3 }
);

// Number pages in footer
const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  doc.font('Helvetica').fontSize(8).fillColor('#94a3b8').text(
    `Matters — Tia Phase 1 Architecture Audit Report | Page ${i + 1} of ${range.count}`,
    45,
    800,
    { align: 'center', width: 505 }
  );
}

doc.end();

writeStream.on('finish', () => {
  console.log('PDF generated successfully at:', outputPath);
});
