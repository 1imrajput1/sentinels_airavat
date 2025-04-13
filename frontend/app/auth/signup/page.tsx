"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [lowBalanceThreshold, setLowBalanceThreshold] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
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

  const roleOptions = [
    {
      id: 'student',
      label: 'Student',
      emoji: '🎓',
      description: 'Manage your finances while studying',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      id: 'professional',
      label: 'Working Professional',
      emoji: '💼',
      description: 'Track and optimize your career finances',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      id: 'elderly',
      label: 'Elderly',
      emoji: '👴',
      description: 'Manage retirement and healthcare expenses',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#07a6ec] to-[#fa6724] p-4">
      <div className="flex gap-8 w-full max-w-7xl">
        {/* Left side - Signup Form */}
        <div className="w-1/2 bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex justify-center mb-6">
            <Image
              src="https://i.ibb.co/WWcGPnM7/aarthiq-text-logo-removebg.png"
              alt="AARTHIQ Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Create Account</h2>
          <p className="text-center text-gray-600 mb-8">Join AARTHIQ to start your financial journey</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07a6ec] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07a6ec] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07a6ec] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="monthlyIncome" className="block font-semibold text-gray-700 mb-2">
                  Monthly Income
                </label>
                <input
                  type="number"
                  id="monthlyIncome"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07a6ec] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="lowBalanceThreshold" className="block font-semibold text-gray-700 mb-2">
                  Low Balance Threshold
                </label>
                <input
                  type="number"
                  id="lowBalanceThreshold"
                  value={lowBalanceThreshold}
                  onChange={(e) => setLowBalanceThreshold(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#07a6ec] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#07a6ec] to-[#fa6724] text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Create Account
            </button>
            <div className="text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#fa6724] font-semibold hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>

        {/* Right side - Role Selection */}
        <div className="w-1/2 bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Role</h2>
          <p className="text-gray-600 mb-8">Select the role that best describes you to get personalized financial insights</p>
          
          <div className="space-y-4">
            {roleOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedRole(option.id)}
                className={`w-full flex items-center p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedRole === option.id
                    ? 'border-[#07a6ec] bg-gradient-to-r from-[#07a6ec]/10 to-[#fa6724]/10 shadow-lg transform scale-[1.02]'
                    : 'border-gray-200 hover:border-[#07a6ec] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-4xl mr-4">{option.emoji}</span>
                  <div className="text-left">
                    <div className="font-semibold text-xl text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 