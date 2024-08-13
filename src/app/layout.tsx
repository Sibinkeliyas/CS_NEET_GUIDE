import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/context/Providers";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
