import type { Metadata } from "next";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your monthly expenses",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
