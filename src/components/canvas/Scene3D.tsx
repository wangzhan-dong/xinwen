"use client";

import { Canvas } from '@react-three/fiber';
import DigitalUniverse from './DigitalUniverse';
import { Suspense, useEffect, useState } from 'react';

export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Degrade gracefully on mobile by preventing rendering complex 3D scenes
  if (isMobile) {
    return (
      <div className="absolute inset-0 bg-[#05050A] z-0 flex items-center justify-center opacity-50">
        {/* Placeholder: You could add a responsive WebP background here as fallback */}
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/40 via-black to-black"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        shadows
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <DigitalUniverse />
        </Suspense>
      </Canvas>
    </div>
  );
}
