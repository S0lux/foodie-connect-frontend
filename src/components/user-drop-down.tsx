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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/hooks/use-auth";
import Loader from "@/components/loader";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ErrorType } from "@/types/error.type";
import { getAvatarUrl, getInitials } from "@/lib/handleImage";

const UserDropDown = () => {
  const { data: user, isLoading, isError, error } = useAuth.useGetSession();
  const logout = useAuth.useLogout();
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleLogout() {
    if (loading) return;
    setLoading(true);
    try {
      await logout.mutate();
      route.push("/login");
    } catch (error) {
      switch ((error as ErrorType).code) {
        case "NOT_AUTHENTICATED":
          toast({
            title: "Error",
            description: "Not logged in",
            variant: "destructive",
          });
          break;
        default:
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
          break;
      }
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) return <Loader />;

  if (!user)
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded px-2 py-1 outline-none xl:hover:bg-foreground/10">
        <div className="flex items-center justify-center md:gap-3">
          <div className="invisible w-0 text-right sm:visible sm:w-auto">
            <div className="text-[14px]">{user?.displayName}</div>
            <div className="text-xs opacity-50">{user?.type}</div>
          </div>
          <Avatar>
            <AvatarImage
              src={getAvatarUrl(user?.avatar, user?.displayName)}
              alt={user?.displayName}
            />
            <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user!.displayName}</DropdownMenuLabel>
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
