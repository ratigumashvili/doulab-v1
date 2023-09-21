"use client";

import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import { openMailClient } from "@/lib/helpers";

import { XIcon, SendIcon } from "lucide-react";

const PublicationSearchParams = ({ query }) => {
  const router = useRouter();

  const general = useTranslations("General");
  const fields = useTranslations("Publications");

  return (
    <div className="bg-gray-100 border dark:bg-gray-700 dark:text-gray-200 rounded-[0.25rem] shadow-sm p-4 mt-2 mb-6 relative">
      <div className="absolute right-3 top-3 z-10">
        <button
          className="mr-4"
          onClick={() => openMailClient(general("search_params"))}
          title={general("send_params")}
        >
          <SendIcon size={22} />
        </button>
        <button
          onClick={() => router.push("/publications")}
          title={general("clear_params")}
        >
          <XIcon size={24} />
        </button>
      </div>
      <h2 className="text-lg font-bold mb-4">{general("search_params")}</h2>
      <div className="flex flex-col gap-4">
        {query?.author && (
          <p>
            <span className="font-bold">{fields("author")}: </span>
            {query?.author}
          </p>
        )}

        {query?.title && (
          <p>
            <span className="font-bold">{fields("title")}: </span>
            {query?.title}
          </p>
        )}

        {query?.datePublished && (
          <p>
            <span className="font-bold">{fields("date_published")}: </span>
            {query?.datePublished}
          </p>
        )}

        {query?.sortBy && (
          <p>
            <span className="font-bold">{fields("sort_by")}: </span>
            {fields(query?.sortBy)}
          </p>
        )}
      </div>
    </div>
  );
};

export default PublicationSearchParams;
