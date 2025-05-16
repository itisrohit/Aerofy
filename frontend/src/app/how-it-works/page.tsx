"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  UserPlus, Upload, Share2, Download, Shield, 
  Clock, Lock, Key, Database, Unlock, RefreshCcw, Mail, CheckCircle,
  ChevronLeft
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const HowItWorksPage = () => {
  const router = useRouter();
  
  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-blue-200/30 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-purple-200/20 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-200/10 to-amber-200/10 rounded-full"></div>
      
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Sleeker back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-8 left-6 md:top-6 md:left-4 z-20"
        >
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all duration-300"
            aria-label="Go back"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-100 shadow-sm overflow-hidden group-hover:shadow-md group-hover:border-indigo-100 transition-all duration-300">
              <ChevronLeft className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 rounded-full transition-all duration-300"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-200/20 to-blue-200/20 transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 rounded-full blur-md transition-all duration-300"></span>
              <ChevronLeft className="absolute h-5 w-5 text-indigo-600 transform opacity-0 group-hover:opacity-100 z-10 transition-all duration-300" />
            </span>
            <span className="font-medium text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">Back</span>
          </button>
        </motion.div>
        
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-20"></div>
            <Image 
              src="/Logo.png" 
              alt="Aerofy Logo" 
              width={170} 
              height={60}
              className="relative mx-auto mb-8 hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700">
            <span className="relative inline-block">
              <span className="relative z-10">How It Works</span>
              <span className="absolute -bottom-2 left-0 right-0 h-4 bg-yellow-300/60 rounded-full -rotate-1"></span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Your friendly guide to Aerofy: where file sharing meets 
            <span className="px-2 py-1 text-indigo-600 bg-indigo-100 mx-1 rounded-md inline-block">simplicity</span> and 
            <span className="px-2 py-1 text-green-600 bg-green-100 mx-1 rounded-md inline-block">security</span> 
            in one intuitive experience.
          </p>
          
          {/* Quick navigation pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a href="#dive-in" className="px-4 py-2 bg-white text-slate-700 rounded-full shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 text-sm font-medium">
              The Experience
            </a>
            <a href="#why-aerofy" className="px-4 py-2 bg-white text-slate-700 rounded-full shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 text-sm font-medium">
              Why Aerofy
            </a>
            <a href="#behind-curtain" className="px-4 py-2 bg-white text-slate-700 rounded-full shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 text-sm font-medium">
              Technical Magic
            </a>
            <a href="#file-flow" className="px-4 py-2 bg-white text-slate-700 rounded-full shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 text-sm font-medium">
              Step by Step
            </a>
          </div>
        </motion.div>

        {/* Section 1: The Aerofy Experience */}
        <motion.section 
          id="dive-in"
          className="mb-24 bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-b from-indigo-100 to-transparent rounded-full opacity-70 -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-t from-amber-100 to-transparent rounded-full opacity-70 translate-y-1/2 -translate-x-1/4"></div>
          
          <div className="flex items-center mb-8 relative">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-12 w-12 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 mr-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Dive In: The Aerofy Experience</h2>
          </div>
          
          <p className="text-slate-600 mb-10 text-lg">Think of Aerofy as your trustworthy courier:</p>

          <motion.div 
            className="space-y-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Step 1 */}
            <motion.div 
              className="flex gap-6 group" 
              variants={fadeIn}
            >
              <div className="mt-1">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-2xl shadow-sm border border-blue-100 group-hover:shadow-md group-hover:border-blue-200 transition-all duration-300">
                  <UserPlus className="h-7 w-7 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-slate-900 mb-3 flex items-center gap-2">
                  Quick Sign-Up
                  <span className="inline-block px-2 py-1 bg-blue-100 text-xs font-medium text-blue-700 rounded-full">Fast</span>
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start bg-white p-3 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Fill in your name, email, and a secure password&mdash;no paperwork, no waiting rooms.</span>
                  </li>
                  <li className="flex items-start bg-white p-3 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Instantly get a secret keypair (digital lock &amp; key) created just for you.</span>
                  </li>
                  <li className="flex items-start bg-white p-3 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Receive a magical token that lets you breeze through our app without repeated logins.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="flex gap-6"
              variants={fadeIn}
            >
              <div className="mt-1">
                <div className="bg-amber-100 p-3 rounded-xl">
                  <Upload className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-slate-900 mb-2">Upload in a Flash</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>Drag your file&mdash;photo, document, video&mdash;right onto the upload area.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>Enter your recipient&apos;s email address. They&apos;ll be the only one who can open your package.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>Want extra safety? Add a one-time password lock and choose how long the link lasts.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="flex gap-6"
              variants={fadeIn}
            >
              <div className="mt-1">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Share2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-slate-900 mb-2">Effortless Sharing</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Hit <strong>Share</strong>. Behind the scenes, Aerofy wraps your file in an unbreakable digital envelope.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>You see a friendly confirmation: &quot;Your file is on its way!&quot;</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              className="flex gap-6"
              variants={fadeIn}
            >
              <div className="mt-1">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Download className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-slate-900 mb-2">Seamless Download</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Your friend gets an email with a magic link.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>They click, enter the password if you set one, and the file arrives onto their device&mdash;no sweat.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Step 5 */}
            <motion.div 
              className="flex gap-6"
              variants={fadeIn}
            >
              <div className="mt-1">
                <div className="bg-indigo-100 p-3 rounded-xl">
                  <Shield className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-slate-900 mb-2">Sleep Soundly</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>Once the link expires, Aerofy &quot;self-destructs&quot; that envelope. No more access, no more clutter.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Enhanced Section Divider */}
        <div className="relative my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-slate-50 px-6 py-1 rounded-full">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <span className="text-sm text-slate-500 font-medium">Next section</span>
          </div>
        </div>

        {/* Section 2: Why Aerofy Wins Hearts */}
        <motion.section 
          id="why-aerofy"
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-10 w-10 rounded-full flex items-center justify-center shadow-md mr-4">
              <span className="text-white font-medium">2</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Why Aerofy Wins Hearts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full p-6 border-slate-200 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Key className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Privacy Without Hassle</h3>
                    <p className="text-slate-600 text-sm">You never juggle keys or certificates—Aerofy does it all.</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full p-6 border-slate-200 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Lock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Lock &amp; Key, Simplified</h3>
                    <p className="text-slate-600 text-sm">Automatic strong encryption turns your files into unreadable codes.</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full p-6 border-slate-200 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">You Control Access</h3>
                    <p className="text-slate-600 text-sm">Per-share passwords, custom expiry times, and instant revocation if you change your mind.</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full p-6 border-slate-200 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <RefreshCcw className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Clean as You Go</h3>
                    <p className="text-slate-600 text-sm">Expired links vanish—no dusty archives or forgotten files.</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="md:col-span-2"
            >
              <Card className="h-full p-6 border-slate-200 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Works Everywhere</h3>
                    <p className="text-slate-600 text-sm">Desktop, tablet, or phone—if you&apos;ve got a browser, you&apos;re all set.</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Section Divider */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-slate-50 px-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center shadow-md">
                <span className="text-white font-medium text-lg">✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Peek Behind the Curtain */}
        <motion.section 
          id="behind-curtain"
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-10 w-10 rounded-full flex items-center justify-center shadow-md mr-4">
              <span className="text-white font-medium">3</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Peek Behind the Curtain</h2>
          </div>
          
          <p className="text-slate-600 mb-10">Even though it sounds fancy, the magic happens in three straightforward acts:</p>

          {/* Technical explanation with icons */}
          <div className="space-y-8 mt-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100"
            >
              <div className="flex items-center mb-3">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl shadow-md mr-4">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-xl text-slate-900">Locking (Encryption)</h3>
              </div>
              <ul className="space-y-2 text-slate-600 ml-14">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Aerofy generates a unique, super-strong lock (called AES-256) for your file.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>That lock itself gets double-locked using your recipient&apos;s public key (RSA-2048).</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100"
            >
              <div className="flex items-center mb-3">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl shadow-md mr-4">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-xl text-slate-900">Storing</h3>
              </div>
              <ul className="space-y-2 text-slate-600 ml-14">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>The sealed file and its locks safely rest in our encrypted vault (database + storage).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Nobody&mdash;<em>not even us</em>&mdash;can peek inside without the right keys.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100"
            >
              <div className="flex items-center mb-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl shadow-md mr-4">
                  <Unlock className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-xl text-slate-900">Unlocking (Decryption)</h3>
              </div>
              <ul className="space-y-2 text-slate-600 ml-14">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Only your recipient&apos;s private key (their secret digital key) can open the outer lock.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Then, the inner lock pops open, and the file streams straight to them.</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <p className="text-slate-600 mt-6">
            Every step happens on our server over HTTPS—think of it as sending a padlocked box via armored truck.
          </p>
        </motion.section>

        {/* Section Divider */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-slate-50 px-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center shadow-md">
                <span className="text-white font-medium text-lg">✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: File Sharing Flow */}
        <motion.section 
          id="file-flow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-10 w-10 rounded-full flex items-center justify-center shadow-md mr-4">
              <span className="text-white font-medium">4</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">File Sharing Flow: A Story in Seven Steps</h2>
          </div>
          
          <p className="text-slate-600 mb-10">Imagine you&apos;re sending a gift box with Aerofy. Here&apos;s the storyline:</p>

          {/* Timeline steps - modernized */}
          <div className="relative border-l-4 border-indigo-200 pl-10 ml-6 space-y-16">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className="absolute -left-[3.25rem] top-0 bg-gradient-to-r from-indigo-600 to-violet-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-xl text-slate-900 mb-3 flex items-center">
                  You&apos;re Ready to Share
                  <span className="ml-3 inline-block px-3 py-1 bg-indigo-100 text-xs font-medium text-indigo-700 rounded-full">Step 1</span>
                </h3>
                <p className="text-slate-600 text-lg">You log in and click <strong className="text-indigo-600 font-semibold">Upload</strong>—the adventure begins.</p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[3.25rem] top-0 bg-gradient-to-r from-indigo-600 to-violet-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-xl text-slate-900 mb-3 flex items-center">
                  Pick Your Present
                  <span className="ml-3 inline-block px-3 py-1 bg-indigo-100 text-xs font-medium text-indigo-700 rounded-full">Step 2</span>
                </h3>
                <p className="text-slate-600 text-lg">Drag in your file and address the gift to your recipient&apos;s email.</p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -left-[3.25rem] top-0 bg-gradient-to-r from-indigo-600 to-violet-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-xl text-slate-900 mb-3 flex items-center">
                  Add a Lock &amp; Timer
                  <span className="ml-3 inline-block px-3 py-1 bg-indigo-100 text-xs font-medium text-indigo-700 rounded-full">Step 3</span>
                </h3>
                <p className="text-slate-600 text-lg">Set a secret password and decide how long the box stays unopened.</p>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute -left-[3.25rem] top-0 bg-gradient-to-r from-indigo-600 to-violet-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <span className="text-white font-bold text-lg">4</span>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-xl text-slate-900 mb-3 flex items-center">
                  Send It Off
                  <span className="ml-3 inline-block px-3 py-1 bg-indigo-100 text-xs font-medium text-indigo-700 rounded-full">Step 4</span>
                </h3>
                <p className="text-slate-600 text-lg">Click <strong className="text-indigo-600 font-semibold">Share</strong>—Aerofy seals and ships your encrypted package.</p>
              </div>
            </motion.div>

            {/* Step 5 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -left-[3.25rem] top-0 bg-gradient-to-r from-indigo-600 to-violet-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <span className="text-white font-bold text-lg">5</span>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-xl text-slate-900 mb-3 flex items-center">
                  Gift Arrives
                  <span className="ml-3 inline-block px-3 py-1 bg-indigo-100 text-xs font-medium text-indigo-700 rounded-full">Step 5</span>
                </h3>
                <p className="text-slate-600 text-lg">Your buddy finds an email invitation and clicks the link.</p>
              </div>
            </motion.div>

            {/* Step 6 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative"
            >
              <div className="absolute -left-[3.25rem] top-0 bg-gradient-to-r from-indigo-600 to-violet-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <span className="text-white font-bold text-lg">6</span>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-xl text-slate-900 mb-3 flex items-center">
                  Unlock &amp; Enjoy
                  <span className="ml-3 inline-block px-3 py-1 bg-indigo-100 text-xs font-medium text-indigo-700 rounded-full">Step 6</span>
                </h3>
                <p className="text-slate-600 text-lg">They enter the password (if you set one) and unwrap the file instantly.</p>
              </div>
            </motion.div>

            {/* Step 7 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative"
            >
              <div className="absolute -left-[3.25rem] top-0 bg-gradient-to-r from-indigo-600 to-violet-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <span className="text-white font-bold text-lg">7</span>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-xl text-slate-900 mb-3 flex items-center">
                  Mission Accomplished
                  <span className="ml-3 inline-block px-3 py-1 bg-indigo-100 text-xs font-medium text-indigo-700 rounded-full">Step 7</span>
                </h3>
                <p className="text-slate-600 text-lg">After the timer hits zero, the box dissolves—no secret leftovers.</p>
              </div>
            </motion.div>

            {/* End marker */}
            <div className="absolute -left-[19px] bottom-0 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center shadow-md">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center text-slate-800 mt-16 font-medium"
          >
            And that&apos;s it! Seven simple moments from upload to cleanup, all happening in the blink of an eye.
          </motion.p>
          
          {/* New call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 flex justify-center"
          >
            <a href="/send" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Start Sharing Now
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.16699 10H15.8337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10.834 5L15.834 10L10.834 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </motion.section>
      </div>

      {/* New decorative elements */}
      <div className="absolute top-40 right-10 w-64 h-64 bg-purple-400/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-72 h-72 bg-blue-400/10 rounded-full filter blur-3xl"></div>
    </div>
  );
};

export default HowItWorksPage;