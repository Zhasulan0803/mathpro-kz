"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    setLoading(true);
    setError("");

    if (isLogin) {
      const res = await signIn("credentials", {
        email, password, redirect: false,
      });
      if (res?.error) setError("Email немесе пароль қате");
      else router.push("/dashboard");
    } else {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else {
        await signIn("credentials", { email, password, redirect: false });
        router.push("/dashboard");
      }
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#0A1628] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-2xl font-black mb-1">⭐ MathPro KZ</div>
          <p className="text-gray-400 text-sm">ҰБТ математика платформасы</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex bg-white/5 rounded-xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${isLogin ? "bg-yellow-500 text-black" : "text-gray-400"}`}
            >Кіру</button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${!isLogin ? "bg-yellow-500 text-black" : "text-gray-400"}`}
            >Тіркелу</button>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Аты-жөніңіз"
                value={name}
                onChange={e => setName(e.target.value)}
                className="bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 rounded-xl outline-none focus:border-yellow-500 transition w-full"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 rounded-xl outline-none focus:border-yellow-500 transition w-full"
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 rounded-xl outline-none focus:border-yellow-500 transition w-full"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black py-3 rounded-xl font-bold transition"
            >
              {loading ? "Жүктелуде..." : isLogin ? "Кіру →" : "Тіркелу →"}
            </button>
          </div>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-gray-500 text-xs">немесе</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-xl font-semibold text-sm transition"
          >
            🌐 Google арқылы кіру
          </button>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          <a href="/" className="text-yellow-400 hover:underline">← Басты бетке оралу</a>
        </p>
      </div>
    </main>
  );
} 