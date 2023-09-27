"use client";

import { useEffect, useState, Fragment } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Listbox, Transition } from "@headlessui/react";

import { useTranslations } from "next-intl";

import { Check, ChevronDown } from "lucide-react";

import { preventMinus } from "@/lib/helpers";

import { INITIAL_FORM_STATE, GENDERS } from "@/lib/constants";

import HelpPopover from "./HelpPopover";

const DataSearchForm = ({ burials, enscriptionLanguages }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const [disabled, setDisabled] = useState(true);

  const [selectedType, setSelectedType] = useState(burials[0]);
  const [selectedGender, setSelectedGender] = useState(GENDERS[0]);
  const [selectedEnscLang, setSelectedEnscLang] = useState(
    enscriptionLanguages[0]
  );

  const router = useRouter();

  const {
    name,
    patronym,
    surname,
    gender,
    age,
    dob,
    dod,
    country,
    place,
    cemetery_title,
    type,
    section,
    grave_number,
    enscription_lang,
  } = formData;

  const filteredRoute = `${name && `&name=${name}`}${
    patronym && `&patronym=${patronym}`
  }${surname && `&surname=${surname}`}${age && `&age=${age}`}${
    dob && `&dob=${dob}`
  }${dod && `&dod=${dod}`}${place && `&place=${place}`}${
    cemetery_title && `&cemetery_title=${cemetery_title}`
  }${grave_number && `&graveNumber=${grave_number}`}${
    section && `&section=${section}`
  }${country && `&country=${country}`}${gender && `&gender=${gender}`}${
    type && `&type=${type}`
  }${enscription_lang && `&enscriptionLang=${enscription_lang}`}`;

  const allInputs = Object.entries(formData).map(
    ([key, entry]) => entry?.length !== 0
  );

  useEffect(() => {
    allInputs.includes(true) ? setDisabled(false) : setDisabled(true);
  }, [allInputs]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      gender: selectedGender?.value,
    }));
  }, [selectedGender]);

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, type: selectedType }));
  }, [selectedType]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      enscription_lang: selectedEnscLang,
    }));
  }, [selectedEnscLang]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleKeyPress = ({ key }) => {
    if (key === "Enter") {
      router.push("/data/filtered?" + filteredRoute);
    }
  };

  const fields = useTranslations("Data");
  const general = useTranslations("General");

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} onKeyDown={handleKeyPress}>
        <div className="md:grid md:grid-cols-4 md:gap-4">
          <div className="space-y-2">
            <div className="flex gap-2 items-center flex-nowrap">
              <label htmlFor="country">{fields("country")}</label>
            </div>
            <input
              onChange={handleInputChange}
              value={country}
              type="text"
              name="country"
              id="country"
              className="form-input"
            />
          </div>
          <div className="space-y-2">
            <div className="flex gap-2 items-center flex-nowrap">
              <label htmlFor="place">{fields("place")}</label>
              <HelpPopover text={fields("place_note")} />
            </div>
            <input
              onChange={handleInputChange}
              value={place}
              type="text"
              name="place"
              id="place"
              className="form-input"
            />
          </div>
          <div className="space-y-2">
            <div className="flex gap-2 items-center flex-nowrap">
              <label htmlFor="cemetery_title">{fields("title")}</label>{" "}
              <HelpPopover text={fields("title_note")} />
            </div>
            <input
              onChange={handleInputChange}
              value={cemetery_title}
              type="text"
              name="cemetery_title"
              id="cemetery_title"
              className="form-input"
            />
          </div>

          <div>
            <Listbox
              value={selectedType}
              onChange={setSelectedType}
              className="space-y-2"
            >
              <div className="relative">
                <Listbox.Label>{fields("type")}</Listbox.Label>
                <Listbox.Button className="form-select">
                  {selectedType}
                  <ChevronDown size={20} className="ml-auto" />
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
                          {item !== "" && fields(item)}
                          <Check
                            size={20}
                            className={`${
                              item === selectedType && item !== ""
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

          <div className="space-y-2">
            <label htmlFor="section">{fields("section")}</label>
            <input
              onChange={handleInputChange}
              value={section}
              type="text"
              name="section"
              id="section"
              className="form-input"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="grave_number">{fields("grave_number")}</label>
            <input
              onChange={handleInputChange}
              value={grave_number}
              type="text"
              name="grave_number"
              id="grave_number"
              className="form-input"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="name">{fields("name")}</label>
            <input
              onChange={handleInputChange}
              value={name}
              type="text"
              name="name"
              id="name"
              className="form-input"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="patronym">{fields("patronym")}</label>
            <input
              onChange={handleInputChange}
              value={patronym}
              type="text"
              name="patronym"
              id="patronym"
              className="form-input"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="surname">{fields("surname")}</label>
            <input
              onChange={handleInputChange}
              value={surname}
              type="text"
              name="surname"
              id="surname"
              className="form-input"
            />
          </div>
          <div className="space-y-2">
            <Listbox
              value={selectedGender}
              onChange={setSelectedGender}
              className="space-y-2"
            >
              <div className="relative">
                <Listbox.Label>{fields("gender")}</Listbox.Label>
                <Listbox.Button className="form-select">
                  {selectedGender?.value !== "" &&
                    fields(selectedGender?.value)}
                  <ChevronDown size={20} className="ml-auto" />
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
                        value={item !== "" && item}
                        className="form-option"
                      >
                        <span className="flex items-center justify-between">
                          {item.value !== "" && fields(item.value)}
                          <Check
                            size={20}
                            className={`${
                              item.value === selectedGender?.value &&
                              item.value !== ""
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
          <div className="space-y-2">
            <label htmlFor="age">{fields("age")}</label>
            <input
              onChange={handleInputChange}
              onKeyPress={preventMinus}
              value={age}
              type="number"
              name="age"
              id="age"
              min={0}
              className="form-input"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="dob">{fields("dob")}</label>
            <input
              onChange={handleInputChange}
              onKeyPress={preventMinus}
              value={dob}
              type="number"
              name="dob"
              id="dob"
              min={0}
              className="form-input"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="dod">
              <div className="w-full truncate ...">{fields("dod")}</div>
            </label>
            <input
              onChange={handleInputChange}
              onKeyPress={preventMinus}
              value={dod}
              type="number"
              name="dod"
              id="dod"
              min={0}
              className="form-input"
            />
          </div>
          <div className="space-y-2">
            <Listbox
              value={selectedEnscLang}
              onChange={setSelectedEnscLang}
              className="space-y-2"
            >
              <div className="relative">
                <Listbox.Label>{fields("enscription_lang")}</Listbox.Label>
                <Listbox.Button className="form-select">
                  {selectedEnscLang !== "" && fields(selectedEnscLang)}
                  <ChevronDown size={20} className="ml-auto" />
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
                          {item !== "" && fields(item)}
                          <Check
                            size={20}
                            className={`${
                              item === selectedType && item !== ""
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
          <div className="flex gap-2 my-8 justify-end">
            <Link
              className={`
                button
                bg-gray-900 
                text-gray-200 
                hover:bg-gray-800
                dark:hover:bg-gray-700
                ${
                  disabled &&
                  " pointer-events-none opacity-60 cursor-not-allowed"
                }
              `}
              href={"/data/filtered?" + filteredRoute}
            >
              {general("search")}
            </Link>
            <button
              disabled={disabled}
              type="button"
              className={`
             button 
              bg-red-900 
              text-gray-200 
              hover:bg-red-800
              ${
                disabled && " pointer-events-none opacity-60 cursor-not-allowed"
              }
              `}
              onClick={() => setFormData(INITIAL_FORM_STATE)}
            >
              {general("reset")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default DataSearchForm;
