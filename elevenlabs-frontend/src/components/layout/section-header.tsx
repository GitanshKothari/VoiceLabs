"use client";

import type { LucideIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

interface SectionHeaderProps {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  isActive?: boolean;
  isExpanded: boolean;
}

export default function SectionHeader({
  id,
  label,
  icon: Icon,
  href,
  isActive = false,
  isExpanded,
}: SectionHeaderProps) {
  return (
    <Link href={href} className="block">
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={`h-10 w-full justify-start px-3 ${
          isActive
            ? "bg-primary/10 text-primary hover:bg-primary/15"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        } ${!isExpanded ? "px-2" : ""}`}
      >
        <Icon className={`h-5 w-5 flex-shrink-0 ${isExpanded ? "mr-3" : ""}`} />
        {isExpanded && <span className="truncate">{label}</span>}
      </Button>
    </Link>
  );
}
