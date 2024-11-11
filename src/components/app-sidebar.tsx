"use client";
import {
  BadgeDollarSign,
  BookA,
  Calendar,
  ChartArea,
  HandPlatter,
  Home,
  Settings,
  Utensils,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useParams } from "next/navigation";

function SidebarItem({
  title,
  url,
  icon: Icon,
}: {
  title: string;
  url: string;
  icon: React.ComponentType;
}) {
  return (
    <SidebarMenuItem className="text-lg">
      <SidebarMenuButton size={"lg"} asChild>
        <Link
          className="rounded-lg block items-center space-x-2 px-4 hover:scale-105 hover:transform hover:bg-foreground/10 hover:text-foreground"
          href={url}
        >
          <Icon />
          <span className="text-lg">{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const { restaurantId } = useParams();
  console.log(restaurantId);
  const items = [
    {
      title: "Overview",
      url: `/head/${restaurantId}/`,
      icon: Home,
    },
    {
      title: "Menu",
      url: `/head/${restaurantId}/menu`,
      icon: Utensils,
    },
    {
      title: "Promotions",
      url: `/head/${restaurantId}/promotions`,
      icon: BadgeDollarSign,
    },
    {
      title: "Services",
      url: `/head/${restaurantId}/services`,
      icon: HandPlatter,
    },
    {
      title: "Areas",
      url: `/head/${restaurantId}/areas`,
      icon: ChartArea,
    },
    {
      title: "Settings",
      url: `/head/${restaurantId}/settings`,
      icon: Settings,
    },
  ];
  return (
    <Sidebar className="mt-[--header-height] rounded border-r border-[#ccc] border-opacity-50">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 text-[16px]">
            Restaurant Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarItem key={index} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
