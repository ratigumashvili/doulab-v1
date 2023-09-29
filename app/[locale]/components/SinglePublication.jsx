"use client";

import { useRef } from "react";

import ReactMarkdown from "react-markdown";
import { ToastContainer } from "react-toastify";

import { separate } from "@/lib/helpers";

import DropDown from "./DropDown";
import GoBack from "./GoBack";

const SinglePublication = ({ data }) => {
  const componentRef = useRef();
  return (
    <section>
      <ToastContainer />
      <div ref={componentRef} className="print:p-8">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-bold mb-4">{data?.title}</h2>
          <div className="flex item-center gap-4">
            <GoBack />
            <DropDown title={data?.title} ref={componentRef} />
          </div>
        </div>
        <p className="mb-2">
          {data?.author?.map((author, idx) => (
            <em key={idx}>
              {author}
              {separate(data?.author, idx)}
            </em>
          ))}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-200 mb-6">
          {data?.published}
        </p>
        <article className="prose text-gray-900 dark:text-gray-200">
          <ReactMarkdown>{data?.text}</ReactMarkdown>
        </article>
      </div>
    </section>
  );
};

export default SinglePublication;
