"use client";

import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function WithSidebar({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user || pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <div className=" flex">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto">
        <div className="h-full">{children}</div>
      </main>
    </div>
  );
}