import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Employee Dashboard (Managemant System)",
  description: "Employee dashboard for employee managent system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
