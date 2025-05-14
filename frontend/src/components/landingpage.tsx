"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, Clock } from "lucide-react";

// Airplane component
const Airplane = ({ 
  initialX, 
  initialY, 
  delay, 
  duration, 
  scale, 
  rotate 
}: { 
  initialX: number,
  initialY: number,
  delay: number,
  duration: number,
  scale: number,
  rotate: number
}) => {
  // Determine if the plane is flying from left to right
  const isLeftToRight = initialX < 0;
  
  return (
    <motion.div
      className="absolute"
      initial={{ x: initialX, y: initialY, rotate: rotate }}
      animate={{
        x: isLeftToRight ? "120vw" : "-20vw",
        y: [initialY, initialY - 30, initialY + 50, initialY], 
        rotate: [rotate - 5, rotate + 5, rotate - 3, rotate + 2], 
      }}
      transition={{
        x: { duration: duration, delay: delay, ease: "easeInOut" },
        y: { duration: duration * 0.8, delay: delay, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
        rotate: { duration: 4, delay: delay, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
      }}
      style={{ scale }}
    >
      {/* Paper airplane SVG - adjusted orientation */}
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
        style={{ transform: isLeftToRight ? 'none' : 'scaleX(-1)' }}
      >
        <path 
          d="M21.9926 2.01209C21.9926 1.94712 21.9926 1.88214 21.9601 1.81717C21.9276 1.7522 21.8951 1.68722 21.8626 1.62225C21.8301 1.55728 21.7976 1.4923 21.7326 1.45982C21.6676 1.39485 21.6026 1.36237 21.5376 1.32989C21.4727 1.29741 21.4077 1.29741 21.3427 1.26493C21.2777 1.26493 21.2127 1.23244 21.1477 1.23244C21.0827 1.23244 21.0177 1.23244 20.9528 1.23244C20.8878 1.23244 20.8228 1.23244 20.7578 1.26493C20.6928 1.29741 20.6278 1.32989 20.5628 1.36237C20.4979 1.39485 20.4329 1.42734 20.4004 1.4923L1.33669 12.2418C1.17174 12.3393 1.07428 12.5017 1.04178 12.6966C1.0418 12.8916 1.10677 13.0865 1.27172 13.184C1.30422 13.2164 1.3692 13.2489 1.40168 13.2814L7.36726 16.5534L12.3674 23.6364C12.4648 23.7663 12.6273 23.8638 12.7922 23.8962C12.8247 23.8962 12.8572 23.8962 12.8897 23.8962C13.0221 23.8962 13.1871 23.8638 13.3195 23.7663C13.387 23.7339 13.4195 23.7014 13.4845 23.6364L22.3076 2.85667C22.3401 2.79169 22.3726 2.75921 22.3726 2.69424C22.3726 2.62926 22.3726 2.56429 22.3401 2.49932C22.2751 2.30189 22.1451 2.14444 21.9926 2.01209ZM12.8897 21.6866L8.76652 15.8711L17.834 8.27433L12.8897 21.6866ZM19.2007 4.28638L8.15926 13.5738L3.06139 10.7492L19.2007 4.28638Z" 
          fill="#F4C430" 
          stroke="#E9B824" 
          strokeWidth="0.5" 
        />
      </svg>
    </motion.div>
  );
};

export const LandingPage = () => {
  const [airplanes, setAirplanes] = useState<Array<any>>([]);

  useEffect(() => {
    // Generate random airplanes
    const planes = [];
    const planeCount = window.innerWidth < 768 ? 6 : 12;
    
    for (let i = 0; i < planeCount; i++) {
      const startFromLeft = Math.random() > 0.5;
      planes.push({
        id: i,
        initialX: startFromLeft ? -100 : window.innerWidth + 100,
        initialY: Math.random() * window.innerHeight * 0.7,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 20,
        scale: 0.5 + Math.random() * 0.5,
        rotate: startFromLeft ? Math.random() * 10 - 5 : Math.random() * 10 + 175 // Corrected angles
      });
    }
    
    setAirplanes(planes);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Enhanced background with subtle patterns and gradient */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 10%, rgba(120, 119, 198, 0.3), transparent 400px),
              radial-gradient(circle at 80% 30%, rgba(249, 115, 22, 0.2), transparent 400px)
            `,
          }}
        />
        <div 
          className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(148, 163, 184, 0.7) 0.8px, transparent 0.8px)
            `,
            backgroundSize: '28px 28px',
          }}
        />
      </div>
      
      {/* Flying paper airplanes */}
      {airplanes.map(plane => (
        <Airplane
          key={plane.id}
          initialX={plane.initialX}
          initialY={plane.initialY}
          delay={plane.delay}
          duration={plane.duration}
          scale={plane.scale}
          rotate={plane.rotate}
        />
      ))}
      
      {/* Hero section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-16">
        <div className="w-full max-w-6xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-16"
          >
            <Image 
              src="/Logo.png" 
              alt="Aerofy Logo" 
              width={200} 
              height={66}
              className="mx-auto"
              priority
            />
          </motion.div>
          
          {/* Hero text */}
          <div className="text-center mb-20">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-slate-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="relative inline-block">
                <span className="relative z-10">Secure File Sharing</span>
                <span className="absolute -bottom-1.5 left-0 right-0 h-3 bg-yellow-200/60 rounded-full -rotate-1"></span>
              </span>{" "}
              <span className="block md:inline mt-2 md:mt-0">Made Simple</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Share files securely with password protection, expiration dates,
              and instant delivery to anyone, anywhere.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 justify-center mb-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="text-base font-medium px-8 py-7 bg-slate-900 hover:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/auth" className="flex items-center gap-2">
                  Get Started 
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="text-base font-medium px-8 py-7 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-white/50 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Link href="#how-it-works">
                  Learn More
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Features */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            {/* Password Protected Card */}
            <motion.div 
              className="relative group"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-20 blur-md group-hover:opacity-30 transition-all duration-300"></div>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-xl relative h-full flex flex-col">
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl w-14 h-14 flex items-center justify-center shadow-lg shadow-blue-200/40">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-slate-900">Password Protected</h3>
                <p className="text-slate-600 text-base">
                  Secure your files with password protection to ensure only the right people can access them.
                </p>
              </div>
            </motion.div>
            
            {/* Expiration Dates Card */}
            <motion.div 
              className="relative group"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-20 blur-md group-hover:opacity-30 transition-all duration-300"></div>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-xl relative h-full flex flex-col">
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-4 rounded-xl w-14 h-14 flex items-center justify-center shadow-lg shadow-amber-200/40">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-slate-900">Expiration Dates</h3>
                <p className="text-slate-600 text-base">
                  Set automatic expiration dates to control how long your shared files remain accessible.
                </p>
              </div>
            </motion.div>
            
            {/* Always Secure Card */}
            <motion.div 
              className="relative group"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl opacity-20 blur-md group-hover:opacity-30 transition-all duration-300"></div>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-xl relative h-full flex flex-col">
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-4 rounded-xl w-14 h-14 flex items-center justify-center shadow-lg shadow-emerald-200/40">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-slate-900">Always Secure</h3>
                <p className="text-slate-600 text-base">
                  End-to-end encryption ensures your files are protected during transfer and storage.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;