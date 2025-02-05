import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import  WithSidebar  from "@/components/WithSidebar";
import "./globals.css";
import type React from "react"; // Added import for React

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Manager",
  description: "A personal task management system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <WithSidebar>{children}</WithSidebar>
        </Providers>
      </body>
    </html>
  );
}

