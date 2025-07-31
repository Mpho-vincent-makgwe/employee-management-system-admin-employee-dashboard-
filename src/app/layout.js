// app/layout.js

import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";

export const metadata = {
  title: "Leave Management Dashboard",
  description: "Employee leave management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={``}>
      <body suppressHydrationWarning className="bg-white">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
