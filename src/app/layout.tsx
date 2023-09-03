import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LegacyLink",
  description: "LegacyLink description",
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
          "bg-gradient-to-r from-rose-100/40 to-teal-100/40 dark:from-rose-100/[.025] dark:to-teal-100/[.025]"
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
