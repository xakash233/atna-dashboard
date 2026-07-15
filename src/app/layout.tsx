import type { Metadata } from "next";
import { PastelShell } from "@/components/pastel/PastelShell";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AccentProvider } from "@/providers/AccentProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atna | QA Testing",
  description: "Atna platform — Tracker, Customer Management, and Intelli Suite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="h-full bg-pastel-bg text-pastel-text antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <AccentProvider>
            <CustomCursor />
            <PastelShell>{children}</PastelShell>
          </AccentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
