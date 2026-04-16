"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUIZ_DATA = [
  {
    q: "根据最高法2026年修订，\"网络虚拟财产纠纷\"被列为什么级别的案由？",
    options: ["三级案由", "二级案由", "一级案由", "暂未列入"],
    answer: 2,
    explain: "2026年1月1日起，最高法《民事案由规定》修订版将\"网络虚拟财产纠纷\"正式列为独立的一级案由，与房屋、车辆等财产纠纷同等地位。"
  },
  {
    q: "中国信通院2026年测算的虚拟资产市场规模约为多少？",
    options: ["约1200亿元", "约3600亿元", "约7200亿元", "约1.2万亿元"],
    answer: 2,
    explain: "中国信通院（CAICT）2026年测算，我国虚拟资产市场规模约7200亿元，合规资产增速超过60%。"
  },
  {
    q: "CS2中\"淬火爪子刀\"的坠落概率约为多少分之一？",
    options: ["约100万分之一", "约1000万分之一", "约1.31亿分之一", "约10亿分之一"],
    answer: 2,
    explain: "淬火爪子刀 #387（蓝顶/崭新出厂）的坠落概率约为1.31亿分之一，其不可磨损、不可再造的特性使估值超250万美元。"
  },
  {
    q: "根据交易猫数据，2024-2026年游戏高净值账号的客单价约为？",
    options: ["¥800", "¥1,600", "¥3,200", "¥6,400"],
    answer: 2,
    explain: "交易猫2024-2026年度数据显示，游戏高净值账号客单价约¥3,200，反映出玩家对核心资产投入的持续攀升。"
  },
  {
    q: "根据艾媒咨询调查，Z世代（18-24岁）人均虚拟资产持仓水位在什么区间？",
    options: ["¥500-¥1,000", "¥1,000-¥2,000", "¥2,300-¥5,000", "¥8,000-¥15,000"],
    answer: 2,
    explain: "艾媒咨询2024-2025调查显示，Z世代已将虚拟资产视为个人净值核心，人均持仓水位在¥2,300至¥5,000之间。"
  },
  {
    q: "\"银发〔2026〕42号文\"的核心作用是什么？",
    options: ["鼓励虚拟资产投机", "为虚拟资产划定合规红线", "取消虚拟资产交易", "仅适用于加密货币"],
    answer: 1,
    explain: "\"银发〔2026〕42号文\"为虚拟资产划定了清晰的合规红线，将\"无序炒作\"与\"合法确权\"彻底剥离，本质上是为新财富安装安全阀。"
  },
];

export default function InteractiveQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplain, setShowExplain] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplain(true);
    if (idx === QUIZ_DATA[currentQ].answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < QUIZ_DATA.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setShowExplain(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowExplain(false);
    setScore(0);
    setFinished(false);
  };

  const q = QUIZ_DATA[currentQ];
  const progress = ((currentQ + (selected !== null ? 1 : 0)) / QUIZ_DATA.length) * 100;

  return (
    <section id="quiz" className="scroll-section py-24 bg-[#08081a] px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-4 block"
          >
            Interactive Quiz / 知识挑战
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4 text-white"
          >
            你对<span className="text-emerald-400">虚拟资产</span>了解多少？
          </motion.h2>
          <p className="text-slate-400">测试你对本报道核心数据和政策的掌握程度</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full mb-10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-mono text-slate-500">
                  问题 {currentQ + 1} / {QUIZ_DATA.length}
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  得分: {score}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed">
                {q.q}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {q.options.map((opt, idx) => {
                  let borderClass = "border-white/10 hover:border-white/30";
                  let bgClass = "bg-white/5 hover:bg-white/10";

                  if (selected !== null) {
                    if (idx === q.answer) {
                      borderClass = "border-emerald-500";
                      bgClass = "bg-emerald-500/20";
                    } else if (idx === selected && idx !== q.answer) {
                      borderClass = "border-red-500";
                      bgClass = "bg-red-500/20";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={selected !== null}
                      className={`p-5 rounded-2xl border ${borderClass} ${bgClass} text-left transition-all text-white font-medium ${selected === null ? 'cursor-pointer active:scale-95' : 'cursor-default'}`}
                    >
                      <span className="text-xs text-slate-500 font-mono mr-2">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {showExplain && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className={`p-6 rounded-2xl border ${selected === q.answer ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">{selected === q.answer ? '✅' : '❌'}</span>
                      <span className={`text-sm font-bold ${selected === q.answer ? 'text-emerald-400' : 'text-red-400'}`}>
                        {selected === q.answer ? '回答正确！' : '回答错误'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{q.explain}</p>
                  </div>
                </motion.div>
              )}

              {selected !== null && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-bold rounded-2xl hover:opacity-90 transition active:scale-95"
                >
                  {currentQ < QUIZ_DATA.length - 1 ? '下一题 →' : '查看结果'}
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-emerald-500/10 to-sky-500/10 border border-white/20 rounded-[3rem] p-12 text-center backdrop-blur-xl"
            >
              <div className="text-7xl mb-6">
                {score >= 5 ? '🏆' : score >= 3 ? '🎯' : '📚'}
              </div>
              <h3 className="text-3xl font-black text-white mb-4">
                {score >= 5 ? '虚拟资产专家！' : score >= 3 ? '了解不少！' : '继续学习！'}
              </h3>
              <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400 mb-4">
                {score} / {QUIZ_DATA.length}
              </div>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                {score >= 5
                  ? '你对虚拟资产的法律政策和市场数据有着深入的了解！'
                  : score >= 3
                  ? '你有一定的认知基础，继续浏览报告了解更多细节。'
                  : '建议仔细阅读我们的深度报告，那些关键数据值得关注。'}
              </p>
              <div className="flex gap-4 justify-center">
                <button onClick={handleRestart} className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition active:scale-95">
                  重新挑战
                </button>
                <a href="#deepdive" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-2xl font-bold hover:opacity-90 transition">
                  查看数据报告
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
