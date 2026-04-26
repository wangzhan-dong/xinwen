"use client";

import { motion } from "framer-motion";

export default function Assets() {
  return (
    <section id="assets" className="scroll-section py-24 bg-[#0a0a14] text-white relative z-10 w-full overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtNGwtMiAydi00bDItMnYtNGwyIDJWMjhsMi0ydi00bDItMlYxOGwyLTJ2LTRsMiAydi00aDRWMGgtNGwyLTJWMThsLTIgMnY0bC0yIDJ2NGwtMiAyeiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjAyIi8+PC9nPjwvc3ZnPg==')" }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16 content-box">
          <h2 className="text-2xl sm:text-4xl font-black mb-3 sm:mb-4">全球核心游戏资产的数据图谱</h2>
          <p className="text-slate-400 text-sm sm:text-base">从皮肤到成品账号，不同受众将海量时间和金钱锚定在头部现象级数字经济体中。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <motion.div className="dark-glass-card rounded-2xl p-6 game-card content-box">
            <div className="text-4xl mb-4">⚔️</div>
            <h4 className="text-xl font-bold mb-2 text-sky-400">王者荣耀</h4>
            <p className="text-xs text-slate-400 mb-4 h-16">单款限时皮肤曾创单日营收2200万美元的纪录，高粘性支撑深厚的沉淀资产。</p>
            <div className="flex justify-between items-center text-sm border-t border-slate-700 pt-4">
              <span className="text-slate-500">内购(2025)</span><span className="text-green-400 font-mono">{'>'}$13.9B</span>
            </div>
          </motion.div>
          <motion.div className="dark-glass-card rounded-2xl p-6 game-card content-box transition-delay-100">
            <div className="text-4xl mb-4">🔫</div>
            <h4 className="text-xl font-bold mb-2 text-amber-400">CS2</h4>
            <p className="text-xs text-slate-400 mb-4 h-16">极端稀缺带来金融属性。“淬火”系列皮肤如数字化黄金，顶级饰品价值过百万美金。</p>
            <div className="flex justify-between items-center text-sm border-t border-slate-700 pt-4">
              <span className="text-slate-500">单品最高</span><span className="text-green-400 font-mono">{'>'}$1,000k</span>
            </div>
          </motion.div>
          <motion.div className="dark-glass-card rounded-2xl p-6 game-card content-box transition-delay-200">
            <div className="text-4xl mb-4">🪖</div>
            <h4 className="text-xl font-bold mb-2 text-indigo-400">三角洲行动</h4>
            <p className="text-xs text-slate-400 mb-4 h-16">“搜集撤离”核心玩法催生出独特的安全箱经济学。高价值的曼德尔砖与机密文件形成类似硬通货的流转网络。</p>
            <div className="flex justify-between items-center text-sm border-t border-slate-700 pt-4">
              <span className="text-slate-500">高保值硬通货</span><span className="text-green-400 font-mono text-[10px]">机密文件/曼德尔砖</span>
            </div>
          </motion.div>
          <motion.div className="dark-glass-card rounded-2xl p-6 game-card content-box transition-delay-300">
            <div className="text-4xl mb-4">✨</div>
            <h4 className="text-xl font-bold mb-2 text-rose-400">原神 / 闲鱼生态</h4>
            <p className="text-xs text-slate-400 mb-4 h-16">极高情感估值。拥有绝版角色与高肝度的成品号，心智估值常高达数万美元。</p>
            <div className="flex justify-between items-center text-sm border-t border-slate-700 pt-4">
              <span className="text-slate-500">心理估值</span><span className="text-green-400 font-mono">Up to $50k</span>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 sm:mt-12 content-box dark-glass-card rounded-2xl border border-slate-700 p-4 sm:p-6 shadow-xl">
          <h4 className="text-base sm:text-lg font-bold mb-4 text-slate-200">硬核数字标的溢价逻辑透视 (以 CS2 饰品为例)</h4>
          <div className="text-xs text-slate-500 mb-2 sm:hidden">← 左右滑动查看更多 →</div>
          <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-left border-collapse text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-600 text-slate-400">
                <th className="py-3 px-4">数字标的</th>
                <th className="py-3 px-4">稀缺性条件</th>
                <th className="py-3 px-4">当前市值测算</th>
                <th className="py-3 px-4">为何产生溢价</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-800 hover:bg-slate-800/50">
                <td className="py-3 px-4 font-bold text-sky-400">淬火爪子刀 #387 (蓝顶)</td>
                <td className="py-3 px-4">崭新出厂</td>
                <td className="py-3 px-4 text-green-400 font-mono">$250万+</td>
                <td className="py-3 px-4 text-xs">约 1.31亿分之一 坠落概率，不可磨损不可再造</td>
              </tr>
              <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-all">
                <td className="py-3 px-4 font-bold text-sky-400">纪念品 AWP 巨龙传说</td>
                <td className="py-3 px-4">Major锦标赛限定</td>
                <td className="py-3 px-4 text-green-400 font-mono">$15万 – $45万</td>
                <td className="py-3 px-4 text-xs">承载真实电竞赛事记忆的历史唯一性</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </section>
  );
}
