import type { Metadata } from "next";
import "./globals.css";
import { Inter, Geist } from "next/font/google";
import localFont from "next/font/local";
import ClientRuntimeShell from "@/components/app/ClientRuntimeShell";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const neueMontreal = localFont({
  src: [
    {
      path: "../public/fonts/NeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

const rift = localFont({
  src: [
    {
      path: "../public/fonts/Rift-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-rift",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adibayu Group",
  description: "Advancing Industries. Driving Growth.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  other: {
    "color-scheme": "light dark",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(neueMontreal.variable, rift.variable, "font-sans", geist.variable)}
    >
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/adibayu-logo-white.ico"
          media="(prefers-color-scheme: dark)"
        />
      </head>

      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
        <ClientRuntimeShell>{children}</ClientRuntimeShell>
      </body>
    </html>
  );
}
