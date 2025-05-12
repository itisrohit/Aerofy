"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, FileX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Static dotted background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />
        
        {/* Static grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(200, 200, 200, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(200, 200, 200, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto relative">
            <motion.div 
              className="h-32 w-32 rounded-full bg-rose-100/80 backdrop-blur-sm flex items-center justify-center mx-auto mb-6"
              animate={{ 
                boxShadow: [
                  "0 0 0 rgba(244, 63, 94, 0.2)", 
                  "0 0 20px rgba(244, 63, 94, 0.4)", 
                  "0 0 0 rgba(244, 63, 94, 0.2)"
                ] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
              >
                <FileX className="h-16 w-16 text-rose-500" />
              </motion.div>
            </motion.div>
          </div>
          
          {/* Error text */}
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-muted-foreground mb-6">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              The page you are looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          {/* Go back button */}
          <div>
            <Button 
              asChild 
              className="px-6 py-6 text-base" 
              size="lg"
            >
              <Link href="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-5 w-5" /> 
                Go back
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}