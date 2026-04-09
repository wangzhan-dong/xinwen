"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import dynamic from 'next/dynamic';
const Scene3D = dynamic(() => import('@/components/canvas/Scene3D'), { ssr: false });

// Import our sections
import Hero from '@/components/sections/Hero';
const Paradigm = dynamic(() => import('@/components/sections/Paradigm'), { ssr: false });
import Timeline from '@/components/sections/Timeline';
import Assets from '@/components/sections/Assets';
const Data = dynamic(() => import('@/components/sections/Data'), { ssr: false });
import Psychology from '@/components/sections/Psychology';
const Legal = dynamic(() => import('@/components/sections/Legal'), { ssr: false });
import Sources from '@/components/sections/Sources';

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in animation for elements with .content-box
    const contentBoxes = gsap.utils.toArray('.content-box');
    
    contentBoxes.forEach((box) => {
      gsap.fromTo(box as HTMLElement, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: box as HTMLElement,
            start: "top 85%", // Triggers when the top of the box hits 85% down the viewport
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // Cleanup scroll triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="relative w-full overflow-x-hidden min-h-screen selection:bg-sky-500/30">
      
      {/* 3D Background */}
      <Scene3D />

      {/* Navigation Layer */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md px-6 py-4 transition-all duration-300 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 pointer-events-auto">
            <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white font-bold italic shadow-lg">N</div>
            <span className="font-bold text-xl tracking-tighter text-white">权威媒体：全景视界 2026</span>
          </div>
          <div className="hidden lg:flex space-x-8 text-sm font-bold text-slate-400 pointer-events-auto">
            <a href="#hero" className="hover:text-sky-400 transition">起势</a>
            <a href="#paradigm" className="hover:text-sky-400 transition">范式迁移</a>
            <a href="#evolution" className="hover:text-sky-400 transition">时代演进</a>
            <a href="#assets" className="hover:text-sky-400 transition">核心锚点</a>
            <a href="#data" className="hover:text-sky-400 transition">价值蓄水</a>
            <a href="#psychology" className="hover:text-sky-400 transition">洞察与风险</a>
            <a href="#legal" className="hover:text-sky-400 transition">合规</a>
          </div>
          <button onClick={() => document.getElementById('sources')?.scrollIntoView()} className="pointer-events-auto bg-white/10 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-sky-600 border border-white/20 transition shadow-md">
            查阅数据源
          </button>
        </div>
      </nav>

      {/* Main Content Sections */}
      <Hero />
      <div className="relative bg-[#05050A]/80 backdrop-blur-sm z-10 w-full">
        <Paradigm />
        <Timeline />
        <Assets />
        <Data />
        <Psychology />
        <Legal />
        <Sources />
      </div>

    </main>
  );
}
