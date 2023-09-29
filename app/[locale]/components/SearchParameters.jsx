"use client";

import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import { openMailClient } from "@/lib/helpers";

import { XIcon, SendIcon } from "lucide-react";

const SearchParameters = ({ query, redirect }) => {
  const router = useRouter();

  const search = useTranslations("SearchParams");

  return (
    <>
      <h2 className="font-bold text-[1.5em] leading-[1.3333333] mb-[1em]">
        {search("search_page_title")}
      </h2>
      <div className="bg-gray-100 border dark:bg-gray-700 dark:text-gray-200 rounded-[0.25rem] shadow-sm p-4 mt-2 mb-6 relative">
        <div className="absolute right-3 top-3 z-10">
          <button
            className="mr-4"
            onClick={() => openMailClient(search("search_params"))}
            title={search("send_params")}
          >
            <SendIcon size={22} />
          </button>
          <button
            onClick={() => router.push(redirect)}
            title={search("clear_params")}
          >
            <XIcon size={24} />
          </button>
        </div>
        <h2 className="text-lg font-bold mb-4">{search("search_params")}</h2>
        <div className="flex flex-col gap-4">
          {Object.entries(query).map(
            ([key, entry], idx) =>
              entry &&
              key !== "after" &&
              key !== "before" && (
                <p key={idx}>
                  <span className="font-bold">{search(key)}: </span>
                  {entry === "title_ASC" ||
                  entry === "title_DESC" ||
                  entry === "published_ASC" ||
                  entry === "published_DESC" ||
                  entry === "Georgian" ||
                  entry === "Russian" ||
                  entry === "French" ||
                  entry === "German" ||
                  entry === "Armenian" ||
                  entry === "Persian" ||
                  entry === "English" ||
                  entry === "man" ||
                  entry === "female" ||
                  entry === "un" ||
                  entry === "church" ||
                  entry === "cemetery"
                    ? search(entry)
                    : entry}
                </p>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default SearchParameters;
