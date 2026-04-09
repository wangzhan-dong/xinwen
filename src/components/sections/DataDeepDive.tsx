"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DataDeepDive() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Chart 1: Market Revenue Trend (Line)
  const lineData = {
    labels: ["2021", "2022", "2023", "2024E", "2025E", "2026E"],
    datasets: [
      {
        label: "中国游戏市场规模 (亿元)",
        data: [2965, 2658, 3029, 3257, 3507, 3780],
        borderColor: "rgb(14, 165, 233)",
        backgroundColor: "rgba(14, 165, 233, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Chart 2: Transaction Volume by Category (Bar)
  const barData = {
    labels: ["游戏币", "游戏装备", "消耗品", "代练服务", "账号交易"],
    datasets: [
      {
        label: "交易规模 (亿元)",
        data: [253.9, 248.7, 190.1, 33.4, 15.2],
        backgroundColor: [
          "rgba(56, 189, 248, 0.6)",
          "rgba(168, 85, 247, 0.6)",
          "rgba(244, 63, 94, 0.6)",
          "rgba(20, 184, 166, 0.6)",
          "rgba(245, 158, 11, 0.6)",
        ],
        borderRadius: 8,
      },
    ],
  };

  // Chart 3: Gen Z vs Alpha Radar
  const radarData = {
    labels: ["皮肤正义", "社交货币", "UGC内容", "数字身份", "即时变现", "沉浸体验"],
    datasets: [
      {
        label: "Z 世代",
        data: [90, 85, 60, 95, 80, 75],
        backgroundColor: "rgba(14, 165, 233, 0.2)",
        borderColor: "rgb(14, 165, 233)",
        pointBackgroundColor: "rgb(14, 165, 233)",
      },
      {
        label: "Alpha 世代",
        data: [75, 95, 92, 88, 65, 98],
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        borderColor: "rgb(168, 85, 247)",
        pointBackgroundColor: "rgb(168, 85, 247)",
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { color: "rgba(255, 255, 255, 0.6)", font: { size: 10 } },
      },
    },
    scales: {
      y: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "rgba(255, 255, 255, 0.4)" },
      },
      x: {
        grid: { display: false },
        ticks: { color: "rgba(255, 255, 255, 0.4)" },
      },
    },
  };

  const radarOptions = {
    ...commonOptions,
    scales: {
      r: {
        angleLines: { color: "rgba(255, 255, 255, 0.1)" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        pointLabels: { color: "rgba(255, 255, 255, 0.6)" },
        ticks: { display: false },
      },
    },
  };

  return (
    <section id="deepdive" className="scroll-section py-24 bg-[#05050A] text-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-sky-500 font-mono text-sm tracking-widest uppercase mb-4 block"
          >
            Data Deep Dive / 深度洞察
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-8 leading-tight"
          >
            透视<span className="text-sky-500">万亿级</span>数字资产<br />
            背后的真相
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { label: "全球玩家总数", value: "35亿+", sub: "预计2025年底", color: "text-sky-400" },
            { label: "国内物品交易规模", value: "742.5亿", sub: "2023年年度数据", color: "text-purple-400" },
            { label: "AI 技术覆盖率", value: "52%", sub: "游戏开发端应用占比", color: "text-emerald-400" },
            { label: "小程序游戏增速", value: "34.4%", sub: "2025年同比营收增长", color: "text-amber-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md"
            >
              <div className="text-xs text-slate-500 mb-2 font-bold">{stat.label}</div>
              <div className={`text-2xl md:text-3xl font-black mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] text-slate-600 font-mono">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Market Revenue */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] min-h-[400px]"
          >
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <span className="w-2 h-6 bg-sky-500 rounded-full"></span>
              中国游戏产业实际销售收入趋势
            </h3>
            <div className="h-[280px]">
              <Line data={lineData} options={commonOptions} />
            </div>
            <p className="text-xs text-slate-500 mt-6 leading-relaxed italic">
              数据来源：2025年中国游戏产业报告。即使在宏观环境多变的情况下，游戏市场依然保持 7% 以上的稳健增长率。
            </p>
          </motion.div>

          {/* Generational Radar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] min-h-[400px]"
          >
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
              Z 世代 vs Alpha 世代 虚拟资产兴趣图谱
            </h3>
            <div className="h-[280px]">
              <Radar data={radarData} options={radarOptions} />
            </div>
            <p className="text-xs text-slate-500 mt-6 leading-relaxed italic">
              Alpha 世代表现出更强的“数字架构师”属性，对 UGC 和沉浸式社交的需求明显高于 Z 世代。
            </p>
          </motion.div>

          {/* Asset Categories */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] min-h-[450px]"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
                游戏虚拟物品交易细分市场构成 (2023)
              </h3>
              <div className="flex gap-4">
                <span className="text-[10px] bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full border border-sky-500/20"># 账号交易占比较小但客单价高</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20"># 道具装备为核心刚需</span>
              </div>
            </div>
            <div className="h-[280px]">
              <Bar data={barData} options={{ ...commonOptions, indexAxis: 'y' as const }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
