"use client";

import { useEffect, useState } from "react";

import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

const ErrorComponent = ({ error, reset }) => {
  const [errorMessage, setErrorMessage] = useState(false);

  const messages = useTranslations("Messages");

  useEffect(() => {
    setErrorMessage(messages("error"));
  }, [error]);

  return (
    <div className="max-w-lg mx-auto text-red-600 border-red-600 bg-white shadow-md p-8 border rounded-lg">
      <div className="flex items-center gap-2">
        <AlertTriangle size={24} />
        <p>{errorMessage}</p>
      </div>
      <button
        className="bg-red-600 text-white px-3 py-2 mt-4 rounded-md hover:bg-red-700 transition-all"
        onClick={() => reset()}
      >
        {messages("retry")}
      </button>
    </div>
  );
};

export default ErrorComponent;
