"use client";

import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function WithSidebar({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user || pathname === "/") {
    return <>{children}</>; // Render only the children if the user is not logged in or on the landing page
  }

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72">{children}</main>
    </div>
  );
}