import type { Metadata } from "next";
import "modern-normalize/modern-normalize.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your monthly expenses",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
