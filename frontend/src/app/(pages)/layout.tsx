"use client";

import { MainLayout } from "@/components/layouts/main-layout";
import type { ReactNode } from "react";

interface PagesLayoutProps {
  children: ReactNode;
}

export default function PagesLayout({ children }: PagesLayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}