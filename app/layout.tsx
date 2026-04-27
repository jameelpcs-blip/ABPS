import type { Metadata } from "next";
import "./globals.css";
import { PwaProvider } from "@/components/pwa-provider";

export const metadata: Metadata = {
  title: "ABPS | Auto Bunker Planning Suite",
  description:
    "Enterprise bunker planning PWA with scheduling optimization, ROB forecasting, and shared nominations.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "ABPS",
    statusBarStyle: "default"
  },
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-192.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PwaProvider />
        {children}
      </body>
    </html>
  );
}
