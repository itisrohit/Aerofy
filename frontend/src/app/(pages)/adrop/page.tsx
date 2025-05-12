"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdropPage() {
  const [accentCells, setAccentCells] = useState<{x: number, y: number, color: string}[]>([]);
  
  // Generate random accent cells on component mount
  useEffect(() => {
    const colors = [
      "rgba(255, 206, 84, 0.25)", 
      "rgba(255, 177, 66, 0.2)",  
      "rgba(253, 230, 138, 0.25)",
    ];
    const cellCount = 12;
    const newAccentCells = [];
    
    for (let i = 0; i < cellCount; i++) {
      newAccentCells.push({
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setAccentCells(newAccentCells);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cellVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 50,
        damping: 10,
        duration: 0.5
      } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Modern Grid Background */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(200, 200, 200, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(200, 200, 200, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center'
        }}
      />
      
      {/* Accent colored cells with animation */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {accentCells.map((cell, index) => (
          <motion.div
            key={index}
            className="absolute rounded-md"
            variants={cellVariants}
            style={{
              width: '100px',
              height: '100px',
              left: `${cell.x * 50}px`,
              top: `${cell.y * 50}px`,
              backgroundColor: cell.color,
            }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          />
        ))}
      </motion.div>
      
     {/* Content with animation */}
     <motion.div 
        className="absolute inset-0 z-10 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="text-center px-6">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-4"
            variants={textVariants}
          >
            <span className="text-slate-800">A</span>
            <span className="text-yellow-500">Drop</span>
          </motion.h1>
          
          <motion.div 
            className="h-0.5 w-16 bg-yellow-400 mx-auto mb-4"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          ></motion.div>
          
          <motion.p 
            className="text-xl text-slate-600"
            variants={textVariants}
          >
            Coming soon
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}