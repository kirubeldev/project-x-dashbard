// components/ClientLayout.js
"use client"; // This line indicates that this component is a client component

import { usePathname } from "next/navigation";
import { StatCards } from "./Dashboard/StatCards";
import { Sidebar } from "./Sidebar/Sidebar";
import { TopBar } from "./Dashboard/TopBar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const noLayoutPaths = ['/admin/login', "/"]; // Add any other paths as needed

  return (
    <>
      {noLayoutPaths.includes(pathname) ? (
        // Render just the children (for pages like login)
        children
      ) : (
        // Render the full layout
        <>
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <TopBar />
            <StatCards />
            {children}
          </div>
        </>
      )}
    </>
  );
}