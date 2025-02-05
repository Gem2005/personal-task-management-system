"use client";

import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Calendar, LayoutDashboard, LogOut, Settings, CheckSquare, Folder, ChevronLeft, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useTheme } from "next-themes";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Tasks",
    icon: CheckSquare,
    href: "/tasks",
    color: "text-violet-500",
  },
  {
    label: "Projects",
    icon: Folder,
    href: "/projects",
    color: "text-pink-700",
  },
  {
    label: "Calendar",
    icon: Calendar,
    href: "/calendar",
    color: "text-emerald-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-yellow-500",
  },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    router.push("/"); // Redirect to the landing page
  };

  if (!user || pathname === "/") {
    return null; // Don't render the sidebar if the user is not logged in or on the landing page
  }

  return (
    <div className={cn(
      "relative flex flex-col h-full transition-all duration-300",
      "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800",
      isCollapsed ? "w-[80px]" : "w-[240px]"
    )}>
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute -right-4 top-4 h-8 w-8 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronLeft className={cn("h-4 w-4 transition-all", isCollapsed && "rotate-180")} />
      </Button>

      <div className="px-3 py-4">
        <Link href="/dashboard" className={cn(
          "flex items-center mb-8",
          isCollapsed ? "justify-center" : "pl-3"
        )}>
          <h1 className={cn(
            "font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent",
            isCollapsed ? "text-xl" : "text-2xl"
          )}>
            {isCollapsed ? "TM" : "TaskManager"}
          </h1>
        </Link>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-x-2 p-3 rounded-lg text-sm font-medium transition-all",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                pathname === route.href 
                  ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary"
                  : "text-gray-500 dark:text-gray-400",
                isCollapsed && "justify-center"
              )}
            >
              <route.icon className={cn(
                "h-5 w-5 transition-colors",
                pathname === route.href ? route.color : "text-gray-500 dark:text-gray-400"
              )} />
              {!isCollapsed && <span>{route.label}</span>}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto p-3 space-y-3 border-t border-gray-200 dark:border-gray-800">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "w-full p-3 text-sm font-medium",
            "hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all",
            isCollapsed ? "justify-center" : "justify-start"
          )}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <>
              <Sun className="h-5 w-5 text-yellow-500" />
              {!isCollapsed && <span className="ml-2">Light Mode</span>}
            </>
          ) : (
            <>
              <Moon className="h-5 w-5 text-blue-500" />
              {!isCollapsed && <span className="ml-2">Dark Mode</span>}
            </>
          )}
        </Button>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn(
            "w-full p-3 text-sm font-medium text-gray-500 dark:text-gray-400",
            "hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );
}
