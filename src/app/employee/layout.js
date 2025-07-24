import "../globals.css";
import Sidebar from "./components/Sidebar";
import { SearchProvider } from "./context/SearchContext";

export const metadata = {
  title: "Employee Dashboard (Managemant System)",
  description: "Employee dashboard for employee managent system",
};

export default function EmployeeLayout({ children }) {
  return (
    <SearchProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden pt-16 lg:pl-64 bg-gray-100">
          {children}
        </main>
      </div>
    </SearchProvider>
  );
}
