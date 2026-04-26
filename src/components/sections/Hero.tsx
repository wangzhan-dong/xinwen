"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section id="hero" className="scroll-section relative h-screen w-full flex items-center justify-center overflow-hidden px-4 z-10 text-center">
      <div className="content-box max-w-4xl mt-16 sm:mt-10">
        <motion.p 
          className="text-sky-400 font-mono tracking-widest mb-3 sm:mb-4 uppercase text-[11px] sm:text-sm border border-sky-400/30 inline-block px-3 sm:px-4 py-1 rounded-full bg-sky-900/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          2026 特别策划深度报道
        </motion.p>
        
        <motion.h1 
          className="text-3xl sm:text-5xl md:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight"
          initial={{ letterSpacing: "0.2em", opacity: 0 }}
          animate={{ letterSpacing: "0.02em", opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          数字资产<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            进化论 & 财富崛起
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-slate-400 text-sm sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          这不是代码的狂欢，而是现实财富最深刻的迁徙。<br/>
          Z世代与Alpha世代正将数字资产化作个人净值的核心支柱。
        </motion.p>
        
        <motion.div 
          className="flex flex-col md:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="#paradigm" className="bg-sky-600 text-white px-6 sm:px-10 py-3.5 sm:py-5 rounded-2xl font-bold shadow-xl hover:bg-sky-500 transition-all transform hover:scale-105 text-sm sm:text-base">
            进入全景报告
          </a>
          <button 
            onClick={() => setIsPopupOpen(true)} 
            className="bg-white/10 text-white border border-white/20 px-6 sm:px-10 py-3.5 sm:py-5 rounded-2xl font-bold hover:bg-white/20 transition-all text-sm sm:text-base"
          >
            互动：你的资产值钱吗？
          </button>
        </motion.div>
      </div>

      {/* Interactive Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-sm pointer-events-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 max-w-lg w-full text-center shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-4 italic text-slate-800">
                “如果一款网游停止运营，你认为账号数据该不该退赔真金白银？”
              </h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                在2026年，这不仅是观念博弈，更是财产属性确权的核心争议点。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setIsPopupOpen(false)} className="bg-sky-600 text-white py-4 rounded-xl font-bold hover:bg-sky-700 transition">
                  必须退赔
                </button>
                <button onClick={() => setIsPopupOpen(false)} className="bg-slate-100 text-slate-700 py-4 rounded-xl font-bold hover:bg-slate-200 transition">
                  只是数据
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
