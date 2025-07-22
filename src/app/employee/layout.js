import "./globals.css";

export const metadata = {
  title: "Employee Dashboard (Managemant System)",
  description: "Employee dashboard for employee managent system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
