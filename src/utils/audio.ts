// Web Audio API Retro Cyber Synth Sound Synthesizer
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

// Play a safe generalized synth frequency sweep
function playSynthTone(
  startFreq: number,
  endFreq: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainStart = 0.1
) {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    if (endFreq !== startFreq) {
      osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);
    }

    gainNode.gain.setValueAtTime(gainStart, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (error) {
    console.warn('AudioContext playback blocked or not supported by client browser:', error);
  }
}

// 1. Sleek high-tech click beat
export function playRetroClick() {
  playSynthTone(1200, 1800, 0.08, 'sine', 0.12);
}

// 2. High-frequency positive chime/select chirp
export function playSelectChirp() {
  playSynthTone(800, 1500, 0.12, 'sine', 0.1);
}

// 3. Dual-tone system boot/reset chime
export function playSystemReset() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    playSynthTone(600, 1200, 0.25, 'triangle', 0.08);
    setTimeout(() => {
      playSynthTone(900, 1800, 0.3, 'sine', 0.1);
    }, 120);
  } catch (e) {
    // ignore
  }
}

// 4. Low-fidelity warning/error or deletion sweeping tone
export function playEraseSound() {
  playSynthTone(400, 100, 0.25, 'sawtooth', 0.05);
}

// 5. Delicate menu tab switch sound
export function playTabTap() {
  playSynthTone(1500, 1200, 0.1, 'sine', 0.06);
}

// 6. Mario-style retro game COIN sound (double beep)
export function playCoinSound() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    playSynthTone(987.77, 987.77, 0.08, 'sine', 0.1); // B5 note
    setTimeout(() => {
      playSynthTone(1318.51, 1318.51, 0.22, 'sine', 0.1); // E6 note
    }, 85);
  } catch (e) {
    // ignore
  }
}

// 7. Fun "Pew Pew" laser blast frequency plunge
export function playLaserSound() {
  playSynthTone(2200, 180, 0.28, 'sawtooth', 0.07);
}

// 8. Triumphant pixel level up fanfare arpeggio
export function playLevelUpSound() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playSynthTone(freq, freq, 0.12, 'triangle', 0.08);
      }, idx * 100);
    });
  } catch (e) {
    // ignore
  }
}

