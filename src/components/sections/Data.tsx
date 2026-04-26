"use client";

import { Pie } from "react-chartjs-2";
import { useState } from "react";

export default function Data() {
  const [tankHeight, setTankHeight] = useState(45);
  const [tankValue, setTankValue] = useState(3200);
  const [tankLabel, setTankLabel] = useState("闲鱼 Z时代活跃交易额");
  const [tankDesc, setTankDesc] = useState("从追求限定盲盒到高净值的游戏大号");

  // Custom Animated Counter logic could be implemented here via useEffect if desired, 
  // currently we just set it abruptly or let React Transition handle the height

  const updateTank = (h: number, v: number, label: string, desc: string) => {
    setTankHeight(h);
    setTankLabel(label);
    setTankDesc(desc);
    
    // Simple animated counter
    const start = tankValue;
    const end = v;
    const duration = 800; // ms
    let startTime: number | null = null;
    
    const animateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setTankValue(Math.floor(start + (end - start) * progress));
      if (progress < 1) requestAnimationFrame(animateValue);
    };
    requestAnimationFrame(animateValue);
  };

  const reasonData = {
    labels: ['情感收藏(精神代餐)', '投资增值', '变现收益', '社交身份'],
    datasets: [{
      data: [48, 31, 16, 5],
      backgroundColor: ['#0ea5e9', '#6366f1', '#f59e0b', '#cbd5e1'],
      borderWidth: 0
    }]
  };

  return (
    <section id="data" className="scroll-section py-12 sm:py-24 bg-[#0a0a14] border-y border-white/10 px-4 sm:px-6 overflow-hidden z-10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 content-box">
          <h2 className="text-2xl sm:text-4xl font-black mb-3 sm:mb-4 text-white">千亿级大盘的“蓄水池与动机”</h2>
          <p className="text-slate-400 text-sm sm:text-base">年轻人的行为不仅仅是纯粹的开支，这也是一种“以玩养玩”的资产存续。</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 content-box">
            <div 
              className="flex items-center p-6 bg-white/5 rounded-3xl border-2 border-white/10 hover:border-sky-500 cursor-pointer shadow-sm group transition-all" 
              onClick={() => updateTank(45, 3200, '闲鱼 Z时代活跃交易额', '从追求限定盲盒到高净值的游戏大号')}
            >
              <div className="w-16 h-16 rounded-full bg-sky-500/20 flex items-center justify-center text-3xl group-hover:rotate-12 transition">🧑🎤</div>
              <div className="ml-6 flex-1">
                <h4 className="font-bold text-xl text-white">Z世代群体 (闲鱼活跃群)</h4>
                <p className="text-xs text-slate-400 mt-1">月均潮玩消费增幅43.4% | 注重身份社交传达</p>
              </div>
            </div>
            <div 
              className="flex items-center p-6 bg-white/5 rounded-3xl border-2 border-white/10 hover:border-purple-500 cursor-pointer shadow-sm group transition-all" 
              onClick={() => updateTank(85, 14000, '资深收藏玩家水位', '拥有多元增值追求的新阶级配置')}
            >
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center text-3xl group-hover:rotate-12 transition">👨💼</div>
              <div className="ml-6 flex-1">
                <h4 className="font-bold text-xl text-white">千禧群与高净值收藏者</h4>
                <p className="text-xs text-slate-400 mt-1">占比37%交易额 | 投资避险属性开始显现</p>
              </div>
            </div>
            
            {/* Chart */}
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 shadow-sm mt-4">
              <h4 className="font-bold text-white mb-4">是什么支撑了他们将现金转化为像素？</h4>
              <div className="h-[200px] relative">
                <Pie 
                  data={reasonData}
                  options={{
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { position: 'right', labels: { color: "#fff", font: {size: 11} } } }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="content-box">
            <div className="dark-glass-card p-6 sm:p-12 rounded-[2rem] sm:rounded-[4rem] shadow-xl border border-white/10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-sky-900/20 z-0 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-lg sm:text-2xl font-bold mb-6 sm:mb-8 text-white">{tankLabel}</h3>
                <div className="water-tank border border-white/20">
                  <div className="water-fill" style={{ height: `${tankHeight}%` }}>
                    <div className="water-wave"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-white text-3xl sm:text-5xl font-black drop-shadow-lg">
                    ¥ <span>{tankValue.toLocaleString()}</span> <span className="text-base sm:text-xl ml-1">/人均</span>
                  </div>
                </div>
                <p className="text-slate-400 italic leading-relaxed text-sm mt-8">“{tankDesc}”</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
