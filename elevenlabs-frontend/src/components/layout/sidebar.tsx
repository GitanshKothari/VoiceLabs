"use client";

import { useState } from "react";
import {
  Pin,
  PinOff,
  Home,
  Users,
  Settings,
  BarChart3,
  MessageSquare,
  Mic,
  LogOut,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import SectionHeader from "~/components/layout/section-header";
import { signOut } from "next-auth/react";

interface SidebarProps {
  currentPage?: string;
  user?: {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    image: string | null;
    credits: number;
  } | null;
}

const navigationItems = [
  {
    id: "text-to-speech",
    label: "Text to Speech",
    icon: MessageSquare,
    href: "/app/speech-synthesis/text-to-speech",
  },
  {
    id: "voice-changer",
    label: "Voice Changer",
    icon: Mic,
    href: "/app/speech-to-speech",
  },
  {
    id: "sound-effects",
    label: "Sound Effects",
    icon: BarChart3,
    href: "/app/sound-effects/generate",
  },
];

export function Sidebar({ currentPage, user }: SidebarProps) {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isExpanded = isPinned || isHovered;

  const handleSignOut = () => {
    signOut();
    setIsDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    if (!isDropdownOpen) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isDropdownOpen) {
      setIsHovered(false);
    }
  };
  return (
    <div
      className={`bg-card border-border border-r transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-16"
      } flex flex-col`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header with Logo and Pin Button */}
      <div className="border-border border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
              <div className="bg-primary-foreground h-4 w-4 rounded-sm" />
            </div>
            {isExpanded && (
              <span className="text-foreground text-lg font-semibold whitespace-nowrap">
                VoiceLabs
              </span>
            )}
          </div>
          {isExpanded && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPinned(!isPinned)}
              className="hover:bg-muted h-8 w-8 p-0"
            >
              {isPinned ? (
                <PinOff className="h-4 w-4" />
              ) : (
                <Pin className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 p-2">
        {navigationItems.map((item) => (
          <SectionHeader
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            href={item.href}
            isActive={currentPage === item.id}
            isExpanded={isExpanded}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-border border-t p-4">
        <DropdownMenu onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-muted/50 h-auto w-full rounded-lg p-0 transition-colors"
            >
              <div className="flex w-full items-center space-x-3 p-2">
                <div className="bg-muted flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                  <span className="text-sm font-medium">U</span>
                </div>
                {isExpanded && (
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-foreground truncate text-sm font-medium">
                      {user?.firstName + " " + user?.lastName || "User"}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="right"
            className="bg-card border-border w-56 shadow-lg"
          >
            <div className="px-2 py-1.5">
              <p className="text-foreground text-sm font-medium">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-muted-foreground text-xs">{user?.email}</p>
            </div>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
