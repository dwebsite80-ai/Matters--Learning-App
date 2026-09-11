import confetti from 'canvas-confetti';

export function triggerConfetti() {
  try {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#4f46e5', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'],
    });
  } catch (e) {
    console.log('Confetti triggered', e);
  }
}

export function triggerStreakCelebration() {
  try {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#f97316', '#ef4444', '#f59e0b', '#fbbf24'],
    });
  } catch (e) {
    console.log('Streak celebration', e);
  }
}
