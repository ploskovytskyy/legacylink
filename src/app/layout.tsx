import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyLegacy",
  description: "MyLegacy description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "bg-gradient-to-r from-rose-100/40 to-teal-100/40 dark:from-rose-100/0 dark:to-teal-100/0"
        )}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
