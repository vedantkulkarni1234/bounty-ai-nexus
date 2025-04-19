
import {
  Bug,
  ShieldAlert,
  Search,
  FileBarChart,
  Home,
  Settings,
  Bomb,
  Code
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const location = useLocation();
  
  const mainNavItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/",
    },
    {
      title: "Reconnaissance",
      icon: Search,
      path: "/recon",
    },
    {
      title: "Vulnerabilities",
      icon: ShieldAlert,
      path: "/vulnerabilities",
    },
    {
      title: "Exploitation",
      icon: Bomb,
      path: "/exploitation",
    },
    {
      title: "Reports",
      icon: FileBarChart,
      path: "/reports",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/50">
        <div className="flex items-center gap-2 px-2 py-3">
          <Bug className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">BugNexus AI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      className={isActive ? "bg-primary/10 text-primary" : ""}
                    >
                      <Link to={item.path}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>LLM Configuration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings" className="text-accent">
                    <Code />
                    <span>Configure AI Endpoint</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="flex justify-end p-2">
        <SidebarTrigger className="ml-auto" />
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
