"use client";

import { motion } from "framer-motion";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Paradigm() {
  const zGenData = {
    labels: ['虚拟占比超50%'],
    datasets: [
      { label: 'Z世代投资者', data: [22.4], backgroundColor: '#0ea5e9', borderRadius: 4 },
      { label: '整体投资者', data: [12.5], backgroundColor: '#94a3b8', borderRadius: 4 }
    ]
  };

  const alphaGenData = {
    labels: ['购买数字应用', '游戏内购(IAP)', '其他消费'],
    datasets: [{
      data: [53, 42, 5],
      backgroundColor: ['#4f46e5', '#38bdf8', '#e2e8f0'],
      borderWidth: 0
    }]
  };

  return (
    <section id="paradigm" className="scroll-section py-12 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10 z-10 relative">
      <div className="text-center mb-10 sm:mb-16 content-box">
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 sm:mb-4">从物质持有向数字资产的结构性迁移</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          数字在线支出已占全球家庭总预算 2.7%，在年轻人中更是占据着极大的分量。这并非通货膨胀，而是资产配置重心的位移。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        <motion.div className="glass-card p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] content-box shadow-sm">
          <h3 className="text-lg sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mr-3 text-sm">Z</span>
            Z世代的激进投资逻辑
          </h3>
          <p className="text-slate-300 mb-6 text-sm leading-relaxed">
            Z世代在投资上表现出对数字生态的高度依赖。约 <strong className="text-sky-400 text-lg">22.4%</strong> 的投资群将其总资产50%以上投入虚拟项目，部分市场的青年受众有 <strong className="text-amber-400 text-lg">23%</strong> 认为“加密与虚拟资产的安全感远超房地产”。
          </p>
          <div className="h-[220px] relative">
            <Bar 
              data={zGenData} 
              options={{
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: "#fff" } } },
                scales: { 
                  y: { display: false }, 
                  x: { grid: { display: false }, ticks: { color: "#fff" } } 
                }
              }} 
            />
          </div>
        </motion.div>

        <motion.div className="glass-card p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] content-box shadow-sm">
          <h3 className="text-lg sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mr-3 text-sm">A</span>
            Alpha世代的“游戏即钱包”
          </h3>
          <p className="text-slate-300 mb-6 text-sm leading-relaxed">
            对于更年轻的 Alpha 世代，他们辛苦赚来的劳动所得主要流向数字应用内购买（IAP）。游戏内的皮肤和通行证已成为他们社交圈层中的实质“资产”。
          </p>
          <div className="h-[220px] relative">
            <Doughnut 
              data={alphaGenData} 
              options={{
                responsive: true, maintainAspectRatio: false, cutout: '75%',
                plugins: { legend: { position: 'right', labels: { color: "#fff" } } }
              }} 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
