"use client";


export default function Psychology() {
  return (
    <section id="psychology" className="scroll-section py-24 px-6 max-w-7xl mx-auto border-b border-white/10 z-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="content-box">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-1.5 h-8 bg-sky-500 rounded-full"></div>
            <h2 className="text-3xl font-black text-white">身份信号论与精神依赖</h2>
          </div>
          <p className="text-slate-300 mb-6 leading-relaxed">
            在多人在线网络中，稀有皮肤是一种高频率、低成本的身份展示方式。在某些数字化深度的亚洲市场，<strong className="text-white">45%</strong> 的用户认为屏幕内的视觉身份同等甚至高于物理形象。这也是奢侈品牌纷纷与网游跨界合作的理论根源。
          </p>
          <div className="dark-glass-card p-6 rounded-2xl border-l-4 border-indigo-500 shadow-sm mt-4">
            <h4 className="font-bold text-indigo-400 mb-2">何为“精神代餐”？</h4>
            <p className="text-sm text-slate-400">
              当购房等重资产周期目标遇阻，潮玩、账号成为年轻人的“情感资产（Affective Asset）”。这些资产在传统负债表中无法体现，却在极高频率的市场流转（以玩养玩）中提供了真实的心灵慰藉。
            </p>
          </div>
        </div>

        <div className="content-box mt-10 lg:mt-0">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-1.5 h-8 bg-red-500 rounded-full"></div>
            <h2 className="text-3xl font-black text-white">系统脆弱性与监管风暴</h2>
          </div>
          <div className="space-y-4">
            <details className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden group">
              <summary className="font-bold p-5 cursor-pointer bg-white/5 hover:bg-white/10 transition flex justify-between items-center text-white">
                平台中心化的系统剥夺风险
                <span className="text-slate-400 group-open:rotate-180 transition transform">▼</span>
              </summary>
              <div className="p-5 text-sm text-slate-400 border-t border-white/5 leading-relaxed">
                美国 CFPB 警告：绝大多数数字资产被游戏公司的《用户协议》单方管控。如果遭遇停服破产或误封禁，动辄成千上万美金的心血因为缺乏传统法理银行账户机制而瞬间归零。这是投机转向实质所有权必过的深水区。
              </div>
            </details>
            <details className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden group">
              <summary className="font-bold p-5 cursor-pointer bg-white/5 hover:bg-white/10 transition flex justify-between items-center text-white">
                高度流通伴随的黑灰产洗钱
                <span className="text-slate-400 group-open:rotate-180 transition transform">▼</span>
              </summary>
              <div className="p-5 text-sm text-slate-400 border-t border-white/5 leading-relaxed">
                匿名交易使得 CS2 或部分暗网链游极易充当隐蔽资金出海管线。另一方面，包含在游戏底层的开箱赌博性质导致年轻人的金融承受阈值被畸形拉升。
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
