/**
 * Matters — Client-side Tia Audio Player & Provider Orchestrator
 * 
 * Supports:
 * - Direct playback of Cloud / Gemini TTS base64 audio with HTML5 Audio element.
 * - Clean interruption when user speaks or clicks mic.
 * - Automatic, robust fallback to Browser SpeechSynthesis if cloud audio fails.
 * - Non-sensitive diagnostic reporting to help user see exact active engine.
 */

export interface PlayTiaAudioOptions {
  text: string;
  language: 'hi' | 'en';
  provider?: 'browser' | 'gemini_tts' | 'google_cloud_chirp';
  voiceName?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
  fallbackToBrowser: (reason?: string) => void;
  onDiagnosticUpdate?: (info: {
    engine: string;
    voiceName: string;
    model?: string;
    isFallback: boolean;
    reason?: string;
  }) => void;
}

let activeAudioElement: HTMLAudioElement | null = null;

export function stopActiveAudioPlayback(): void {
  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
      activeAudioElement.src = '';
    } catch {
      // ignore
    }
    activeAudioElement = null;
  }
}

export async function playTiaResponseAudio(options: PlayTiaAudioOptions): Promise<void> {
  const {
    text,
    language,
    provider = 'browser',
    voiceName = 'Aoede',
    onStart,
    onEnd,
    onError,
    fallbackToBrowser,
    onDiagnosticUpdate,
  } = options;

  // If user selected browser voice, immediately use existing browser synthesis
  if (provider === 'browser') {
    if (onDiagnosticUpdate) {
      onDiagnosticUpdate({
        engine: 'Browser Voice',
        voiceName: language === 'hi' ? 'Female Hindi' : 'Female English',
        isFallback: false,
      });
    }
    fallbackToBrowser();
    return;
  }

  // Stop any ongoing audio before starting new playback
  stopActiveAudioPlayback();

  try {
    const res = await fetch('/api/tia/tts/synthesize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        provider,
        voiceName,
        language,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok || !data.audioBase64) {
      const reason = data?.error || `Server HTTP ${res.status}`;
      console.warn('[Tia Audio] Cloud audio unavailable, falling back to browser voice:', reason);
      if (onDiagnosticUpdate) {
        onDiagnosticUpdate({
          engine: 'Browser Voice (Fallback)',
          voiceName,
          isFallback: true,
          reason,
        });
      }
      fallbackToBrowser(reason);
      return;
    }

    // Convert base64 to Blob & Object URL for pristine HTML5 audio playback
    const byteCharacters = atob(data.audioBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: data.mimeType || 'audio/wav' });
    const audioUrl = URL.createObjectURL(blob);

    const audio = new Audio(audioUrl);
    activeAudioElement = audio;

    if (onDiagnosticUpdate) {
      onDiagnosticUpdate({
        engine: 'Gemini Studio HD (Real Audio)',
        voiceName: data.voiceName || voiceName,
        model: data.model || 'gemini-2.5-flash-preview-tts',
        isFallback: false,
      });
    }

    audio.onplay = () => {
      console.log(`[Tia Audio] Playing real Gemini TTS audio | Voice: ${data.voiceName || voiceName} | Model: ${data.model || 'gemini-2.5-flash-preview-tts'}`);
      if (onStart) onStart();
    };

    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      if (activeAudioElement === audio) {
        activeAudioElement = null;
      }
      if (onEnd) onEnd();
    };

    audio.onerror = (e) => {
      URL.revokeObjectURL(audioUrl);
      if (activeAudioElement === audio) {
        activeAudioElement = null;
      }
      console.warn('[Tia Audio] HTML5 audio decode error, falling back to browser voice:', e);
      if (onError) onError(e);
      if (onDiagnosticUpdate) {
        onDiagnosticUpdate({
          engine: 'Browser Voice (Fallback)',
          voiceName,
          isFallback: true,
          reason: 'Browser HTML5 Audio decode error',
        });
      }
      fallbackToBrowser('Audio element decode error');
    };

    await audio.play();
  } catch (err: any) {
    const reason = err?.message || 'Network/Synthesis failure';
    console.warn('[Tia Audio] Synthesis request failed, falling back to browser voice:', reason);
    if (onDiagnosticUpdate) {
      onDiagnosticUpdate({
        engine: 'Browser Voice (Fallback)',
        voiceName,
        isFallback: true,
        reason,
      });
    }
    fallbackToBrowser(reason);
  }
}
