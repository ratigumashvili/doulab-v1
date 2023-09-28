"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { useTranslations } from "next-intl";

import { toast } from "react-toastify";

import { message_options } from "@/lib/helpers";

export const BookmarksContext = createContext(null);

export const useBookmarks = () => {
  return useContext(BookmarksContext);
};

export default function BookmarksProvider({ children }) {
  const general = useTranslations("General");

  const isBrowser = () =>
    typeof window !== "undefined" && window.sessionStorage;

  const initialBookmarked =
    isBrowser() && JSON.parse(sessionStorage.getItem("bookmarked"));
  const initialIsBookmarked =
    isBrowser() && JSON.parse(sessionStorage.getItem("isBookmarked"));

  const [bookmarks, setBookmarks] = useState(initialBookmarked || []);

  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked || []);

  const handleAddBookmark = (record) => {
    if (isBookmarked?.includes(record.id)) {
      return;
    }
    setBookmarks((prev) => [...prev, { node: record }]);
    setIsBookmarked((prev) => [...prev, record.id]);
    toast.success(general("bookmark_added"), { message_options });
  };

  const handleRemoveBookmark = (idToDelete) => {
    setBookmarks(bookmarks.filter(({ node }) => node.id !== idToDelete));
    setIsBookmarked(isBookmarked.filter((item) => item !== idToDelete));
    toast.success(general("bookmark_removed"), { message_options });
  };

  useEffect(() => {
    if (isBrowser()) {
      sessionStorage.setItem("bookmarked", JSON.stringify(bookmarks));
      sessionStorage.setItem("isBookmarked", JSON.stringify(isBookmarked));
    }
  }, [handleAddBookmark, handleRemoveBookmark]);

  const value = {
    bookmarks,
    isBookmarked,
    handleAddBookmark,
    handleRemoveBookmark,
  };

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
}
