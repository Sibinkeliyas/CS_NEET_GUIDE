"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store } from "@/store";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";
const JWTProvider = dynamic(() => import("./jwtContext"));

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Provider store={store}>
          <JWTProvider />
          <>{children}</>
        </Provider>
      </ThemeProvider>
    </>
  );
}
