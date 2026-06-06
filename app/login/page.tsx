"use client";
import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-[#0A1628] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="text-2xl font-black mb-1">⭐ MathPro KZ</div>
          <p className="text-gray-400 text-sm">ҰБТ математика платформасы</p>
        </div>

        {/* CARD */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          
          {/* TABS */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${isLogin ? "bg-yellow-500 text-black" : "text-gray-400"}`}
            >
              Кіру
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${!isLogin ? "bg-yellow-500 text-black" : "text-gray-400"}`}
            >
              Тіркелу
            </button>
          </div>

          {/* FORM */}
          <div className="flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Аты-жөніңіз"
                className="bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 rounded-xl outline-none focus:border-yellow-500 transition w-full"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 rounded-xl outline-none focus:border-yellow-500 transition w-full"
            />
            <input
              type="password"
              placeholder="Пароль"
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 rounded-xl outline-none focus:border-yellow-500 transition w-full"
            />
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-xl font-bold transition">
              {isLogin ? "Кіру →" : "Тіркелу →"}
            </button>
          </div>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-gray-500 text-xs">немесе</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* GOOGLE */}
          <button className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-xl font-semibold text-sm transition">
            <span>🌐</span> Google арқылы кіру
          </button>

        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          Басты бетке оралу → <a href="/" className="text-yellow-400 hover:underline">mathpro.kz</a>
        </p>

      </div>
    </main>
  );
}