"use client";
import {
  BadgeDollarSign,
  Building2,
  ChartLine,
  Home,
  Salad,
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
import useRestaurants from "@/hooks/use-restaurants";

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
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { data: restaurant } = useRestaurants.useGetRestaurant(restaurantId);

  const Head = [
    {
      title: "Dashboard",
      url: "/head/",
      icon: ChartLine,
    },
    {
      title: "Restaurants",
      url: "/head/restaurants",
      icon: Building2,
    },
  ];

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
      title: "Add Menu Item",
      url: `/head/${restaurantId}/menu/add`,
      icon: Salad,
    },
    {
      title: "Promotions",
      url: `/head/${restaurantId}/promotions`,
      icon: BadgeDollarSign,
    },
    {
      title: "Settings",
      url: `/head/${restaurantId}/update`,
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
              {Head.map((item, index) => (
                <SidebarItem key={index} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 text-[16px]">
            {restaurant?.name}
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
