"use client"
import * as React from "react";
import Image from "next/image";
import { Sidebar, SidebarItem } from "@/components/sidebar";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  return (
    <div className="flex h-screen relative">
      {/* Mobile sidebar */}
      <div className={`md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Image 
              src="/Logo.png" 
              alt="Aerofy Logo" 
              width={120} 
              height={40} 
              className="h-auto" 
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full" 
              onClick={() => setSidebarOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>
          <div className="flex flex-col h-full">
            <nav className="px-3 py-4 overflow-y-auto flex-1">
              <div className="space-y-2">
                <SidebarItem href="/send" icon={<SendFileIcon size={18} />} className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                  Send File
                </SidebarItem>
                <SidebarItem href="/receive" icon={<ReceiveFileIcon size={18} />} className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                  Receive File
                </SidebarItem>
                <SidebarItem 
                  href="/adrop" 
                  icon={<ADropIcon size={18} />}
                  badge={<ComingSoonBadge />}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  ADrop
                </SidebarItem>
              </div>
            </nav>
            
            {/* Profile and Logout section - positioned higher */}
            <div className="px-3 py-4 mb-6">
              <div className="space-y-2">
                <SidebarItem href="/profile" icon={<ProfileIcon size={18} />} className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                  Profile
                </SidebarItem>
                <SidebarItem href="#" icon={<LogoutIcon size={18} />} className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                  Logout
                </SidebarItem>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <Sidebar className="w-56 hidden md:flex">
        <div className="space-y-2">
          <SidebarItem href="/send" icon={<SendFileIcon size={18} />} className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
            Send File
          </SidebarItem>
          <SidebarItem href="/receive" icon={<ReceiveFileIcon size={18} />} className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
            Receive File
          </SidebarItem>
          <SidebarItem 
            href="/adrop" 
            icon={<ADropIcon size={18} />}
            badge={<ComingSoonBadge />}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
          >
            ADrop
          </SidebarItem>
        </div>
        <div className="mt-auto space-y-2">
          <SidebarItem href="/profile" icon={<ProfileIcon size={18} />} className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
            Profile
          </SidebarItem>
          <SidebarItem href="#" icon={<LogoutIcon size={18} />} className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
            Logout
          </SidebarItem>
        </div>
      </Sidebar>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="flex items-center p-3 border-b md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu size={18} />
          </Button>
          <div className="ml-3">
            <Image 
              src="/Logo.png" 
              alt="Aerofy Logo" 
              width={100} 
              height={30} 
              className="h-auto" 
            />
          </div>
        </div>
        <div className="p-3 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

// Icon components
function SendFileIcon({ size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function ReceiveFileIcon({ size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ADropIcon({ size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  );
}

function ProfileIcon({ size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ComingSoonBadge() {
  return (
    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
      Soon
    </span>
  );
}

function LogoutIcon({ size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}