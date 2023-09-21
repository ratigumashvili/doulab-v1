"use client";

import ReactMarkdown from "react-markdown";
import { useTranslations } from "next-intl";

import { Disclosure, Transition } from "@headlessui/react";

import { ToastContainer } from "react-toastify";

import { ChevronUp } from "lucide-react";

import Table from "../../Table";
import TableBody from "../../TableBody";

const SingleBurial = ({ meta, singleBurial }) => {
  const fields = useTranslations("Data");
  const general = useTranslations("General");

  return (
    <div>
      <ToastContainer />
      <h2 className="text-lg font-bold mb-4">{meta?.title}</h2>
      <hr />
      <div className="flex flex-col gap-2 my-4 ">
        <div className="flex gap-2 mb-4">
          <p>
            <b>{fields("type")}</b>: <span>{fields(meta?.burrialType)}</span>
          </p>
          <p>
            <b>{fields("place")}</b>: <span>{meta?.place?.name}</span>
          </p>
        </div>

        {meta?.description && (
          <Disclosure defaultOpen="true">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-[0.25rem] p-4 text-left text-md font-medium bg-gray-200 border dark:bg-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-700 focus:outline-none">
                  <span>{general("description")}</span>
                  <ChevronUp
                    className={`${
                      open ? "" : "rotate-180 transform"
                    } h-5 w-5 text-gray-900 dark:text-gray-200`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-300 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-150 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    <article className="prose max-w-none text-gray-900 dark:text-gray-200 mb-4">
                      <ReactMarkdown>{meta?.description}</ReactMarkdown>
                    </article>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        )}
      </div>

      <div className="w-full overflow-x-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <Table>
          <TableBody records={singleBurial?.edges} />
        </Table>
      </div>
    </div>
  );
};

export default SingleBurial;
