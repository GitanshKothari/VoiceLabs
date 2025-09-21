"use client";

import { useState, useEffect } from "react";
import {
  Pin,
  PinOff,
  BarChart3,
  MessageSquare,
  Mic,
  LogOut,
  X,
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

interface User {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  credits: number;
}

interface UserDropdownProps {
  user?: User | null;
  isVisible: boolean;
  onSignOut: () => void;
  onDropdownOpenChange: (open: boolean) => void;
}

function UserDropdown({ user, isVisible, onSignOut, onDropdownOpenChange }: UserDropdownProps) {
  return (
    <DropdownMenu onOpenChange={onDropdownOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-muted/50 h-auto w-full rounded-lg p-0 transition-colors"
        >
          <div className="flex w-full items-center space-x-2 sm:space-x-3 p-2">
            {/* Avatar circle */}
            <div className="bg-muted flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full">
              <span className="text-xs sm:text-sm font-medium">
                {user?.firstName?.[0] ?? "U"}
              </span>
            </div>

            {/* User info */}
            {isVisible && (
              <div className="min-w-0 flex-1 text-left overflow-hidden">
                <p className="text-foreground truncate text-sm font-medium">
                  {user?.firstName || "User"}
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
            {user?.firstName + " " + user?.lastName || "User"}
          </p>
          <p className="text-muted-foreground text-xs">
            {user?.email || "user@example.com"}
          </p>
        </div>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem
          onClick={onSignOut}
          className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/20"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface SidebarProps {
  currentPage?: string;
  user?: User | null;
  isMobileSidebarOpen: boolean;
  onClose?: () => void;
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

export function Sidebar({
  currentPage,
  user,
  isMobileSidebarOpen,
  onClose,
}: SidebarProps) {
  const isMobile = useMediaQuery("(max-width: 768px)"); // md breakpoint

  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = !isMobile && (isPinned || isHovered);
  const isVisible = isMobile ? isMobileSidebarOpen : isExpanded;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => signOut();
  const handleMouseEnter = () => !isDropdownOpen && setIsHovered(true);
  const handleMouseLeave = () => !isDropdownOpen && setIsHovered(false);
  
  const handleDropdownOpenChange = (open: boolean) => {
    setIsDropdownOpen(open);
    // When dropdown closes, also reset hover state to contract sidebar
    if (!open) {
      setIsHovered(false);
    }
  };
  return (
    <div
      className={`bg-card border-border flex flex-col border-r transition-all duration-300 ease-in-out ${
        isMobile
          ? `fixed inset-y-0 left-0 z-50 w-full max-w-64 transform ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`
          : isExpanded ? "w-64" : "w-16"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* header */}
      <div className="border-border flex items-center justify-between border-b p-3 sm:p-4">
        <span className="font-bold text-sm sm:text-base">
          {isExpanded || isMobile ? "VoiceLabs" : "V"}
        </span>
        {isMobile ? (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        ) : (
          isExpanded && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPinned(!isPinned)}
            >
              {isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
            </Button>
          )
        )}
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
            isExpanded={isVisible}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-border border-t p-3 sm:p-4">
        <UserDropdown 
          user={user} 
          isVisible={isVisible} 
          onSignOut={handleSignOut}
          onDropdownOpenChange={handleDropdownOpenChange}
        />
      </div>
    </div>
  );
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}
