import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@wrksz/themes/next";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ThemeWrapper } from "@/components/ThemeWrapper/ThemeWrapper";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Expense Tracker",
    template: "%s · Expense Tracker",
  },
  description: "Track your monthly expenses",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <NuqsAdapter>
          <ThemeProvider attribute="data-theme">
            <ThemeWrapper>
              <Header />
              <main>{children}</main>
              <Footer />
            </ThemeWrapper>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
