"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const eraContent = [
  { id: 1, title: "1.0 娱乐时代 (早期)", desc: "仅仅代表游戏装备、点卡。价值极度依赖游戏公司寿命，缺乏独立产权地位。", icon: "🎮", mainTitle: "封闭场景下的原始积累", detail: "在最初的十年里，虚拟资产被视为“电子消费品”。由于缺乏法理天平的约束，它们曾长期被平台单向定义为“无主的数据流”，但底层用户的共识已经孕育了资产基础。", v: "V1.0" },
  { id: 2, title: "2.0 多元时代 (近年)", desc: "资产类别破圈。数字藏品、潮玩与闲鱼文化崛起，形成活跃强劲的二级玩家交易市场。", icon: "🎨", mainTitle: "观念觉醒与破圈扩张", detail: "数字藏品、潮玩及创作者版权平台的兴起，让虚拟资产打破次元。人们开始意识到，一段代码或图片，只要具备极大溢价条件，就能承载情感与高额投资价值。二手流转平台加速了变现。", v: "V2.0" },
  { id: 3, title: "3.0 合规时代 (2026-)", desc: "不仅是社交代币，更受实质保护。《民法典》确权并被司法列为一级诉讼案由，走向金融属性确立。", icon: "⚖️", mainTitle: "合规化时代的实质保障", detail: "当 2026 年虚拟财产正式被列入一级诉讼案由，最高法及央行的指导确立了红线。继承、抵押、跨平台清算开始受实质保护，迎来了制度性红利的合规爆发期。", v: "V3.0" }
];

export default function Timeline() {
  const [activeEra, setActiveEra] = useState(1);

  const activeContent = eraContent.find(c => c.id === activeEra)!;

  return (
    <section id="evolution" className="scroll-section py-12 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto z-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="content-box">
          <h2 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-10 text-white">时代更迭：虚拟资产的三段进化</h2>
          <div className="space-y-6">
            {eraContent.map((era) => (
              <div 
                key={era.id}
                onClick={() => setActiveEra(era.id)}
                className={`p-4 sm:p-6 border-l-4 rounded-r-2xl cursor-pointer transition-all ${activeEra === era.id ? 'bg-white/10 border-sky-500 shadow-md' : 'bg-white/5 border-white/20 hover:bg-white/10'}`}
              >
                <h4 className={`font-bold text-base sm:text-xl mb-1.5 sm:mb-2 ${activeEra === era.id ? 'text-sky-400' : 'text-slate-200'}`}>
                  {era.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {era.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="content-box">
          <div className="dark-glass-card text-white p-6 sm:p-12 rounded-[1.5rem] sm:rounded-[3rem] shadow-2xl relative min-h-[280px] sm:min-h-[400px] flex flex-col justify-center overflow-hidden border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEra}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="text-4xl sm:text-7xl mb-4 sm:mb-6 opacity-80">{activeContent.icon}</div>
                <h3 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-sky-400">{activeContent.mainTitle}</h3>
                <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">{activeContent.detail}</p>
              </motion.div>
            </AnimatePresence>
            <div className="absolute -bottom-10 -right-10 text-[100px] sm:text-[200px] text-white/5 font-black italic select-none">
              {activeContent.v}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
