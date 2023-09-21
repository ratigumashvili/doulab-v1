"use client";

import Link from "next/link";

import { useTranslations } from "next-intl";

import { useBookmarks } from "@/app/providers/bookmarksProvider";

import { BookmarkMinus, BookmarkPlus, MoreHorizontal } from "lucide-react";

const TableBody = ({ records }) => {
  const general = useTranslations("General");

  const { handleAddBookmark, handleRemoveBookmark, isBookmarked } =
    useBookmarks();

  return (
    <>
      {records &&
        records.map(({ node }) => (
          <tr key={node.id} className="dark:bg-gray-300 dark:text-gray-800">
            <td className="border border-slate-300 dark:border-slate-900 p-2">
              {node.name}
            </td>
            <td className="border border-slate-300 dark:border-slate-900 p-2">
              {node.patronym}
            </td>
            <td className="border border-slate-300 dark:border-slate-900 p-2">
              {node.surname}
            </td>
            <td className="border border-slate-300 dark:border-slate-900 p-2 text-center w-max">
              {node.age}
            </td>
            <td className="border border-slate-300 dark:border-slate-900 p-2 text-center w-max">
              {node.dob}
            </td>
            <td className="border border-slate-300 dark:border-slate-900 p-2 text-center w-max">
              {node.dod}
            </td>
            <td className="border border-slate-300 dark:border-slate-900 p-2 text-center w-max">
              <div className="flex items-center justify-center gap-3">
                <Link
                  href={`/data/${node.slug}`}
                  title={general("read_more")}
                  className="block px-2 py-0 border border-gray-800 rounded-[0.25rem] hover:bg-gray-800 hover:text-gray-200 transition-all"
                >
                  <MoreHorizontal />
                </Link>
                {isBookmarked?.includes(node.id) ? (
                  <button
                    onClick={() => handleRemoveBookmark(node.id)}
                    title={general("remove_bookmark")}
                  >
                    <BookmarkMinus />
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddBookmark(node)}
                    title={general("bookmark")}
                  >
                    <BookmarkPlus />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
    </>
  );
};

export default TableBody;
