"use client";

import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useState, useRef } from 'react';
import * as THREE from 'three';

export default function DigitalUniverse() {
  const ref = useRef<THREE.Points>(null);
  
  // Use a multiple of 3 for positions to avoid NaN issues with stride 3
  const [sphere] = useState(() => {
    const data = random.inSphere(new Float32Array(6000), { radius: 1.5 }) as Float32Array;
    // Safety check: ensure no NaNs are present in the generated array
    for (let i = 0; i < data.length; i++) {
      if (isNaN(data[i])) data[i] = 0;
    }
    return data;
  });
  
  useFrame((state, delta) => {
    if (ref.current && !isNaN(delta)) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00F2FF"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
