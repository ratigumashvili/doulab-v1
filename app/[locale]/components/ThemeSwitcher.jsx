"use client";

import { useTheme } from "next-themes";
import useIsMounted from "@/app/hooks/useIsMounted";

import { MoonIcon, SunIcon } from "lucide-react";

const ThemeSwitcher = () => {
  const { isMounted } = useIsMounted();
  const { theme, setTheme } = useTheme();

  const handleThemeChangeClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <button className="p-0" onClick={handleThemeChangeClick}>
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeSwitcher;
