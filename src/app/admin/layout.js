import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";


export const metadata = {
  title: "Admin Dashboard (Managemant System)",
  description: "Admin dashboard for employee managent system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <div className="flex h-screen ">
        <Sidebar/>
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNav/>
          <div className="flex-1 overflow-y-auto p-6 ">
            {children}
          </div>
        </div>
      </div>
      </body>
    </html>
  );
}
