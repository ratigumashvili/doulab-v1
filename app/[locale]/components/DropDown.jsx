"use client";

import { Fragment, forwardRef } from "react";
import ReactToPrint from "react-to-print";
import { useTranslations } from "next-intl";

import { handleCopyUrl } from "@/lib/helpers";

import { Menu, Transition } from "@headlessui/react";
import { Cog } from "lucide-react";

const DropDown = forwardRef(({ title }, ref) => {
  const general = useTranslations("General");
  return (
    <div className="relative print:hidden">
      <Menu>
        <Menu.Button>
          <Cog size={28} />
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
          <Menu.Items className="flex flex-col gap-2 w-max absolute top-8 right-0 bg-white dark:text-gray-900 rounded-[0.25rem] p-4 border shadow-md">
            <Menu.Item>
              <button
                className="self-start"
                onClick={() => handleCopyUrl(general("coppied"))}
              >
                {general("copyUrl")}
              </button>
            </Menu.Item>
            <Menu.Item>
              <div>
                <ReactToPrint
                  trigger={() => <button>{general("print")}</button>}
                  content={() => ref.current}
                  documentTitle={title}
                />
              </div>
            </Menu.Item>
            <Menu.Item>
              <button className="self-start">{general("cite")}</button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
});

export default DropDown;
