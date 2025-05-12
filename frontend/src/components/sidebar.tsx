import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white text-gray-600 border-r border-gray-200",
        className
      )}
      {...props}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Image
            src="/Logo.png"
            alt="Aerofy Logo"
            width={100}
            height={40}
            className="h-auto"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 px-3 py-4">
        {children}
      </div>
    </div>
  );
}

interface SidebarItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export function SidebarItem({
  className,
  href,
  active,
  icon,
  badge,
  children,
  ...props
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = active || pathname === href;
  
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="w-5 h-5">{icon}</span>}
        <span>{children}</span>
      </div>
      {badge && <div>{badge}</div>}
    </Link>
  );
}
