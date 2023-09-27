"use client";

import { ThemeProvider } from "next-themes";

import useIsMounted from "../hooks/useIsMounted";

export default function ThemeProviders({ children }) {
  const { isMounted } = useIsMounted();

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class">
      <div className="bg-gray-100 flex flex-col min-h-screen dark:bg-gray-800 dark:text-gray-300">
        {children}
      </div>
    </ThemeProvider>
  );
}
