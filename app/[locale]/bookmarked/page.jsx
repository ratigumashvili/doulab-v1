"use client";

import { useTranslations } from "next-intl";

import { useBookmarks } from "@/app/providers/bookmarksProvider";

import Table from "../components/Table";
import TableBody from "../components/TableBody";

const Bookmarked = () => {
  const { bookmarks } = useBookmarks();

  const general = useTranslations("General");
  const page_title = useTranslations("Bookmarks");

  if (bookmarks?.length === 0 || bookmarks === null) {
    return <h2>{general("no_bookmarks")}</h2>;
  }

  console.log(bookmarks);

  return (
    <section>
      <h2 className="font-bold text-[1.5em] leading-[1.3333333] mb-[1em]">
        {page_title("page_title")}
      </h2>
      <div className="w-full overflow-x-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <Table>
          <TableBody records={bookmarks} />
        </Table>
      </div>
    </section>
  );
};

export default Bookmarked;
