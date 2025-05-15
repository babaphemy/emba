"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { CookiesProvider } from "react-cookie";
import { AppProvider } from "@/context/AppContext";
import ToastProvider from "@/lib/toast-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <CookiesProvider defaultSetOptions={{ path: "/" }}>
              <AppProvider>
                <>
                  {children}
                  <ToastProvider />
                </>
              </AppProvider>
            </CookiesProvider>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
