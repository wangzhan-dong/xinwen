import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

export default function Legal() {
  const [isStruck, setIsStruck] = useState(false);
  const controls = useAnimation();

  const handleStrike = async () => {
    setIsStruck(true);
    await controls.start({
      rotate: [0, -45, 0],
      scale: [1, 1.2, 1],
      transition: { duration: 0.2 }
    });
    // Add a slight delay for content reveal
  };

  const legalData = {
    labels: ['2018', '2020', '2022', '2024', '2026'],
    datasets: [{
      label: '案例增速',
      data: [100, 240, 580, 1100, 2200],
      borderColor: '#0ea5e9', 
      backgroundColor: 'rgba(14,165,233,0.1)',
      borderWidth: 3, 
      tension: 0.4, 
      fill: true, 
      pointRadius: 4
    }]
  };

  return (
    <section id="legal" className="scroll-section py-12 sm:py-24 bg-[#05050A] text-white px-4 sm:px-6 overflow-hidden relative z-10 w-full">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="content-box">
            <motion.div 
              animate={controls}
              onClick={handleStrike}
              className="text-5xl sm:text-8xl mb-6 sm:mb-8 opacity-80 select-none cursor-pointer hover:opacity-100 transition-opacity inline-block drop-shadow-[0_0_30px_rgba(239,68,68,0.3)] active:scale-90"
              title="点击敲响法槌"
            >
              🔨
            </motion.div>
            <h2 className="text-2xl sm:text-4xl font-black mb-4 sm:mb-6 leading-tight">2026：监管落地，告别野蛮生长</h2>
            
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-8 bg-white/5 rounded-3xl border-l-4 border-red-500 backdrop-blur-sm shadow-sm"
              >
                <h4 className="font-bold text-xl mb-2 text-white">一级案由确立：你的资产，法律罩了</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  “网络虚拟财产纠纷”摆脱定损定编争议。虚拟法理的保护范围从单一的现金纠纷拓展倒模型代码、账户产权。
                </p>
              </motion.div>

              {isStruck && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 bg-red-500/10 rounded-3xl border border-red-500/30 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                    <span className="text-xs font-bold text-red-400 uppercase tracking-widest italic font-mono">
                      CIVIL_CODE_VERDICT_REVEALED
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">《中华人民共和国民法典》第一百二十七条</h3>
                  <p className="text-slate-300 leading-relaxed italic border-l-2 border-red-500/50 pl-4">
                    “法律对数据、网络虚拟财产的保护有规定的，依照其规定。”
                    <br />
                    <span className="block mt-4 text-xs opacity-70 not-italic">
                      解读：这意味着虚拟资产不再是法外之地，玩家的投入获得了物权属性的制度保障。
                    </span>
                  </p>
                </motion.div>
              )}

              <div className="p-8 bg-white/5 rounded-3xl border-l-4 border-sky-400 backdrop-blur-sm shadow-sm">
                <h4 className="font-bold text-xl mb-2 text-white">银发〔2026〕42号红线降临</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  划出炒作与实质确权的清晰界限。未来的叙事不是投机致富，而是虚拟资产与实物关联的金融融合。
                </p>
              </div>
            </div>
          </div>

          <div className="content-box">
            <div className="bg-white/5 p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[3rem] text-white shadow-2xl relative border-4 border-white/10 backdrop-blur-md">
              <div className="absolute top-2 right-4 text-6xl opacity-10 font-serif">§</div>
              <h3 className="text-2xl font-bold mb-6 text-white text-center">司法趋势全景</h3>
              <div className="h-[280px]">
                <Line 
                  data={legalData} 
                  options={{
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { 
                      y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "rgba(255,255,255,0.2)" } }, 
                      x: { grid: { display: false }, ticks: { color: "#fff" } } 
                    }
                  }} 
                />
              </div>
              <p className="text-center text-[11px] text-slate-400 mt-8 tracking-widest uppercase font-bold">
                中国司法案例涉虚拟财产增速雷达图 (指数预估)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
