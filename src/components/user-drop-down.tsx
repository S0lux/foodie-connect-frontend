"use client";
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
import authAction from "@/apis/auth.api";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const UserDropDown = () => {
  const { data: user, isLoading, isError, error } = authAction.useGetSession();
  const logout = authAction.useLogout();
  const route = useRouter();

  function handleLogout() {
    const result = logout.mutate();
    console.log(result);
    route.push("/login");
  }

  if (isError) {
    switch ((error as any)?.status) {
      case 401:
        return (
          <div className="flex gap-2">
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        );

      default:
        return <div>Something went wrong</div>;
    }
  }
  if (isLoading) return <Loader />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded px-2 py-1 outline-none xl:hover:bg-foreground/10">
        <div className="flex items-center justify-center md:gap-3">
          <div className="invisible w-0 text-right sm:visible sm:w-auto">
            <div className="text-[14px]">{user?.displayName}</div>
            <div className="text-xs opacity-50">{user?.type}</div>
          </div>
          <Avatar>
            <AvatarImage src={user?.avatar} alt={user?.displayName} />
            <AvatarFallback>NO</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
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
        <Button variant={"ghost"} onClick={() => handleLogout()}>
          <DropdownMenuItem className="cursor-pointer">
            <LogOut></LogOut>
            <span>Log out</span>
          </DropdownMenuItem>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropDown;
