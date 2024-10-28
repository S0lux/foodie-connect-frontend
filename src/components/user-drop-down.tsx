import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

const UserDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded px-2 py-1 outline-none xl:hover:bg-foreground/10">
        <div className="flex items-center justify-center gap-3">
          <div className="invisible w-0 text-right sm:visible sm:w-auto">
            <div className="text-[14px]">Khang Buoi</div>
            <div className="text-xs opacity-50">Admin</div>
          </div>
          <Avatar>
            <AvatarImage src="https://placehold.co/400" alt="KhangBuoi" />
            <AvatarFallback>KB</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Khang Buoi</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 bg-foreground/20" />
        <DropdownMenuItem className="cursor-pointer">
          <User></User>
          <span>Profile</span>
        </DropdownMenuItem>
        <Link href="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings></Settings>
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="my-1 bg-foreground/20" />
        <DropdownMenuItem className="cursor-pointer">
          <LogOut></LogOut>
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropDown;
