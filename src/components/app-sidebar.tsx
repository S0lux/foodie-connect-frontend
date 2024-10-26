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
          className="block items-center space-x-2 rounded-lg px-4 hover:scale-105 hover:transform hover:bg-foreground hover:text-white dark:hover:text-black"
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
  const { restaurantName } = useParams();
  console.log(restaurantName);
  const items = [
    {
      title: "Dashboard",
      url: `/head/${restaurantName}/dashboard`,
      icon: Home,
    },
    {
      title: "Menu",
      url: `/head/${restaurantName}/menu`,
      icon: Utensils,
    },
    {
      title: "Orders",
      url: `/head/${restaurantName}/orders`,
      icon: BookA,
    },
    {
      title: "Work Schedule",
      url: `/head/${restaurantName}/work-schedule`,
      icon: Calendar,
    },
    {
      title: "Services",
      url: `/head/${restaurantName}/services`,
      icon: HandPlatter,
    },
    {
      title: "Promotions",
      url: `/head/${restaurantName}/promotions`,
      icon: BadgeDollarSign,
    },
    {
      title: "Areas",
      url: `/head/${restaurantName}/areas`,
      icon: ChartArea,
    },
    {
      title: "Settings",
      url: `/head/${restaurantName}/settings`,
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
