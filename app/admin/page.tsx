"use client";
import { useState } from "react";

const stats = [
  { label: "Барлық оқушы", value: "1,248", icon: "👨‍🎓", color: "text-blue-400" },
  { label: "Белсенді курс", value: "3", icon: "📚", color: "text-yellow-400" },
  { label: "Бүгінгі төлем", value: "340 000 ₸", icon: "💰", color: "text-green-400" },
  { label: "Жаңа оқушы", value: "+24", icon: "📈", color: "text-purple-400" },
];

const users = [
  { name: "Аяша Нұрланова", email: "ayasha@mail.ru", course: "ҰБТ Толық", status: "Белсенді", date: "01.06.2025" },
  { name: "Дәурен Қалиев", email: "dauren@mail.ru", course: "Базалық", status: "Белсенді", date: "28.05.2025" },
  { name: "Жанар Ерланқызы", email: "zhanar@mail.ru", course: "Интенсив", status: "Белсенді", date: "25.05.2025" },
  { name: "Арман Бекұлы", email: "arman@mail.ru", course: "ҰБТ Толық", status: "Тоқтатылды", date: "20.05.2025" },
  { name: "Сәуле Нұрқызы", email: "saule@mail.ru", course: "Базалық", status: "Белсенді", date: "15.05.2025" },
];

const tabs = ["Дашборд", "Оқушылар", "Курстар", "Төлемдер", "Статистика"];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("Дашборд");

  return (
    <main className="min-h-screen bg-[#0A1628] text-white flex">

      {/* SIDEBAR */}
      <aside className="w-56 border-r border-white/10 p-5 flex flex-col gap-1 flex-shrink-0">
        <div className="text-lg font-black mb-2">⭐ MathPro</div>
        <div className="text-xs text-red-400 font-semibold mb-6 bg-red-500/10 px-2 py-1 rounded-lg">🔐 Админ панелі</div>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm transition text-left ${activeTab === tab ? "bg-yellow-500/10 text-yellow-400" : "text-gray-400 hover:bg-white/5"}`}
          >
            {tab === "Дашборд" && "📊"}
            {tab === "Оқушылар" && "👨‍🎓"}
            {tab === "Курстар" && "📚"}
            {tab === "Төлемдер" && "💳"}
            {tab === "Статистика" && "📈"}
            {tab}
          </button>
        ))}
        <div className="mt-auto text-xs text-gray-600 px-3">admin@mathpro.kz</div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 p-8 overflow-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black">{activeTab}</h1>
          <div className="flex gap-3">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-bold transition">
              + Курс қосу
            </button>
          </div>
        </div>

        {activeTab === "Дашборд" && (
          <>
            {/* STATS */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* RECENT PAYMENTS */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <h2 className="font-bold mb-4">Соңғы төлемдер</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-white/10">
                    <th className="text-left py-2">Оқушы</th>
                    <th className="text-left py-2">Курс</th>
                    <th className="text-left py-2">Сома</th>
                    <th className="text-left py-2">Күні</th>
                    <th className="text-left py-2">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Аяша Н.", course: "ҰБТ Толық", amount: "40 000 ₸", date: "01.06.2025", status: "Төленді" },
                    { name: "Дәурен Қ.", course: "Базалық", amount: "25 000 ₸", date: "01.06.2025", status: "Төленді" },
                    { name: "Жанар Е.", course: "Интенсив", amount: "75 000 ₸", date: "31.05.2025", status: "Төленді" },
                  ].map((p, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                      <td className="py-3">{p.name}</td>
                      <td className="py-3 text-gray-300">{p.course}</td>
                      <td className="py-3 text-green-400 font-semibold">{p.amount}</td>
                      <td className="py-3 text-gray-400">{p.date}</td>
                      <td className="py-3">
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "Оқушылар" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="🔍 Оқушы іздеу..."
                className="bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-2 rounded-xl outline-none focus:border-yellow-500 transition text-sm flex-1"
              />
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-xl text-sm font-bold">Сүзгі</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-white/10">
                  <th className="text-left py-2">Аты-жөні</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Курс</th>
                  <th className="text-left py-2">Күні</th>
                  <th className="text-left py-2">Статус</th>
                  <th className="text-left py-2">Әрекет</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                    <td className="py-3 font-semibold">{u.name}</td>
                    <td className="py-3 text-gray-400">{u.email}</td>
                    <td className="py-3 text-blue-300">{u.course}</td>
                    <td className="py-3 text-gray-400">{u.date}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${u.status === "Белсенді" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <button className="text-yellow-400 text-xs hover:underline mr-3">Өңдеу</button>
                      <button className="text-red-400 text-xs hover:underline">Өшіру</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "Курстар" && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: "Математика негіздері", students: 342, price: "25 000 ₸", status: "Белсенді" },
              { title: "ҰБТ Толық дайындық", students: 687, price: "40 000 ₸", status: "Белсенді" },
              { title: "ҰБТ Экспресс", students: 219, price: "75 000 ₸", status: "Белсенді" },
            ].map((c, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="font-bold mb-1">{c.title}</h3>
                <div className="text-gray-400 text-sm mb-3">{c.students} оқушы</div>
                <div className="text-yellow-400 font-black text-xl mb-4">{c.price}</div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg text-xs font-semibold transition">Өңдеу</button>
                  <button className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-lg text-xs font-semibold transition">Көру</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {(activeTab === "Төлемдер" || activeTab === "Статистика") && (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <div className="text-5xl mb-4">🚧</div>
              <div className="text-lg font-semibold">Жақында қосылады</div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}