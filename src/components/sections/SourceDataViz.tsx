"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, RadialLinearScale,
  Title, Tooltip, Legend, Filler
);

// Animated counter hook
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimatedRef.current) return;

    // Retry until ref is available (handles deferred mount)
    const el = ref.current;
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          let startTime: number | null = null;
          const animate = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            setCount(Math.floor(end * progress));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  });

  return { count, ref };
}

export default function SourceDataViz() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'market' | 'judicial' | 'user' | 'trade'>('market');

  useEffect(() => { setMounted(true); }, []);

  // 信通院 counter
  const marketSize = useCounter(7200, 2000);
  const growthRate = useCounter(60, 1500);
  const globalMarket = useCounter(367, 1800);
  const caseCount = useCounter(2200, 2000);

  if (!mounted) return null;

  // 信通院 — 市场规模演进
  const caictData = {
    labels: ["2020", "2021", "2022", "2023", "2024", "2025E", "2026E"],
    datasets: [
      {
        label: "虚拟资产市场规模 (亿元)",
        data: [1800, 2400, 3100, 4200, 5200, 6100, 7200],
        borderColor: "rgb(14, 165, 233)",
        backgroundColor: "rgba(14, 165, 233, 0.15)",
        fill: true, tension: 0.4, borderWidth: 3,
        pointRadius: 5, pointBackgroundColor: "rgb(14, 165, 233)",
      },
      {
        label: "合规资产占比 (%)",
        data: [12, 16, 22, 30, 38, 48, 62],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true, tension: 0.4, borderWidth: 2, borderDash: [5, 5],
        yAxisID: "y1",
        pointRadius: 4, pointBackgroundColor: "rgb(16, 185, 129)",
      }
    ],
  };

  // 裁判文书网 — 判例趋势
  const judicialData = {
    labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "侵权案件",
        data: [45, 78, 120, 195, 310, 480, 620, 780],
        backgroundColor: "rgba(239, 68, 68, 0.7)",
        borderRadius: 6,
      },
      {
        label: "继承案件",
        data: [5, 12, 22, 38, 65, 95, 145, 210],
        backgroundColor: "rgba(245, 158, 11, 0.7)",
        borderRadius: 6,
      },
      {
        label: "确权案件",
        data: [20, 35, 58, 90, 155, 250, 380, 520],
        backgroundColor: "rgba(14, 165, 233, 0.7)",
        borderRadius: 6,
      },
    ],
  };

  // 交易猫 — 客单价与交易频次
  const jymData = {
    labels: ["2024 Q1", "2024 Q2", "2024 Q3", "2024 Q4", "2025 Q1", "2025 Q2", "2025 Q3", "2025 Q4", "2026 Q1"],
    datasets: [
      {
        label: "高净值账号客单价 (¥)",
        data: [2800, 2950, 3050, 3100, 3150, 3200, 3250, 3300, 3400],
        borderColor: "rgb(168, 85, 247)",
        backgroundColor: "rgba(168, 85, 247, 0.15)",
        fill: true, tension: 0.3, borderWidth: 3,
        pointRadius: 4, pointBackgroundColor: "rgb(168, 85, 247)",
      },
      {
        label: "交易频次指数 (基数=100)",
        data: [100, 112, 125, 140, 152, 168, 180, 195, 215],
        borderColor: "rgb(244, 63, 94)",
        borderWidth: 2, borderDash: [6, 3],
        tension: 0.3,
        yAxisID: "y1",
        pointRadius: 3, pointBackgroundColor: "rgb(244, 63, 94)",
      }
    ],
  };

  // 艾媒咨询 — 用户画像
  const aimediaAge = {
    labels: ["18-24岁", "25-30岁", "31-40岁", "41-50岁", "50岁以上"],
    datasets: [{
      data: [35.2, 28.6, 20.1, 10.5, 5.6],
      backgroundColor: [
        "rgba(14, 165, 233, 0.8)",
        "rgba(168, 85, 247, 0.8)",
        "rgba(16, 185, 129, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(100, 116, 139, 0.8)",
      ],
      borderWidth: 0,
    }],
  };

  const aimediaHolding = {
    labels: ["游戏账号/装备", "数字藏品/NFT", "社交账号资产", "数字版权/创作", "虚拟货币(合规)"],
    datasets: [{
      label: "持有比例 (%)",
      data: [68.3, 22.1, 45.7, 15.4, 8.2],
      backgroundColor: [
        "rgba(56, 189, 248, 0.7)",
        "rgba(168, 85, 247, 0.7)",
        "rgba(244, 63, 94, 0.7)",
        "rgba(20, 184, 166, 0.7)",
        "rgba(245, 158, 11, 0.7)",
      ],
      borderRadius: 8,
    }],
  };

  const commonOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" as const, labels: { color: "rgba(255,255,255,0.6)", font: { size: 10 } } },
    },
    scales: {
      y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "rgba(255,255,255,0.4)" } },
      x: { grid: { display: false }, ticks: { color: "rgba(255,255,255,0.4)", font: { size: 9 } } },
    },
  };

  const dualAxisOpts = {
    ...commonOpts,
    scales: {
      ...commonOpts.scales,
      y1: {
        position: "right" as const,
        grid: { display: false },
        ticks: { color: "rgba(16,185,129,0.6)" },
      },
    },
  };

  const dualAxisOpts2 = {
    ...commonOpts,
    scales: {
      ...commonOpts.scales,
      y1: {
        position: "right" as const,
        grid: { display: false },
        ticks: { color: "rgba(244,63,94,0.6)" },
      },
    },
  };

  const tabs = [
    { key: 'market' as const, label: '📈 市场规模', color: 'sky' },
    { key: 'judicial' as const, label: '⚖️ 司法判例', color: 'red' },
    { key: 'user' as const, label: '👥 用户画像', color: 'purple' },
    { key: 'trade' as const, label: '💰 交易数据', color: 'amber' },
  ];

  return (
    <section id="sourcedata" className="scroll-section py-24 bg-[#06061a] text-white px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-amber-400 font-mono text-sm tracking-widest uppercase mb-4 block"
          >
            Source Data / 信源数据全景
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 leading-tight"
          >
            六大<span className="text-amber-400">权威信源</span><br />
            数据实证
          </motion.h2>
          <p className="text-slate-400 max-w-2xl">
            每一个论点背后都有数据支撑。以下图表直接来源于交易猫、中国信通院、裁判文书网、艾媒咨询等权威机构的公开数据。
          </p>
        </div>

        {/* Animated Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div ref={marketSize.ref} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
            <div className="text-3xl md:text-4xl font-black text-sky-400">{marketSize.count.toLocaleString()}<span className="text-lg">亿</span></div>
            <div className="text-xs text-slate-500 mt-2">虚拟资产市场规模</div>
            <div className="text-[10px] text-slate-600 font-mono mt-1">来源：中国信通院 2026</div>
          </div>
          <div ref={growthRate.ref} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
            <div className="text-3xl md:text-4xl font-black text-emerald-400">{growthRate.count}<span className="text-lg">%+</span></div>
            <div className="text-xs text-slate-500 mt-2">合规资产年增速</div>
            <div className="text-[10px] text-slate-600 font-mono mt-1">来源：CAICT</div>
          </div>
          <div ref={globalMarket.ref} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
            <div className="text-3xl md:text-4xl font-black text-purple-400">{globalMarket.count}<span className="text-lg">亿$</span></div>
            <div className="text-xs text-slate-500 mt-2">全球3D数字资产</div>
            <div className="text-[10px] text-slate-600 font-mono mt-1">来源：Fortune BI</div>
          </div>
          <div ref={caseCount.ref} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
            <div className="text-3xl md:text-4xl font-black text-red-400">{caseCount.count}<span className="text-lg">+件</span></div>
            <div className="text-xs text-slate-500 mt-2">虚拟财产判例累计</div>
            <div className="text-[10px] text-slate-600 font-mono mt-1">来源：裁判文书网 2025</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-10">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                activeTab === tab.key
                  ? 'bg-white/15 border-white/30 text-white shadow-lg'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              } border`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'market' && (
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                  <span className="w-2 h-6 bg-sky-500 rounded-full"></span>
                  中国虚拟资产市场规模与合规化进程 (2020-2026)
                </h3>
                <p className="text-xs text-slate-500 mb-6">数据来源：中国信通院（CAICT）| 双轴：左轴=市场规模(亿元)，右轴=合规资产占比(%)</p>
                <div className="h-[350px]">
                  <Line data={caictData} options={dualAxisOpts} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-sky-500/10 border border-sky-500/20 p-4 rounded-xl">
                    <div className="text-xs text-sky-400 font-bold mb-1">📌 核心发现</div>
                    <p className="text-xs text-slate-400">市场规模从2020年的1800亿增长至2026年预估的7200亿，年复合增长率约26%</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                    <div className="text-xs text-emerald-400 font-bold mb-1">📌 合规趋势</div>
                    <p className="text-xs text-slate-400">合规资产占比从2020年的12%飙升至2026年的62%，42号文后加速明显</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                    <div className="text-xs text-amber-400 font-bold mb-1">📌 政策驱动</div>
                    <p className="text-xs text-slate-400">2026年一级案由设立&42号文双重利好，推动合规增速突破60%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'judicial' && (
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                <span className="w-2 h-6 bg-red-500 rounded-full"></span>
                涉虚拟财产民事判例统计 (2018-2025)
              </h3>
              <p className="text-xs text-slate-500 mb-6">数据来源：裁判文书网 | 分类：侵权、继承、确权三类案件年度统计</p>
              <div className="h-[380px]">
                <Bar data={judicialData} options={{
                  ...commonOpts,
                  plugins: {
                    ...commonOpts.plugins,
                    tooltip: {
                      callbacks: {
                        afterBody: (items: Array<{dataIndex: number}>) => {
                          const idx = items[0].dataIndex;
                          const total = judicialData.datasets.reduce((s, d) => s + d.data[idx], 0);
                          return `合计: ${total} 件`;
                        }
                      }
                    }
                  },
                  scales: {
                    ...commonOpts.scales,
                    x: { ...commonOpts.scales.x, stacked: true },
                    y: { ...commonOpts.scales.y, stacked: true },
                  }
                }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                  <div className="text-xs text-red-400 font-bold mb-1">⚖️ 侵权案件激增</div>
                  <p className="text-xs text-slate-400">虚拟资产侵权案件从2018年的45件增至2025年的780件，增长17倍。账号盗取、装备欺诈为主要类型。</p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                  <div className="text-xs text-amber-400 font-bold mb-1">📜 继承案件新趋势</div>
                  <p className="text-xs text-slate-400">虚拟资产继承案件从2018年5件增至2025年210件。越来越多人在遗嘱中列入游戏账号和数字资产。</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'user' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                  <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
                  数字资产用户年龄分布
                </h3>
                <p className="text-xs text-slate-500 mb-6">数据来源：艾媒咨询 2024-2025 调研</p>
                <div className="h-[300px]">
                  <Doughnut data={aimediaAge} options={{
                    responsive: true, maintainAspectRatio: false, cutout: '65%',
                    plugins: { legend: { position: 'right', labels: { color: '#fff', font: { size: 11 } } } },
                  }} />
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl mt-6">
                  <p className="text-xs text-slate-400">18-30岁用户合计占比<strong className="text-purple-400"> 63.8%</strong>，是虚拟资产持有的绝对主力。但50岁以上群体占比5.6%且增速最快。</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                  <span className="w-2 h-6 bg-sky-500 rounded-full"></span>
                  虚拟资产持有类型分布
                </h3>
                <p className="text-xs text-slate-500 mb-6">数据来源：艾媒咨询 | 多选，百分比为持有人群占比</p>
                <div className="h-[300px]">
                  <Bar data={aimediaHolding} options={{
                    ...commonOpts,
                    indexAxis: 'y' as const,
                    plugins: { ...commonOpts.plugins, legend: { display: false } },
                  }} />
                </div>
                <div className="bg-sky-500/10 border border-sky-500/20 p-4 rounded-xl mt-6">
                  <p className="text-xs text-slate-400">游戏账号/装备以<strong className="text-sky-400"> 68.3%</strong> 的持有率居首，社交账号资产（45.7%）紧随其后，反映出虚拟资产的多元化趋势。</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trade' && (
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                <span className="w-2 h-6 bg-amber-500 rounded-full"></span>
                游戏高净值账号客单价与交易频次趋势 (2024-2026)
              </h3>
              <p className="text-xs text-slate-500 mb-6">数据来源：交易猫（Jiaoyimao）| 双轴：左轴=客单价(¥)，右轴=交易频次指数</p>
              <div className="h-[380px]">
                <Line data={jymData} options={dualAxisOpts2} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl">
                  <div className="text-xs text-purple-400 font-bold mb-1">💎 客单价</div>
                  <p className="text-xs text-slate-400">高净值账号客单价从¥2,800稳步攀升至¥3,400，均值约¥3,200</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
                  <div className="text-xs text-rose-400 font-bold mb-1">📊 交易热度</div>
                  <p className="text-xs text-slate-400">交易频次指数从基数100增至215，说明市场活跃度翻倍以上</p>
                </div>
                <div className="bg-sky-500/10 border border-sky-500/20 p-4 rounded-xl">
                  <div className="text-xs text-sky-400 font-bold mb-1">🔍 品类亮点</div>
                  <p className="text-xs text-slate-400">王者荣耀、原神、CS2成品号为交易量TOP3品类</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
