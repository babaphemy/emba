"use client";
import Footer from "@/component/dashboard/Footer";
import LeftSide from "@/component/dashboard/sidebar/LeftSide";
import TopNavbar from "@/component/dashboard/topnav/TopNavbar";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 z-50 flex w-[300px] flex-col bg-white transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <LeftSide toogleActive={toggleSidebar} />
      </div>

      <div className="lg:pl-[300px]">
        <TopNavbar toogleActive={toggleSidebar} />

        <main className="min-h-[calc(100vh-4rem)] px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
