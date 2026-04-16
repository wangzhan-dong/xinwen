"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// ——— 资产类别定义 ———
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
  { id: "bilibili", name: "B站", icon: "📺", val: 0.45 },
  { id: "douyin", name: "抖音", icon: "🎵", val: 0.25 },
  { id: "kuaishou", name: "快手", icon: "🧡", val: 0.18 },
  { id: "xhs", name: "小红书", icon: "📕", val: 0.65 },
];

const DIGITAL_ASSETS = [
  { id: "skins", name: "游戏皮肤/道具库存", icon: "🎨", desc: "所有游戏中皮肤和道具的估值总额", unit: "¥" },
  { id: "collectibles", name: "数字藏品/NFT", icon: "🖼️", desc: "持有的数字藏品购入总成本", unit: "¥" },
  { id: "domain", name: "域名资产", icon: "🌐", desc: "持有域名的总估值", unit: "¥" },
  { id: "eshop", name: "电商店铺（淘宝/闲鱼）", icon: "🏪", desc: "店铺信誉、粉丝、历史交易额折算", unit: "¥" },
  { id: "content", name: "原创内容/IP版权", icon: "✏️", desc: "视频、文章、音乐等原创内容变现潜力", unit: "¥" },
  { id: "vip", name: "平台VIP/会员权益", icon: "👑", desc: "各平台年费VIP累积投入（含音乐、视频、阅读）", unit: "¥" },
  { id: "crypto", name: "合规数字货币", icon: "🪙", desc: "合规交易所持仓市值（如有）", unit: "¥" },
  { id: "virtual_currency", name: "游戏虚拟币存量", icon: "💎", desc: "各游戏内货币折合人民币价值", unit: "¥" },
];

// ——— 报告等级 ———
function getAssetLevel(total: number) {
  if (total >= 50000) return { level: "S", title: "赛博巨鲸", color: "text-amber-400", bg: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/30", desc: "你的虚拟资产已达到高净值水平，建议关注《民法典》第127条对你的保护权益，并考虑将核心资产列入遗嘱规划。" };
  if (total >= 20000) return { level: "A", title: "数字贵族", color: "text-purple-400", bg: "from-purple-500/20 to-indigo-500/20", border: "border-purple-500/30", desc: "你的数字资产配置已超过全国Z世代人均持仓上限(¥5,000)数倍，属于高活跃度数字资产持有者。" };
  if (total >= 5000) return { level: "B", title: "活跃玩家", color: "text-sky-400", bg: "from-sky-500/20 to-blue-500/20", border: "border-sky-500/30", desc: "你的虚拟资产水平处于Z世代人均持仓区间（¥2,300-¥5,000），是典型的数字原住民资产配置。" };
  if (total >= 1000) return { level: "C", title: "轻度持仓", color: "text-emerald-400", bg: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-500/30", desc: "你有一定的数字资产积累，但总量尚处于入门阶段。随着合规化进程推进，这些资产的法律保障将持续加强。" };
  return { level: "D", title: "数字新人", color: "text-slate-400", bg: "from-slate-500/20 to-gray-500/20", border: "border-slate-500/30", desc: "你的虚拟资产持仓较少，但别低估数字世界的财富积累速度——超过68%的年轻人持有某种形式的虚拟资产。" };
}

export default function AssetEvaluator() {
  const [gameValues, setGameValues] = useState<Record<string, number>>({});
  const [socialValues, setSocialValues] = useState<Record<string, number>>({});
  const [digitalValues, setDigitalValues] = useState<Record<string, number>>({});
  const [cyberWorth, setCyberWorth] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'games' | 'social' | 'digital'>('games');
  const reportRef = useRef<HTMLDivElement>(null);

  // 分类小计
  const [gameTotal, setGameTotal] = useState(0);
  const [socialTotal, setSocialTotal] = useState(0);
  const [digitalTotal, setDigitalTotal] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    setIsCalculating(true);
    const timer = setTimeout(() => {
      let gTotal = 0, sTotal = 0, dTotal = 0;

      GAMES.forEach(game => {
        const val = gameValues[game.id] || 0;
        if (!isNaN(val)) gTotal += val * game.rate;
      });
      SOCIALS.forEach(platform => {
        const val = socialValues[platform.id] || 0;
        if (!isNaN(val)) sTotal += val * platform.val;
      });
      DIGITAL_ASSETS.forEach(asset => {
        const val = digitalValues[asset.id] || 0;
        if (!isNaN(val)) dTotal += val;
      });

      setGameTotal(Math.floor(isNaN(gTotal) ? 0 : gTotal));
      setSocialTotal(Math.floor(isNaN(sTotal) ? 0 : sTotal));
      setDigitalTotal(Math.floor(isNaN(dTotal) ? 0 : dTotal));

      const total = gTotal + sTotal + dTotal;
      setCyberWorth(Math.floor(isNaN(total) ? 0 : total));
      setIsCalculating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [gameValues, socialValues, digitalValues, mounted]);

  if (!mounted) return null;

  const assetLevel = getAssetLevel(cyberWorth);

  const chartData = {
    labels: ["游戏资产", "社交流量", "数字资产"],
    datasets: [{
      data: [gameTotal || 1, socialTotal || 1, digitalTotal || 1],
      backgroundColor: [
        "rgba(14, 165, 233, 0.7)",
        "rgba(168, 85, 247, 0.7)",
        "rgba(16, 185, 129, 0.7)",
      ],
      borderWidth: 0,
    }],
  };

  const handleGenerateReport = () => {
    setShowReport(true);
    setTimeout(() => {
      reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const categories = [
    { key: 'games' as const, label: '🎮 游戏资产', count: Object.values(gameValues).filter(v => v > 0).length },
    { key: 'social' as const, label: '📱 社交流量', count: Object.values(socialValues).filter(v => v > 0).length },
    { key: 'digital' as const, label: '💎 数字资产', count: Object.values(digitalValues).filter(v => v > 0).length },
  ];

  return (
    <section id="evaluator" className="scroll-section py-24 bg-[#0a0a14] px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-500">
            赛博身价评估器
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            基于市场中位数实时计算。输入你在游戏、社交、数字藏品等各领域的投入，全面量化你在这个时代的真实资产权重。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Input Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Tabs */}
            <div className="flex gap-3 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all border ${
                    activeCategory === cat.key
                      ? 'bg-white/10 border-white/30 text-white'
                      : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                  {cat.count > 0 && (
                    <span className="ml-2 text-[10px] bg-sky-500/30 text-sky-400 px-2 py-0.5 rounded-full">
                      {cat.count}项
                    </span>
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* 游戏资产 */}
              {activeCategory === 'games' && (
                <motion.div
                  key="games"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl"
                >
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                    <span className="p-2 bg-sky-500/20 rounded-full text-sky-400">🎮</span>
                    游戏资产配置
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">输入各游戏的累计充值金额，系统将按市场二级流通折损率计算资产估值</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {GAMES.map((game) => (
                      <div key={game.id} className="group relative">
                        <label className="flex justify-between text-xs font-bold text-slate-500 mb-2 ml-1">
                          <span>{game.icon} {game.name}</span>
                          <span className="text-sky-500/50 font-mono">折损率 {(game.rate * 100).toFixed(0)}%</span>
                        </label>
                        <input
                          type="number"
                          placeholder="累计充值 ¥"
                          onChange={(e) => setGameValues({ ...gameValues, [game.id]: Number(e.target.value) })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all placeholder:opacity-20"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 社交流量 */}
              {activeCategory === 'social' && (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl"
                >
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                    <span className="p-2 bg-purple-500/20 rounded-full text-purple-400">📱</span>
                    社交流量资产
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">输入各平台粉丝数量，按MCN行业获客成本标准估算账号流量价值</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {SOCIALS.map((platform) => (
                      <div key={platform.id} className="group relative">
                        <label className="flex justify-between text-xs font-bold text-slate-500 mb-2 ml-1">
                          <span>{platform.icon} {platform.name}</span>
                          <span className="text-purple-500/50 font-mono">¥{platform.val}/粉丝</span>
                        </label>
                        <input
                          type="number"
                          placeholder="粉丝数量"
                          onChange={(e) => setSocialValues({ ...socialValues, [platform.id]: Number(e.target.value) })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all placeholder:opacity-20"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 数字资产 */}
              {activeCategory === 'digital' && (
                <motion.div
                  key="digital"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl"
                >
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                    <span className="p-2 bg-emerald-500/20 rounded-full text-emerald-400">💎</span>
                    数字资产配置
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">输入数字藏品、域名、店铺、版权等数字资产的估值（人民币）</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {DIGITAL_ASSETS.map((asset) => (
                      <div key={asset.id} className="group relative">
                        <label className="block text-xs font-bold text-slate-500 mb-1 ml-1">
                          {asset.icon} {asset.name}
                        </label>
                        <p className="text-[10px] text-slate-600 mb-2 ml-1">{asset.desc}</p>
                        <input
                          type="number"
                          placeholder={`估值 ${asset.unit}`}
                          onChange={(e) => setDigitalValues({ ...digitalValues, [asset.id]: Number(e.target.value) })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:opacity-20"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-sky-500/10 to-purple-500/10 border border-white/20 p-8 rounded-[3rem] backdrop-blur-2xl overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-500/20 blur-[80px] group-hover:bg-sky-500/30 transition-all"></div>
              
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 text-center">评估结果 / ESTIMATION</h3>
              
              {/* Level Badge */}
              <div className="text-center mb-6">
                <span className={`inline-block text-2xl font-black ${assetLevel.color} border ${assetLevel.border} px-4 py-1 rounded-full bg-gradient-to-r ${assetLevel.bg}`}>
                  {assetLevel.level} · {assetLevel.title}
                </span>
              </div>

              <div className="text-center mb-6">
                <span className="text-[10px] text-sky-400 border border-sky-400/30 px-3 py-1 rounded-full font-mono mb-4 inline-block">
                  CYBER_WORTH_V3.0
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cyberWorth}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`text-5xl font-black mt-3 ${isCalculating ? 'opacity-30 blur-sm' : ''} transition-all`}
                  >
                    ¥{cyberWorth.toLocaleString()}
                  </motion.div>
                </AnimatePresence>
                <div className="text-xs text-slate-500 mt-2 font-mono">
                  预计资产估值上限
                </div>
              </div>

              {/* Mini Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                  <span className="text-slate-500">🎮 游戏资产</span>
                  <span className="text-sky-400 font-mono">¥{gameTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                  <span className="text-slate-500">📱 社交流量</span>
                  <span className="text-purple-400 font-mono">¥{socialTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                  <span className="text-slate-500">💎 数字资产</span>
                  <span className="text-emerald-400 font-mono">¥{digitalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Mini Chart */}
              {cyberWorth > 0 && (
                <div className="h-[140px] mb-6">
                  <Doughnut
                    data={chartData}
                    options={{
                      responsive: true, maintainAspectRatio: false, cutout: '70%',
                      plugins: { legend: { display: false } },
                    }}
                  />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                  <span className="opacity-50">权重协议</span>
                  <span className="text-sky-400">MARKET_MEDIAN_42</span>
                </div>
                <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                  <span className="opacity-50">评估维度</span>
                  <span className="text-green-400">3类 / 20项</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed mt-4 italic">
                  *计算结果基于中国虚拟资产二级市场流动性中位数与 MCN 获客成本综合推算。仅供学术探讨与演示，不代表最终司法定损建议。
                </p>
              </div>

              <button
                onClick={handleGenerateReport}
                disabled={cyberWorth === 0}
                className={`w-full py-4 mt-6 font-bold rounded-2xl transition-all transform active:scale-95 ${
                  cyberWorth > 0
                    ? 'bg-white text-black hover:bg-sky-400 hover:text-white'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                {cyberWorth > 0 ? '生成资产报告 📊' : '请先输入资产数据'}
              </button>
            </div>
          </div>
        </div>

        {/* ========== 资产报告 ========== */}
        <AnimatePresence>
          {showReport && cyberWorth > 0 && (
            <motion.div
              ref={reportRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className="mt-16"
            >
              <div className={`bg-gradient-to-br ${assetLevel.bg} border ${assetLevel.border} rounded-[3rem] p-10 md:p-14 backdrop-blur-2xl relative overflow-hidden`}>
                {/* Decorative */}
                <div className="absolute top-0 right-0 text-[200px] font-black opacity-5 select-none leading-none">
                  {assetLevel.level}
                </div>

                {/* Report Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                  <div>
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
                      CYBER_ASSET_REPORT · {new Date().toLocaleDateString('zh-CN')}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white">
                      你的赛博资产报告
                    </h3>
                  </div>
                  <div className={`text-4xl font-black ${assetLevel.color} border ${assetLevel.border} px-6 py-3 rounded-2xl bg-black/20`}>
                    {assetLevel.level} · {assetLevel.title}
                  </div>
                </div>

                {/* Main Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                  <div className="bg-black/20 rounded-2xl p-6 text-center border border-white/10">
                    <div className="text-3xl font-black text-white">¥{cyberWorth.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 mt-1">资产总估值</div>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-6 text-center border border-white/10">
                    <div className="text-3xl font-black text-sky-400">¥{gameTotal.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 mt-1">游戏资产</div>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-6 text-center border border-white/10">
                    <div className="text-3xl font-black text-purple-400">¥{socialTotal.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 mt-1">社交流量</div>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-6 text-center border border-white/10">
                    <div className="text-3xl font-black text-emerald-400">¥{digitalTotal.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 mt-1">数字资产</div>
                  </div>
                </div>

                {/* Chart + Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                  {/* Pie Chart */}
                  <div className="bg-black/20 rounded-2xl p-8 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-6">资产结构分布</h4>
                    <div className="h-[220px]">
                      <Doughnut
                        data={chartData}
                        options={{
                          responsive: true, maintainAspectRatio: false, cutout: '60%',
                          plugins: {
                            legend: { position: 'bottom', labels: { color: '#fff', font: { size: 12 } } },
                          },
                        }}
                      />
                    </div>
                  </div>

                  {/* Detail Breakdown */}
                  <div className="bg-black/20 rounded-2xl p-8 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-6">资产明细</h4>
                    <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
                      {GAMES.filter(g => (gameValues[g.id] || 0) > 0).map(g => (
                        <div key={g.id} className="flex justify-between text-sm border-b border-white/5 pb-2">
                          <span className="text-slate-400">{g.icon} {g.name} (充值¥{(gameValues[g.id] || 0).toLocaleString()})</span>
                          <span className="text-sky-400 font-mono">≈ ¥{Math.floor((gameValues[g.id] || 0) * g.rate).toLocaleString()}</span>
                        </div>
                      ))}
                      {SOCIALS.filter(s => (socialValues[s.id] || 0) > 0).map(s => (
                        <div key={s.id} className="flex justify-between text-sm border-b border-white/5 pb-2">
                          <span className="text-slate-400">{s.icon} {s.name} ({(socialValues[s.id] || 0).toLocaleString()}粉丝)</span>
                          <span className="text-purple-400 font-mono">≈ ¥{Math.floor((socialValues[s.id] || 0) * s.val).toLocaleString()}</span>
                        </div>
                      ))}
                      {DIGITAL_ASSETS.filter(d => (digitalValues[d.id] || 0) > 0).map(d => (
                        <div key={d.id} className="flex justify-between text-sm border-b border-white/5 pb-2">
                          <span className="text-slate-400">{d.icon} {d.name}</span>
                          <span className="text-emerald-400 font-mono">¥{(digitalValues[d.id] || 0).toLocaleString()}</span>
                        </div>
                      ))}
                      {cyberWorth === 0 && (
                        <p className="text-slate-500 text-sm">暂无已填写的资产项目</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contextual Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-black/20 rounded-2xl p-6 border border-white/10">
                    <div className="text-lg mb-3">📊</div>
                    <h4 className="font-bold text-white mb-2">与全国对比</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {cyberWorth >= 5000
                        ? `你的虚拟资产(¥${cyberWorth.toLocaleString()})已超过Z世代人均持仓上限(¥5,000)${Math.floor(cyberWorth / 5000)}倍。根据艾媒咨询数据，你属于全国前${cyberWorth >= 20000 ? '5%' : '15%'}的高净值数字资产持有者。`
                        : `你的虚拟资产(¥${cyberWorth.toLocaleString()})处于Z世代人均持仓区间(¥2,300-¥5,000)的${cyberWorth >= 2300 ? '中位' : '下方'}。根据交易猫数据，高净值账号客单价约¥3,200。`
                      }
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-6 border border-white/10">
                    <div className="text-lg mb-3">⚖️</div>
                    <h4 className="font-bold text-white mb-2">法律保障状态</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      根据2026年最高法修订的《民事案由规定》，你的虚拟资产已被纳入&ldquo;网络虚拟财产纠纷&rdquo;一级案由保护范围。《民法典》第127条为你的数字资产提供了与房屋、车辆同等分量的法律武器。
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-6 border border-white/10">
                    <div className="text-lg mb-3">⚠️</div>
                    <h4 className="font-bold text-white mb-2">风险提示</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {gameTotal > socialTotal + digitalTotal
                        ? '你的资产高度集中于游戏领域，需关注平台停服风险。美国CFPB警告：厂商破产可能导致资产归零。建议分散配置并保留充值凭证。'
                        : socialTotal > gameTotal + digitalTotal
                        ? '社交流量资产占比较高，但账号价值受平台政策影响大。建议通过内容变现将流量转化为可控资产。'
                        : '你的资产配置较为均衡。继续关注"银发〔2026〕42号文"合规要求，确保资产在合规轨道上流转。'
                      }
                    </p>
                  </div>
                </div>

                {/* Level Description */}
                <div className={`bg-black/30 rounded-2xl p-8 border ${assetLevel.border}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`text-3xl font-black ${assetLevel.color}`}>{assetLevel.level}</span>
                    <div>
                      <h4 className={`font-bold text-lg ${assetLevel.color}`}>{assetLevel.title}</h4>
                      <p className="text-xs text-slate-500 font-mono">ASSET_CLASSIFICATION · 2026</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{assetLevel.desc}</p>
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] text-slate-600 mt-8 text-center italic leading-relaxed">
                  *本报告由「全景视界2026融合新闻实验室」基于公开市场数据模型生成，仅供学术研究与信息传播之用。
                  资产估值采用二级市场流通中位数与MCN行业获客成本综合推算，不构成投资建议或司法定损依据。
                  数据来源：交易猫、中国信通院、艾媒咨询、最高法《民事案由规定》(2026修订版)
                </p>

                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowReport(false)}
                    className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition active:scale-95"
                  >
                    收起报告
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
