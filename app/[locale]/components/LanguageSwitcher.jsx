"use client";

import { Fragment } from "react";

import Link from "next-intl/link";
import { usePathname } from "next/navigation";

import { Menu, Transition } from "@headlessui/react";

import { LOCALES } from "@/lib/constants";
import { LanguagesIcon } from "lucide-react";

const LanguageSwitcher = ({ isOpen }) => {
  const pathname = usePathname();

  if (isOpen) {
    return (
      <>
        <hr className="border-1 border-gray-300 mb-4" />
        {LOCALES.map(({ id, locale, title }) => {
          const isActive = pathname.startsWith("/" + locale);
          return (
            <div key={id} className="mx-4 my-4">
              <Link
                href="/"
                locale={locale}
                className={isActive ? "font-bold" : ""}
              >
                {title}
              </Link>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="hidden md:block relative">
      <Menu>
        <Menu.Button>
          <LanguagesIcon />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-90"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-90"
        >
          <Menu.Items className="flex flex-col w-max absolute z-10 top-12 right-0 bg-white dark:text-gray-900 rounded-[0.25rem] p-4 border shadow-md">
            {LOCALES.map(({ id, locale, title }) => {
              const isActive = pathname.startsWith("/" + locale);
              return (
                <Menu.Item key={id}>
                  <Link
                    href="/"
                    locale={locale}
                    className={`py-2 text-sm ${isActive ? "font-bold" : ""}`}
                  >
                    {title}
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;
