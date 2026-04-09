"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GAMES = [
  { id: "hok", name: "王者荣耀", icon: "⚔️", rate: 0.15 },
  { id: "gfp", name: "和平精英", icon: "🔫", rate: 0.12 },
  { id: "id5", name: "第五人格", icon: "🎭", rate: 0.18 },
  { id: "df", name: "三角洲行动", icon: "🚁", rate: 0.10 },
  { id: "naruto", name: "火影忍者", icon: "🍃", rate: 0.20 },
  { id: "valorant", name: "无畏契约", icon: "🎯", rate: 0.14 },
  { id: "genshin", name: "原神", icon: "✨", rate: 0.25 },
  { id: "wuwa", name: "鸣潮", icon: "🌊", rate: 0.22 },
];

const SOCIALS = [
  { id: "bilibili", name: "B站", icon: "📺", val: 5.5 },
  { id: "douyin", name: "抖音", icon: "🎵", val: 3.2 },
  { id: "kuaishou", name: "快手", icon: "🧡", val: 2.8 },
  { id: "xhs", name: "小红书", icon: "📕", val: 8.5 },
];

export default function AssetEvaluator() {
  const [gameValues, setGameValues] = useState<Record<string, number>>({});
  const [socialValues, setSocialValues] = useState<Record<string, number>>({});
  const [cyberWorth, setCyberWorth] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setIsCalculating(true);
    const timer = setTimeout(() => {
      let total = 0;
      GAMES.forEach(game => {
        total += (gameValues[game.id] || 0) * game.rate;
      });
      SOCIALS.forEach(platform => {
        total += (socialValues[platform.id] || 0) * platform.val;
      });
      setCyberWorth(Math.floor(total));
      setIsCalculating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [gameValues, socialValues, mounted]);

  if (!mounted) return null;

  return (
    <section id="evaluator" className="scroll-section py-24 bg-[#0a0a14] px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-500">
            赛博身价评估器
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            基于市场中位数实时计算。输入你的数字化投入，量化你在这个时代的真实资产权重。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Games Input */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <span className="p-2 bg-sky-500/20 rounded-full text-sky-400">🎮</span>
                游戏资产配置 (充值金额)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {GAMES.map((game) => (
                  <div key={game.id} className="group relative">
                    <label className="block text-xs font-bold text-slate-500 mb-2 ml-1 uppercase tracking-wider">
                      {game.icon} {game.name}
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      onChange={(e) => setGameValues({ ...gameValues, [game.id]: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all placeholder:opacity-20"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <span className="p-2 bg-purple-500/20 rounded-full text-purple-400">📱</span>
                社交流量资产 (粉丝数量)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {SOCIALS.map((platform) => (
                  <div key={platform.id} className="group relative">
                    <label className="block text-xs font-bold text-slate-500 mb-2 ml-1 uppercase tracking-wider">
                      {platform.icon} {platform.name}
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      onChange={(e) => setSocialValues({ ...socialValues, [platform.id]: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all placeholder:opacity-20"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-sky-500/10 to-purple-500/10 border border-white/20 p-8 rounded-[3rem] backdrop-blur-2xl overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-500/20 blur-[80px] group-hover:bg-sky-500/30 transition-all"></div>
              
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-10 text-center">评估结果 / ESTIMATION</h3>
              
              <div className="text-center mb-10">
                <span className="text-[10px] text-sky-400 border border-sky-400/30 px-3 py-1 rounded-full font-mono mb-4 inline-block">
                  CYBER_WORTH_V2.0
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cyberWorth}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`text-6xl font-black mt-4 ${isCalculating ? 'opacity-30 blur-sm' : ''} transition-all`}
                  >
                    ¥{cyberWorth.toLocaleString()}
                  </motion.div>
                </AnimatePresence>
                <div className="text-xs text-slate-500 mt-4 font-mono">
                  预计资产估值上限
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-xs border-b border-white/5 pb-4">
                  <span className="opacity-50">权重协议</span>
                  <span className="text-sky-400">MARKET_MEDIAN_42</span>
                </div>
                <div className="flex justify-between text-xs border-b border-white/5 pb-4">
                  <span className="opacity-50">信用评级</span>
                  <span className="text-green-400">PRIME_ASSET</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed mt-10 italic">
                  *计算结果基于中国虚拟资产二级市场流动性中位数与 MCN 获客成本综合推算。仅供学术探讨与演示，不代表最终司法定损建议。
                </p>
              </div>

              <button className="w-full py-4 mt-10 bg-white text-black font-bold rounded-2xl hover:bg-sky-400 hover:text-white transition-all transform active:scale-95">
                生成资产报告
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
