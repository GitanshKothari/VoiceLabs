"use client";

import type React from "react";
import { Sidebar } from "./sidebar";

interface PageLayoutProps {
  children: React.ReactNode;
  user?: {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    image: string | null;
    credits: number;
  } | null;
  currentPage?: string;
}

export function PageLayout({ children, currentPage, user }: PageLayoutProps) {
  return (
    <div className="bg-background flex min-h-screen">
      <Sidebar currentPage={currentPage} user={user} />
      <main className="flex-1 transition-all duration-300">{children}</main>
    </div>
  );
}
