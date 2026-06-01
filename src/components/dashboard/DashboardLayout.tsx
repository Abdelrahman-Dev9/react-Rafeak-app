import { useState } from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div dir="rtl" className="min-h-screen flex bg-gray-100 font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((p) => !p)}
      />
      <main
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "mr-56" : "mr-20"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
