import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToasterProvider from "@/components/ToasterProvider";
import ReactQueryProvider from "@/components/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgriTrack ",
  description: "Plateforme de gestion des parcelles, interventions et cultures agricoles.",
  icons: {
    icon: "/logo.ico", 
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ReactQueryProvider>
      <html lang="en" className="no-scrollbar">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased no-scrollbar`}
        >
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
