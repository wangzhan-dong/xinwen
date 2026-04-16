"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PollOption {
  label: string;
  votes: number;
  color: string;
}

interface PollQuestion {
  id: string;
  question: string;
  options: PollOption[];
}

const POLLS: PollQuestion[] = [
  {
    id: "compensation",
    question: "如果一款运营了10年的游戏宣布停服，你认为玩家累计充值是否应获得补偿？",
    options: [
      { label: "应该全额退款", votes: 342, color: "bg-sky-500" },
      { label: "按比例补偿虚拟资产价值", votes: 528, color: "bg-purple-500" },
      { label: "给予其他游戏代金券", votes: 156, color: "bg-amber-500" },
      { label: "不需要补偿，自愿消费", votes: 89, color: "bg-slate-500" },
    ],
  },
  {
    id: "inheritance",
    question: "你支持将游戏账号、虚拟资产写入遗嘱进行法定继承吗？",
    options: [
      { label: "完全支持，这是合法财产", votes: 612, color: "bg-emerald-500" },
      { label: "支持，但需要法律完善", votes: 445, color: "bg-sky-500" },
      { label: "不太确定", votes: 118, color: "bg-amber-500" },
      { label: "反对，虚拟资产不应继承", votes: 52, color: "bg-red-500" },
    ],
  },
  {
    id: "worth",
    question: "你每年在虚拟资产（游戏、数字藏品、社交账号等）上的总投入约为？",
    options: [
      { label: "¥0 — 不花钱", votes: 185, color: "bg-slate-500" },
      { label: "¥1 - ¥500", votes: 420, color: "bg-sky-500" },
      { label: "¥500 - ¥3,000", votes: 380, color: "bg-purple-500" },
      { label: "¥3,000 - ¥10,000", votes: 210, color: "bg-amber-500" },
      { label: "¥10,000以上", votes: 95, color: "bg-rose-500" },
    ],
  },
];

function SinglePoll({ poll }: { poll: PollQuestion }) {
  const [voted, setVoted] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [options, setOptions] = useState(poll.options);

  const handleVote = (idx: number) => {
    if (voted) return;
    setSelectedIdx(idx);
    const newOpts = [...options];
    newOpts[idx] = { ...newOpts[idx], votes: newOpts[idx].votes + 1 };
    setOptions(newOpts);
    setVoted(true);
  };

  const totalVotes = options.reduce((s, o) => s + o.votes, 0);

  return (
    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
      <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
        {poll.question}
      </h3>

      <div className="space-y-3">
        {options.map((opt, idx) => {
          const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
          return (
            <button
              key={idx}
              onClick={() => handleVote(idx)}
              disabled={voted}
              className={`w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
                voted
                  ? selectedIdx === idx
                    ? "border-white/30 bg-white/10"
                    : "border-white/5 bg-white/[0.02]"
                  : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 cursor-pointer active:scale-[0.98]"
              }`}
            >
              {voted && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`absolute left-0 top-0 h-full ${opt.color} opacity-20 rounded-xl`}
                />
              )}
              <div className="relative z-10 flex justify-between items-center">
                <span className={`text-sm font-medium ${voted && selectedIdx === idx ? 'text-white' : 'text-slate-300'}`}>
                  {opt.label}
                </span>
                {voted && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-bold text-white/80 font-mono"
                  >
                    {pct}%
                  </motion.span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {voted && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-xs text-slate-500 text-center font-mono"
        >
          共 {totalVotes.toLocaleString()} 人参与投票
        </motion.div>
      )}
    </div>
  );
}

export default function LivePoll() {
  const [activePoll, setActivePoll] = useState(0);

  return (
    <section id="poll" className="scroll-section py-24 bg-[#0a0a18] px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-rose-400 font-mono text-sm tracking-widest uppercase mb-4 block"
          >
            Live Poll / 实时民调
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4 text-white"
          >
            你的<span className="text-rose-400">态度</span>是？
          </motion.h2>
          <p className="text-slate-400">
            参与投票，表达你对虚拟资产权益保护的立场
          </p>
        </div>

        {/* Poll Tabs */}
        <div className="flex gap-2 mb-8 justify-center flex-wrap">
          {POLLS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActivePoll(i)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activePoll === i
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-white/5 text-slate-500 border border-white/10 hover:bg-white/10'
              }`}
            >
              议题 {i + 1}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePoll}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <SinglePoll poll={POLLS[activePoll]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
