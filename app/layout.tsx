import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Inter } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
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
    <html lang="en" className={inter.variable}>
      <body>
        <NuqsAdapter>
          <ThemeProvider>
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
