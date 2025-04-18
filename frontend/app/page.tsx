"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiUpload, FiTarget, FiTrendingUp, FiBarChart2, FiUsers, FiMessageSquare } from "react-icons/fi";
import { isAuthenticated, getUserData } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setIsLoggedIn(authStatus);
      if (authStatus) {
        setUserData(getUserData());
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0 -top-16">
          <Image
            src="/landing-bg1.png"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-white mb-6">
                Your Money?{" "}
                <span className="text-[#07a6ec]">Understood.</span>
              </h1>
              <p className="text-xl text-white mb-8">
                An AI-powered personal finance platform that helps you track, save, and grow your money with goals, rewards, and challenges.
              </p>
              {!isLoggedIn && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-[#07a6ec] hover:bg-[#06a6ec] transition-colors"
                  >
                    Upload your bank statements, Get Instant Insights
                  </Link>
                </motion.div>
              )}
            </motion.div>

            {/* Right Column - Animation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[500px] w-full">
                {/* Finance Graphics */}
                <div className="absolute top-0 right-0 w-full h-full">
                  <Image
                    src=""
                    alt="Finance Dashboard - to be added"
                    width={600}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                </div>
                
                {/* Rumi AI Companion - Bottom Right Corner */}
                
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose AARTHIQ?</h2>
            <p className="mt-4 text-xl text-gray-600">Powerful features to transform your financial life</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Analysis Magic */}
            <motion.div 
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-[#07a6ec]/10 rounded-full flex items-center justify-center mb-4">
                <FiBarChart2 className="w-6 h-6 text-[#07a6ec]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analysis Magic</h3>
              <p className="text-gray-600">Analyze your spending like a pro with AI-powered insights</p>
            </motion.div>
            
            {/* Micro Goals */}
            <motion.div 
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-[#fa6724]/10 rounded-full flex items-center justify-center mb-4">
                <FiTarget className="w-6 h-6 text-[#fa6724]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Micro Goals</h3>
              <p className="text-gray-600">Win with weekly savings challenges that fit your lifestyle</p>
            </motion.div>
            
            {/* Financial XP */}
            <motion.div 
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-[#e30584]/10 rounded-full flex items-center justify-center mb-4">
                <FiTrendingUp className="w-6 h-6 text-[#e30584]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Financial XP</h3>
              <p className="text-gray-600">Earn points, unlock badges, and level up your financial game</p>
            </motion.div>
            
            {/* Smart Reports */}
            <motion.div 
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-[#07a6ec]/10 rounded-full flex items-center justify-center mb-4">
                <FiBarChart2 className="w-6 h-6 text-[#07a6ec]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Reports</h3>
              <p className="text-gray-600">Get flagged insights & behavior nudges to improve your habits</p>
            </motion.div>
            
            {/* Group Goals */}
            <motion.div 
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-[#fa6724]/10 rounded-full flex items-center justify-center mb-4">
                <FiUsers className="w-6 h-6 text-[#fa6724]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Group Goals</h3>
              <p className="text-gray-600">Save with friends, build your money tribe</p>
            </motion.div>
            
            {/* AI-Powered Advice */}
            <motion.div 
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-[#e30584]/10 rounded-full flex items-center justify-center mb-4">
                <FiMessageSquare className="w-6 h-6 text-[#e30584]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Advice</h3>
              <p className="text-gray-600">Personalized suggestions, always improving</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">Three simple steps to financial freedom</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-[#07a6ec]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiUpload className="w-8 h-8 text-[#07a6ec]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload your Bank statement</h3>
              <p className="text-gray-600">Securely connect your bank accounts or upload statements for instant analysis</p>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-[#fa6724]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiTarget className="w-8 h-8 text-[#fa6724]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Set Your Money Goals</h3>
              <p className="text-gray-600">Create monthly budgets, emotional savings goals, and financial milestones</p>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-[#e30584]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiTrendingUp className="w-8 h-8 text-[#e30584]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Track, Save & Win</h3>
              <p className="text-gray-600">Watch your progress, unlock achievements, and get personalized suggestions</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-xl text-gray-600">Real stories from real people</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <motion.div 
              className="bg-gray-50 p-8 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#07a6ec]/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#07a6ec] font-bold">A</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Ananya Sharma</h4>
                  <p className="text-gray-500 text-sm">Student, 24</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"This app actually made me WANT to save. The gamification elements and challenges keep me motivated!"</p>
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div 
              className="bg-gray-50 p-8 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#fa6724]/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#fa6724] font-bold">R</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Rahul Patel</h4>
                  <p className="text-gray-500 text-sm">Software Engineer, 28</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"Tracking my money doesn't feel boring anymore. The insights are incredibly helpful and Rumi's advice is spot on!"</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Newsletter */}
            <div className="col-span-1 md:col-span-2">
              <Image
                src="https://i.ibb.co/HDJWTL4Q/aarthiq-text-logo-removebg.png"
                alt="AARTHIQ Logo"
                width={150}
                height={40}
                className="h-8 w-auto mb-6"
              />
              <p className="text-gray-400 mb-4">Your AI-powered personal finance companion</p>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
                <div className="flex">
                  <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-md w-full text-gray-900" />
                  <button className="bg-[#07a6ec] px-4 py-2 rounded-r-md hover:bg-[#06a6ec] transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AARTHIQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
