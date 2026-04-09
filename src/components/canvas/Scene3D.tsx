"use client";

import { Canvas } from '@react-three/fiber';
import DigitalUniverse from './DigitalUniverse';
import { Suspense, useEffect, useState } from 'react';

export default function Scene3D() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop' | null>(null);

  useEffect(() => {
    // Check if device is mobile using matchMedia and touch detection
    const checkDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileSize = window.matchMedia("(max-width: 768px)").matches;
      
      if (isTouch || isMobileSize) {
        setDeviceType('mobile');
      } else {
        setDeviceType('desktop');
      }
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Show nothing until we know the device type to avoid premature 3D initialization
  if (deviceType === null) {
    return <div className="fixed inset-0 bg-[#05050A] z-0" />;
  }

  // Degrade gracefully on mobile by preventing rendering complex 3D scenes
  if (deviceType === 'mobile') {
    return (
      <div className="absolute inset-0 bg-[#05050A] z-0 flex items-center justify-center opacity-50">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/40 via-black to-black opacity-30"></div>
      </div>
    );
  }

  // Full 3D Desktop Experience
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
