"use client";
import { ChangTheme } from "@/components/change-theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquareMore } from "lucide-react";

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex h-[--header-height] max-w-full items-center justify-between bg-card pl-4 pr-4 shadow">
      <div className="flex items-center gap-4">
        {children}
        <div className="text-[24px] font-bold text-primary">Foodie</div>
      </div>
      <div className="flex items-center justify-center gap-16">
        <div className="flex items-center justify-center gap-4">
          <Button
            className="hover:bg-foreground/10 dark:hover:bg-foreground/30 hover:text-current"
            variant={"ghost"}
            size={"icon"}
          >
            <MessageSquareMore />
          </Button>
          <Button
            className="hover:bg-foreground/10 dark:hover:bg-foreground/30 hover:text-current"
            variant={"ghost"}
            size={"icon"}
          >
            <Bell />
          </Button>
          <ChangTheme />
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="text-right">
            <div className="text-[14px]">Khang Buoi</div>
            <div className="text-xs opacity-50">Admin</div>
          </div>
          <Avatar>
            <AvatarImage src="https://placehold.co/400" alt="KhangBuoi" />
            <AvatarFallback>KB</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
