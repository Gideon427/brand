import type { Metadata } from "next";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { SessionProvider } from "@/components/shared/session-provider";


import "./globals.css";

export const metadata: Metadata = {
  title: "Brandoria — Built for Business",
  description:
    "Business growth, digital infrastructure and customer acquisition.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}