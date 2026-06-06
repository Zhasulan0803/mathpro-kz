"use client";
import { useState } from "react";

const questions = [
  {
    question: "2x + 5 = 13 теңдеуін шешіңіз",
    options: ["x = 3", "x = 4", "x = 5", "x = 6"],
    correct: 1,
  },
  {
    question: "√144 = ?",
    options: ["11", "12", "13", "14"],
    correct: 1,
  },
  {
    question: "Үшбұрыштың бұрыштары қосындысы неге тең?",
    options: ["90°", "180°", "270°", "360°"],
    correct: 1,
  },
  {
    question: "log₁₀(1000) = ?",
    options: ["2", "3", "4", "5"],
    correct: 1,
  },
  {
    question: "sin(90°) = ?",
    options: ["0", "0.5", "1", "-1"],
    correct: 2,
  },
];

export default function TestPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  function handleAnswer(i: number) {
    if (selected !== null) return;
    setSelected(i);
  }

  function handleNext() {
    const newAnswers = [...answers, selected ?? -1];
    if (current + 1 >= questions.length) {
      setAnswers(newAnswers);
      setFinished(true);
    } else {
      setAnswers(newAnswers);
      setCurrent(current + 1);
      setSelected(null);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
  }

  const score = answers.filter((a, i) => a === questions[i].correct).length;

  if (finished) {
    return (
      <main className="min-h-screen bg-[#0A1628] text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">{score >= 4 ? "🏆" : score >= 2 ? "👍" : "📚"}</div>
          <h1 className="text-4xl font-black mb-2">Нәтиже</h1>
          <div className="text-6xl font-black text-yellow-400 my-6">{score}/{questions.length}</div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 text-left">
            {questions.map((q, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${answers[i] === q.correct ? "bg-green-500" : "bg-red-500"}`}>
                  {answers[i] === q.correct ? "✓" : "✗"}
                </div>
                <div>
                  <div className="text-sm font-semibold">{q.question}</div>
                  {answers[i] !== q.correct && (
                    <div className="text-xs text-green-400 mt-1">Дұрыс жауап: {q.options[q.correct]}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button onClick={restart} className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold transition">
            Қайта тапсыру →
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A1628] text-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-400">Сұрақ {current + 1} / {questions.length}</div>
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <div key={i} className={`w-8 h-1.5 rounded-full transition ${i < current ? "bg-yellow-500" : i === current ? "bg-yellow-400" : "bg-white/10"}`}></div>
            ))}
          </div>
        </div>

        {/* QUESTION */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-4">
          <div className="text-yellow-400 text-xs font-semibold mb-3">ҰБТ ФОРМАТЫ</div>
          <h2 className="text-xl font-bold mb-6">{q.question}</h2>

          <div className="flex flex-col gap-3">
            {q.options.map((opt, i) => {
              let style = "bg-white/5 border border-white/10 hover:border-yellow-500/50";
              if (selected !== null) {
                if (i === q.correct) style = "bg-green-500/20 border border-green-500";
                else if (i === selected) style = "bg-red-500/20 border border-red-500";
                else style = "bg-white/5 border border-white/5 opacity-50";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`${style} text-left px-5 py-3 rounded-xl transition text-sm font-medium`}
                >
                  <span className="text-yellow-400 font-bold mr-3">{["A", "B", "C", "D"][i]}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selected === null}
          className="w-full bg-yellow-500 disabled:opacity-30 hover:bg-yellow-400 text-black py-3 rounded-xl font-bold transition"
        >
          {current + 1 === questions.length ? "Аяқтау →" : "Келесі сұрақ →"}
        </button>

      </div>
    </main>
  );
}