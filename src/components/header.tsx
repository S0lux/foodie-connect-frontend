import { ChangTheme } from "@/components/change-theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquareMore, Search } from "lucide-react";
import User from "./user-drop-down";
import UserDropDown from "./user-drop-down";

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex h-[--header-height] max-w-full items-center justify-between bg-card pl-4 pr-4 shadow">
      <div className="flex items-center gap-4">
        {children}
        <div className="text-[24px] font-bold text-primary">Foodie</div>
      </div>

      <div className="relative flex flex-row items-center space-x-1 rounded-full bg-input py-2 pl-3 pr-5 focus:outline">
        <Search className="opacity-40" size={20} />
        <input
          className="w-full bg-transparent outline-none"
          placeholder="Search something"
        ></input>
      </div>

      <div className="flex items-center justify-end gap-4">
        <ChangTheme />
        <UserDropDown />
      </div>
    </div>
  );
}
