"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/users/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("userData", JSON.stringify({
            user_id: data.user_id,
            username: data.username,
            monthly_income: data.monthly_income,
            level: data.level
          }));
          router.push("/dashboard");
        } else {
          setError(data.message || "Login failed");
        }
      } else {
        const error = await response.json();
        setError(error.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#07a6ec] to-[#fa6724]">
      <div className="bg-white rounded-xl shadow-lg p-8 w-[360px]">
        <h2 className="text-2xl font-bold text-center text-[#07a6ec] mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07a6ec]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07a6ec]"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-[#07a6ec] to-[#fa6724] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Login
          </button>
          <div className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-[#fa6724] font-semibold hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 