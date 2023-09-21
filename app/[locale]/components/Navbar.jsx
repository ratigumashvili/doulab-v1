"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

import { MenuIcon } from "lucide-react";

const Navbar = ({ items, mainPageTitle, locale }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuIconClick = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div
      className={`py-4 px-4 shadow-md dark:bg-gray-900 bg-gray-200 z-[9999]  ${
        isOpen
          ? "fixed top-0 left-0 right-0 bottom-0"
          : "flex justify-between items-center"
      }`}
    >
      <div className="flex items-center justify-between w-full md:hidden">
        <MenuIcon
          className="w-6 h-6 mx-2 cursor-pointer"
          onClick={handleMenuIconClick}
        />
        <div className="md:hidden">
          <ThemeSwitcher />
        </div>
      </div>

      <nav className="md:max-w-7xl md:w-full md:mx-auto md:flex md:items-center md:justify-between">
        <ul
          className={`${isOpen ? "visible" : "hidden"} md:flex md:items-center`}
        >
          <li>
            <Link href="/">
              <span
                className={`hover:bg-gray-300 hover:text-gray-900 rounded-sm transition-all block mx-2 my-4 p-2 md:inline md:mx-0 md:my-0 md:px-2 md:py-3 ${
                  "/" + locale === pathname && "font-bold"
                }`}
              >
                {mainPageTitle}
              </span>
            </Link>
          </li>
          {items.map(({ id, title, path }) => (
            <li key={id}>
              <Link
                href={path}
                className={`${
                  pathname.split("/")[2]?.startsWith(path.split("/").pop())
                    ? " font-bold"
                    : "font-normal "
                } hover:bg-gray-300 hover:text-gray-900 rounded-sm transition-all block mx-2 my-4 p-2 md:inline md:mx-0 md:my-0 md:px-2 md:py-3`}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="md:flex md:items-center md:justify-center gap-4">
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
          <LanguageSwitcher isOpen={isOpen} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
