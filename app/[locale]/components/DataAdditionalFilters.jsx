"use client";

import { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";

import { Check, ChevronDown } from "lucide-react";
import { GENDERS, ADDITIONAL_FILTERS } from "@/lib/constants";
import Link from "next/link";

const DataAdditionalFilters = ({ burials, enscriptionLanguages }) => {
  const [filters, setFilters] = useState(ADDITIONAL_FILTERS);

  const [selectedType, setSelectedType] = useState(burials[0]);
  const [selectedGender, setSelectedGender] = useState(GENDERS[0]);
  const [selectedEnscLang, setSelectedEnscLang] = useState(
    enscriptionLanguages[0]
  );

  useEffect(() => {
    setFilters((prevData) => ({
      ...prevData,
      gender: selectedGender.value,
    }));
  }, [selectedGender]);

  useEffect(() => {
    setFilters((prevData) => ({ ...prevData, type: selectedType }));
  }, [selectedType]);

  useEffect(() => {
    setFilters((prevData) => ({
      ...prevData,
      enscription_lang: selectedEnscLang,
    }));
  }, [selectedEnscLang]);

  const filteredRoute = "";

  const fields = useTranslations("Data");
  const general = useTranslations("General");
  return (
    <form>
      {JSON.stringify(filters, null, 2)}
      <div className="md:grid md:grid-cols-4 md:gap-4">
        {selectedType && (
          <div>
            <Listbox
              value={selectedType}
              onChange={setSelectedType}
              className="space-y-2"
            >
              <div className="relative">
                <Listbox.Label>{fields("type")}</Listbox.Label>
                <Listbox.Button className="form-select">
                  {fields(selectedType)} <ChevronDown size={20} />
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="form-options">
                    {burials?.map((item) => (
                      <Listbox.Option
                        key={item}
                        value={item}
                        className="form-option"
                      >
                        <span className="flex items-center justify-between">
                          {fields(item)}
                          <Check
                            size={20}
                            className={`${
                              item === selectedType ? "visible" : "hidden"
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
        )}
        <div className="space-y-2">
          <Listbox
            value={selectedGender}
            onChange={setSelectedGender}
            className="space-y-2"
          >
            <div className="relative">
              <Listbox.Label>{fields("gender")}</Listbox.Label>
              <Listbox.Button className="form-select">
                {fields(selectedGender.value)} <ChevronDown size={20} />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="form-options">
                  {GENDERS.map((item) => (
                    <Listbox.Option
                      key={item.id}
                      value={item}
                      className="form-option"
                    >
                      <span className="flex items-center justify-between">
                        {fields(item.value)}
                        <Check
                          size={20}
                          className={`${
                            item.value === selectedGender.value
                              ? "visible"
                              : "hidden"
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
        {selectedEnscLang && (
          <div>
            <Listbox
              value={selectedEnscLang}
              onChange={setSelectedEnscLang}
              className="space-y-2"
            >
              <div className="relative">
                <Listbox.Label>{fields("enscription_lang")}</Listbox.Label>
                <Listbox.Button className="form-select">
                  {fields(selectedEnscLang)} <ChevronDown size={20} />
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="form-options">
                    {enscriptionLanguages?.map((item) => (
                      <Listbox.Option
                        key={item}
                        value={item}
                        className="form-option"
                      >
                        <span className="flex items-center justify-between">
                          {fields(item)}
                          <Check
                            size={20}
                            className={`${
                              item === selectedEnscLang ? "visible" : "hidden"
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
        )}
        <Link
          className="button
                bg-gray-900 
                text-gray-200 
                hover:bg-gray-800
                dark:hover:bg-gray-700"
          href={"/data/filtered?" + filteredRoute}
        >
          {/* {general("search")} */} filter
        </Link>
      </div>
    </form>
  );
};

export default DataAdditionalFilters;
