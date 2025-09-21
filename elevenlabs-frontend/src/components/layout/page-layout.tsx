"use client";

import type React from "react";
import { Sidebar } from "./sidebar";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { ServiceType } from "~/types/services";
import SpeechSidebar from "./speech-sidebar";
import type { HistoryItem } from "~/lib/history";

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
  showSidebar: boolean;
  service: ServiceType;
  historyItems: HistoryItem[]
}

export function PageLayout({
  children,
  currentPage,
  user,
  tabs,
  pageTitle,
  showSidebar,
  service,
  historyItems
}: PageLayoutProps) {
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

      <main className="flex min-h-screen flex-1 flex-col transition-all duration-300">
        {/* Mobile header with hamburger menu and tabs */}
        <div className="flex items-center border-b p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="h-6 w-6 md:hidden" />
          </Button>
          {/* Page title */}
          {pageTitle && (
            <h1 className="ml-3 text-lg font-semibold md:hidden">
              {pageTitle}
            </h1>
          )}
          {/* Mobile tabs - centered */}
          {tabs && tabs.length > 0 && (
            <div className="flex flex-1 justify-center">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const isActive = pathname === tab.path;
                  return (
                    <Link
                      key={tab.path}
                      href={tab.path}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
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
        <div className="flex h-full flex-1">
          <div className="flex-1 px-6 py-5">
            <div className="flex h-full flex-col">{children}</div>
          </div>
          {showSidebar && service && <SpeechSidebar historyItems={historyItems} service={service} />}
        </div>
      </main>
    </div>
  );
}
