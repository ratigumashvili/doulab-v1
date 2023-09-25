"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { useTranslations } from "next-intl";

import { toast } from "react-toastify";

import { message_options } from "@/lib/helpers";

export const BookmarksContext = createContext(null);

export const useBookmarks = () => {
  return useContext(BookmarksContext);
};

export const BookmarksProvider = ({ children }) => {
  const general = useTranslations("General");

  const [bookmarks, setBookmarks] = useState(
    // typeof window === "undefined"
    //   ? []
    //   : JSON.parse(sessionStorage.getItem("bookmarked"))
    JSON.parse(sessionStorage.getItem("bookmarked")) || []
  );

  const [isBookmarked, setIsBookmarked] = useState(
    // typeof window === "undefined"
    //   ? []
    //   : JSON.parse(sessionStorage.getItem("isBookmarked"))
    JSON.parse(sessionStorage.getItem("isBookmarked")) || []
  );

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
    sessionStorage.setItem("bookmarked", JSON.stringify(bookmarks));
    sessionStorage.setItem("isBookmarked", JSON.stringify(isBookmarked));
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
};
