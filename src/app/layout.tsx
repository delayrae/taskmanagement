import type { Metadata } from "next";
import { ThemeProvider } from "@/components/themeProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import { appName } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${appName} | Taskmanagement`,
  description: `${appName} is an advanced task management systems for enterprises.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
