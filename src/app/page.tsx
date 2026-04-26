"use client";

import { useEffect, useRef, useState } from 'react';
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
import DataDeepDive from '@/components/sections/DataDeepDive';
const SourceDataViz = dynamic(() => import('@/components/sections/SourceDataViz'), { 
  ssr: false,
  loading: () => <div className="min-h-[500px] flex items-center justify-center bg-[#06061a] text-white/20">加载信源数据...</div>
});
const AssetEvaluator = dynamic(() => import('@/components/sections/AssetEvaluator'), { 
  ssr: false,
  loading: () => <div className="min-h-[500px] flex items-center justify-center bg-[#0a0a14] text-white/20">加载身价评估中心...</div>
});
const InteractiveQuiz = dynamic(() => import('@/components/sections/InteractiveQuiz'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] flex items-center justify-center bg-[#08081a] text-white/20">加载知识挑战...</div>
});
const LivePoll = dynamic(() => import('@/components/sections/LivePoll'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] flex items-center justify-center bg-[#0a0a18] text-white/20">加载实时民调...</div>
});
import Psychology from '@/components/sections/Psychology';
const Legal = dynamic(() => import('@/components/sections/Legal'), { ssr: false });
import Sources from '@/components/sections/Sources';

export default function Home() {
  const containerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const navLinks = [
    { href: '#hero', label: '起势' },
    { href: '#evolution', label: '时代演进' },
    { href: '#assets', label: '核心锚点' },
    { href: '#deepdive', label: '📊 数据深潜', accent: 'text-sky-500 font-bold' },
    { href: '#sourcedata', label: '📋 信源数据', accent: 'text-amber-400 font-bold' },
    { href: '#evaluator', label: '✨ 身价评估' },
    { href: '#quiz', label: '🧠 知识挑战' },
    { href: '#poll', label: '🗳️ 投票' },
    { href: '#legal', label: '⚖️ 合规' },
  ];

  return (
    <main ref={containerRef} className="relative w-full overflow-x-hidden min-h-screen selection:bg-sky-500/30 font-sans">
      
      {/* 3D Background - hidden on mobile for performance */}
      <div className="hidden md:block">
        <Scene3D />
      </div>

      {/* Navigation Layer */}
      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs lg:text-sm">
          <div className="flex items-center space-x-2 pointer-events-auto min-w-0">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white font-bold italic shadow-lg flex-shrink-0">N</div>
            <span className="font-bold text-sm sm:text-base lg:text-xl tracking-tighter text-white truncate">虚拟资产发展全景观察</span>
          </div>
          <div className="hidden lg:flex space-x-4 text-slate-400 pointer-events-auto font-medium">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className={`hover:text-sky-400 transition ${link.accent || ''}`}>{link.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <button onClick={() => document.getElementById('sources')?.scrollIntoView()} className="hidden sm:block bg-white/10 text-white px-3 lg:px-5 py-2 rounded-full text-[10px] lg:text-xs font-bold hover:bg-sky-600 border border-white/20 transition shadow-md whitespace-nowrap">
              数据源
            </button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/10 border border-white/20 text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="lg:hidden mt-3 pb-3 border-t border-white/10 pt-3 animate-in slide-in-from-top">
            <div className="grid grid-cols-3 gap-2">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-center px-2 py-2.5 rounded-xl text-xs font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition ${link.accent || 'text-slate-300'}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Sections */}
      <Hero />
      <div className="relative bg-[#05050A]/80 backdrop-blur-sm z-10 w-full">
        <Paradigm />
        <Timeline />
        <Assets />
        <Data />
        <DataDeepDive />
        <SourceDataViz />
        <AssetEvaluator />
        <InteractiveQuiz />
        <LivePoll />
        <Psychology />
        <Legal />
        <Sources />
      </div>

    </main>
  );
}
