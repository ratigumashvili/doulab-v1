"use client";

import { useState, useEffect, Fragment } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useTranslations } from "next-intl";

import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

import { PUBLICATIONS_SORT_OPTIONS, PUBLICATION_FORM } from "@/lib/constants";

const PublicationSearchForm = () => {
  const [formFields, setFormFields] = useState(PUBLICATION_FORM);
  const [sort, setSort] = useState(PUBLICATIONS_SORT_OPTIONS[0]);

  const sortingParam = useSearchParams();

  const sorted_author = sortingParam.get("author");
  const sorted_title = sortingParam.get("title");
  const sorted_datePublished = sortingParam.get("datePublished");
  const sorted_sortBy = sortingParam.get("sortBy");

  useEffect(() => {
    if (sorted_sortBy) {
      setSort((prev) => ({
        ...prev,
        value: sorted_sortBy,
      }));
    }
    if (sorted_author) {
      setFormFields((prev) => ({ ...prev, author: sorted_author }));
    }
    if (sorted_title) {
      setFormFields((prev) => ({ ...prev, title: sorted_title }));
    }
    if (sorted_datePublished) {
      setFormFields((prev) => ({
        ...prev,
        datePublished: sorted_datePublished,
      }));
    }
  }, []);

  const { author, title, datePublished } = formFields;

  const router = useRouter();

  const filteredRoute = `${author && `&author=${author}`}${
    title && `&title=${title}`
  }${datePublished && `&datePublished=${datePublished}`}${
    sort.value && `&sortBy=${sort.value}`
  }`;

  useEffect(() => {
    setFormFields((prev) => ({ ...prev, sort_by: sort.value }));
  }, [sort]);

  const handleFormChange = (e) => {
    setFormFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    router.push("/publications");
    router.push("/publications/filtered?" + filteredRoute);
  };

  const translate = useTranslations("Publications");
  const general = useTranslations("General");
  return (
    <section>
      <form onSubmit={handleFormSubmit}>
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="author">{translate("author")}</label>
            <input
              type="text"
              name="author"
              id="author"
              value={author}
              onChange={handleFormChange}
              className="form-input"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">{translate("title")}</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={handleFormChange}
              className="form-input"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="datePublished">{translate("date_published")}</label>
            <input
              type="date"
              name="datePublished"
              id="datePublished"
              value={datePublished}
              onChange={handleFormChange}
              className="form-input date"
              placeholder="mm/dd/yyy"
            />
          </div>
          <div className="mb-4">
            <Listbox value={sort} onChange={setSort} className="space-y-2">
              <div className="relative">
                <Listbox.Label>{translate("sort_by")}</Listbox.Label>
                <Listbox.Button className="form-select">
                  <span className="truncate">{translate(sort.value)}</span>{" "}
                  <ChevronDown size={20} />
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="form-options">
                    {PUBLICATIONS_SORT_OPTIONS.map((item) => (
                      <Listbox.Option
                        key={item.id}
                        value={item}
                        className="form-option"
                      >
                        <span className="flex items-center justify-between">
                          {translate(item.value)}
                          <Check
                            size={20}
                            className={`${
                              item.value === sort.value ? "visible" : "hidden"
                            }`}
                          />
                        </span>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <div className="mb-4 flex gap-4 self-end">
            <button
              className="button  bg-gray-900 
                text-gray-200 
                hover:bg-gray-800
                dark:hover:bg-gray-700"
            >
              {general("search")}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormFields(PUBLICATION_FORM);
                router.push("/publications");
              }}
              className="button bg-red-900 
              text-gray-200 
              hover:bg-red-800"
            >
              {general("reset")}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default PublicationSearchForm;
