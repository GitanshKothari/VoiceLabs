"use client";

import type React from "react";
import { Sidebar } from "./sidebar";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Tab {
  name: string;
  path: string;
}

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
  tabs?: Tab[];
  pageTitle?: string;
}

export function PageLayout({ children, currentPage, user, tabs, pageTitle }: PageLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="bg-background flex min-h-screen">
      {/* Sidebar for desktop + mobile */}
      <Sidebar
        currentPage={currentPage}
        user={user}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <main className="flex-1 transition-all duration-300">
        {/* Mobile header with hamburger menu and tabs */}
    
           <div className="flex items-center p-3 border-b">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu className="h-6 w-6 md:hidden" />
            </Button>
            
            {/* Page title */}
            {pageTitle && (
              <h1 className="text-lg font-semibold ml-3 md:hidden">
                {pageTitle}
              </h1>
            )}
            
            {/* Mobile tabs - centered */}
            {tabs && tabs.length > 0 && (
              <div className="flex-1 flex justify-center">
                <div className="flex space-x-1">
                  {tabs.map((tab) => {
                    const isActive = pathname === tab.path;
                    return (
                      <Link
                        key={tab.path}
                        href={tab.path}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {tab.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
           </div>
        {children}
      </main>
    </div>
  );
}
