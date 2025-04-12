"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [lowBalanceThreshold, setLowBalanceThreshold] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          monthly_income: parseFloat(monthlyIncome),
          notify_low_balance_threshold: parseFloat(lowBalanceThreshold),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          router.push("/auth/login");
        } else {
          setError(data.message || "Registration failed");
        }
      } else {
        const error = await response.json();
        setError(error.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#07a6ec] to-[#fa6724]">
      <div className="bg-white rounded-xl shadow-lg p-8 w-[360px]">
        <h2 className="text-2xl font-bold text-center text-[#07a6ec] mb-6">Sign Up</h2>
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
            <label htmlFor="email" className="block font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="mb-4">
            <label htmlFor="monthlyIncome" className="block font-semibold mb-2">
              Monthly Income
            </label>
            <input
              type="number"
              id="monthlyIncome"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07a6ec]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lowBalanceThreshold" className="block font-semibold mb-2">
              Low Balance Threshold
            </label>
            <input
              type="number"
              id="lowBalanceThreshold"
              value={lowBalanceThreshold}
              onChange={(e) => setLowBalanceThreshold(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07a6ec]"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-[#07a6ec] to-[#fa6724] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Create Account
          </button>
          <div className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#fa6724] font-semibold hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 