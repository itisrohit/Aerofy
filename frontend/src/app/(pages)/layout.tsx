"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layouts/main-layout";
import { useAuth } from "@/hooks/useAuth";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, verifyAuth } = useAuth();
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      if (isAuthenticated) {
        setChecking(false);
        return;
      }

      try {
        const verified = await verifyAuth();
        
        if (verified) {
          setChecking(false);
        } else {
          router.replace("/auth");
        }
      } catch (error) {
        console.error("Authentication verification failed:", error);
        router.replace("/auth");
      }
    }
    
    checkAuth();
  }, [isAuthenticated, router, verifyAuth]);

  if (checking) {
    return (
      <div className="bg-background min-h-screen">
        {/* Skeleton Navbar */}
        <header className="border-b border-border h-16 px-4 flex items-center justify-between">
          <div className="h-8 w-32 bg-muted rounded-md animate-pulse" />
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-muted rounded-full animate-pulse" />
            <div className="h-8 w-24 bg-muted rounded-md animate-pulse" />
          </div>
        </header>
        
        <div className="flex">
          {/* Skeleton Sidebar */}
          <aside className="w-64 border-r border-border h-[calc(100vh-64px)] p-4">
            <div className="space-y-4">
              <div className="h-8 w-full bg-muted rounded-md animate-pulse" />
              <div className="h-8 w-full bg-muted rounded-md animate-pulse" />
              <div className="h-8 w-full bg-muted rounded-md animate-pulse" />
              <div className="h-8 w-3/4 bg-muted rounded-md animate-pulse" />
            </div>
          </aside>
          
          {/* Skeleton Main Content */}
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div className="h-10 w-1/3 bg-muted rounded-md animate-pulse" />
              <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
              <div className="h-64 rounded-lg bg-muted animate-pulse" />
              <div className="h-40 rounded-lg bg-muted animate-pulse" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return <MainLayout>{children}</MainLayout>;
}