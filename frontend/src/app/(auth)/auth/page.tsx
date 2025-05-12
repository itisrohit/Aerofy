"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, User, ArrowRight, Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Form validation states
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: Record<string, string> = {};
    if (!loginForm.email) newErrors.loginEmail = "Email is required";
    if (!loginForm.password) newErrors.loginPassword = "Password is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear errors
    setErrors({});
    
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Login submitted:", loginForm);
      // Here you would handle the actual login logic
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: Record<string, string> = {};
    if (!signupForm.name) newErrors.signupName = "Name is required";
    if (!signupForm.email) newErrors.signupEmail = "Email is required";
    if (!signupForm.password) newErrors.signupPassword = "Password is required";
    if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.signupConfirmPassword = "Passwords do not match";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear errors
    setErrors({});
    
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Signup submitted:", signupForm);
      // Here you would handle the actual signup logic
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-tr from-slate-50 to-slate-100">
      <div className="flex flex-col lg:flex-row w-full relative overflow-hidden">
        {/* Left branding panel - with improved color harmony */}
        <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center">
          {/* Main background with more sophisticated gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-indigo-800/95 to-indigo-900/90 rounded-none"></div>
          
          {/* Glass effect overlay */}
          <div className="absolute inset-0 backdrop-blur-[1px]"></div>
          
          {/* Edge blending gradient layer that extends into right panel */}
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-r from-transparent to-indigo-900/5"></div>
          <div className="absolute -right-16 h-full w-32 backdrop-blur-sm bg-gradient-to-r from-indigo-800/10 to-transparent"></div>
          
          {/* Fluid shapes with refined colors */}
          <div className="absolute -right-32 top-1/4 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"></div>
          <div className="absolute -right-20 bottom-1/4 w-40 h-40 rounded-full bg-sky-300/10 blur-2xl"></div>
          
          {/* Abstract shapes with reduced opacity and refined colors */}
          <div className="absolute inset-0">
            <div className="absolute top-0 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-soft-light filter blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full mix-blend-soft-light filter blur-3xl opacity-30"></div>
            <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-sky-400/10 rounded-full mix-blend-soft-light filter blur-3xl opacity-30"></div>
            
            {/* Animated floating shapes with enhanced visibility */}
            <motion.div 
              className="absolute right-[-20%] top-[30%] w-32 h-32 rounded-2xl bg-gradient-to-r from-blue-400/40 to-indigo-500/40 opacity-50 shadow-lg"
              animate={{ 
                y: [0, -25, 0], 
                rotate: [0, 8, 0],
                x: [0, 15, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 7,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute left-[60%] bottom-[20%] w-24 h-24 rounded-full bg-gradient-to-r from-sky-400/30 to-blue-500/30 opacity-60 shadow-lg"
              animate={{ 
                y: [0, 30, 0], 
                x: [0, 25, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 9,
                ease: "easeInOut" 
              }}
            />
            {/* New animated element that specifically moves across the boundary */}
            <motion.div 
              className="absolute right-[-10%] top-[60%] w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-violet-500/30 opacity-70 backdrop-blur-md"
              animate={{ 
                x: [-20, 120, -20], 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 15,
                ease: "easeInOut" 
              }}
            />
            {/* Another boundary-crossing element with glow effect */}
            <motion.div 
              className="absolute top-[15%] right-[-5%] w-24 h-24 rounded-md rotate-45 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 opacity-60 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              animate={{ 
                x: [0, 60, 0],
                y: [0, -30, 0],
                rotate: [45, 90, 45]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 11,
                ease: "easeInOut" 
              }}
            />
          </div>
          
          {/* Content with glass card that significantly breaks the boundary - enhanced */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div 
              className="relative text-white max-w-md backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20 shadow-xl mr-[-8rem]"
              animate={{
                x: [0, 10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
              whileHover={{
                x: 20,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image 
                  src="/Logo.png" 
                  alt="Aerofy Logo" 
                  width={180} 
                  height={60}
                  className="mb-8 drop-shadow-md"
                />
                
                <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
                  Secure file sharing made simple
                </h1>
                
                <p className="text-lg mb-8 text-blue-50/90">
                  Share files securely with password protection and expiration dates.
                  Get started with Aerofy today.
                </p>
              </motion.div>
              
              {/* Feature points with improved styling */}
              <ul className="space-y-4">
                {[
                  "Password protected files",
                  "Expiration dates for secure sharing",
                  "Email verification for recipient",
                  "Fast and reliable transfer"
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="bg-white/10 p-1.5 rounded-full shadow-lg">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
        
        {/* Right auth form panel - with subtle complementary coloring */}
        <div className="flex flex-col items-center justify-center p-6 lg:p-12 w-full lg:w-1/2 relative">
          {/* Subtle gradient that complements left panel */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100/90 z-0"></div>
          
          {/* Enhanced blur elements that blend from left panel */}
          <div className="absolute -left-32 top-1/3 w-64 h-64 rounded-full bg-blue-300/10 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 bottom-1/4 w-48 h-48 rounded-full bg-indigo-300/10 blur-3xl pointer-events-none"></div>
          
          {/* Animated element that shows up in right panel */}
          <motion.div
            className="absolute left-[5%] top-[20%] w-20 h-20 rounded-full bg-gradient-to-r from-indigo-300/10 to-blue-300/10 blur-xl pointer-events-none"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut"
            }}
          />
          
          <div className="w-full max-w-md z-10">
            {/* Back to home link - ADD THIS */}
            <div className="mb-6">
              <Link 
                href="/" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-2 h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                Back to home
              </Link>
            </div>
            
            {/* Mobile logo */}
            <div className="flex justify-center lg:hidden mb-8">
              <Image 
                src="/Logo.png" 
                alt="Aerofy Logo" 
                width={150} 
                height={50}
                className="h-auto"
              />
            </div>
            
            <Card className="w-full border-none shadow-lg backdrop-blur-sm bg-white/80">
              <CardHeader>
                {/* Auth tabs */}
                <div className="flex gap-4 mb-3">
                  <button
                    className={`pb-1 font-medium text-lg relative ${
                      activeTab === "login" ? "text-foreground" : "text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("login")}
                  >
                    Login
                    {activeTab === "login" && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeTab"
                      />
                    )}
                  </button>
                  <button
                    className={`pb-1 font-medium text-lg relative ${
                      activeTab === "signup" ? "text-foreground" : "text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign Up
                    {activeTab === "signup" && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeTab"
                      />
                    )}
                  </button>
                </div>
                
                <CardTitle className="text-xl font-semibold">
                  {activeTab === "login" ? "Welcome back" : "Create an account"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "login" 
                    ? "Enter your credentials to access your account" 
                    : "Fill out the form below to create your account"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <AnimatePresence mode="wait">
                  {activeTab === "login" ? (
                    <motion.div
                      key="login-form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input 
                              id="email"
                              type="email" 
                              placeholder="name@example.com" 
                              className={`pl-10 ${errors.loginEmail ? 'border-destructive ring-destructive/50' : ''}`}
                              value={loginForm.email}
                              onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                              disabled={isSubmitting}
                            />
                          </div>
                          {errors.loginEmail && (
                            <p className="text-sm text-destructive">{errors.loginEmail}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            {/* <Link 
                              href="#" 
                              className="text-xs text-primary hover:underline"
                            >
                              Forgot password?
                            </Link> */}
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input 
                              id="password"
                              type="password" 
                              placeholder="••••••••" 
                              className={`pl-10 ${errors.loginPassword ? 'border-destructive ring-destructive/50' : ''}`}
                              value={loginForm.password}
                              onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                              disabled={isSubmitting}
                            />
                          </div>
                          {errors.loginPassword && (
                            <p className="text-sm text-destructive">{errors.loginPassword}</p>
                          )}
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Logging in...
                            </>
                          ) : (
                            <>
                              Login
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="signup-form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={handleSignupSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input 
                              id="name"
                              placeholder="John Doe" 
                              className={`pl-10 ${errors.signupName ? 'border-destructive ring-destructive/50' : ''}`}
                              value={signupForm.name}
                              onChange={e => setSignupForm({...signupForm, name: e.target.value})}
                              disabled={isSubmitting}
                            />
                          </div>
                          {errors.signupName && (
                            <p className="text-sm text-destructive">{errors.signupName}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input 
                              id="signup-email"
                              type="email" 
                              placeholder="name@example.com" 
                              className={`pl-10 ${errors.signupEmail ? 'border-destructive ring-destructive/50' : ''}`}
                              value={signupForm.email}
                              onChange={e => setSignupForm({...signupForm, email: e.target.value})}
                              disabled={isSubmitting}
                            />
                          </div>
                          {errors.signupEmail && (
                            <p className="text-sm text-destructive">{errors.signupEmail}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input 
                              id="signup-password"
                              type="password" 
                              placeholder="••••••••" 
                              className={`pl-10 ${errors.signupPassword ? 'border-destructive ring-destructive/50' : ''}`}
                              value={signupForm.password}
                              onChange={e => setSignupForm({...signupForm, password: e.target.value})}
                              disabled={isSubmitting}
                            />
                          </div>
                          {errors.signupPassword && (
                            <p className="text-sm text-destructive">{errors.signupPassword}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input 
                              id="confirm-password"
                              type="password" 
                              placeholder="••••••••" 
                              className={`pl-10 ${errors.signupConfirmPassword ? 'border-destructive ring-destructive/50' : ''}`}
                              value={signupForm.confirmPassword}
                              onChange={e => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                              disabled={isSubmitting}
                            />
                          </div>
                          {errors.signupConfirmPassword && (
                            <p className="text-sm text-destructive">{errors.signupConfirmPassword}</p>
                          )}
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating account...
                            </>
                          ) : (
                            <>
                              Create Account
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="mt-6 text-center text-sm">
                  {activeTab === "login" ? (
                    <p className="text-muted-foreground">
                      Don&apos;t have an account?{" "}
                      <button 
                        className="text-primary hover:underline font-medium"
                        onClick={() => setActiveTab("signup")}
                      >
                        Sign up
                      </button>
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      Already have an account?{" "}
                      <button 
                        className="text-primary hover:underline font-medium"
                        onClick={() => setActiveTab("login")}
                      >
                        Login
                      </button>
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}