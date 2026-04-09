"use client";

import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Only setup context on user interaction to avoid browser policies
    const setupAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        
        // Ambient Pad creation
        oscillatorRef.current = audioCtxRef.current.createOscillator();
        gainNodeRef.current = audioCtxRef.current.createGain();
        
        oscillatorRef.current.type = 'sine'; // Smooth ambient sound
        oscillatorRef.current.frequency.setValueAtTime(55, audioCtxRef.current.currentTime); // Low frequency
        
        // Add a bit of detune for chorus effect
        const osc2 = audioCtxRef.current.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(55, audioCtxRef.current.currentTime);
        osc2.detune.setValueAtTime(12, audioCtxRef.current.currentTime);

        const filter = audioCtxRef.current.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, audioCtxRef.current.currentTime);
        
        oscillatorRef.current.connect(gainNodeRef.current);
        osc2.connect(gainNodeRef.current);
        gainNodeRef.current.connect(filter);
        filter.connect(audioCtxRef.current.destination);

        gainNodeRef.current.gain.value = 0; // Starts muted
        oscillatorRef.current.start();
        osc2.start();

        // Add tick sound on click
        const playTick = () => {
          if (!audioCtxRef.current) return;
          const tickOsc = audioCtxRef.current.createOscillator();
          const tickGain = audioCtxRef.current.createGain();
          
          tickOsc.type = 'sine';
          tickOsc.frequency.setValueAtTime(800, audioCtxRef.current.currentTime);
          tickOsc.frequency.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.1);
          
          tickGain.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime);
          tickGain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.1);
          
          tickOsc.connect(tickGain);
          tickGain.connect(audioCtxRef.current.destination);
          
          tickOsc.start();
          tickOsc.stop(audioCtxRef.current.currentTime + 0.1);
        };

        window.addEventListener('click', playTick);
      }
    };

    window.addEventListener('click', setupAudio, { once: true });
    
    return () => {
      window.removeEventListener('click', setupAudio);
    };
  }, []);

  const toggleSound = () => {
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      
      const now = audioCtxRef.current.currentTime;
      if (isPlaying) {
        gainNodeRef.current?.gain.setTargetAtTime(0, now, 0.5);
      } else {
        gainNodeRef.current?.gain.setTargetAtTime(0.05, now, 1); // Very low volume (ambient pad)
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button 
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all font-mono text-sm flex items-center gap-2"
    >
      {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      <span className="hidden md:inline">{isPlaying ? 'SOUND ON' : 'SOUND OFF'}</span>
    </button>
  );
}
