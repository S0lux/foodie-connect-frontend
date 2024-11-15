"use client";
import {
  Building2,
  Users,
  Settings,
  PlusCircle,
  Bell,
  History,
  ChartLine,
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
      <SidebarMenuButton size="lg" asChild>
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

export function HeadSidebar() {
  const items = [
    {
      title: "Head Dashboard",
      url: "/head/",
      icon: ChartLine,
    },
    {
      title: "Restaurants",
      url: "/head/restaurants",
      icon: Building2,
    },
    {
      title: "Add Restaurant",
      url: "/head/restaurants/add",
      icon: PlusCircle,
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
