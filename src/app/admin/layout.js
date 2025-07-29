import "../globals.css";

export const metadata = {
  title: "Employee Dashboard (Managemant System)",
  description: "Employee dashboard for employee managent system",
};

export default function EmployeeLayout({ children }) {
  return (
    // <SearchProvider>
      <div className="">
        <main className="">
          {children}
        </main>
      </div>
    // </SearchProvider>
  );
}
