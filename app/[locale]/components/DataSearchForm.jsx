"use client";

import { useEffect, useState, Fragment } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Listbox, Transition } from "@headlessui/react";

import { useTranslations } from "next-intl";

import { Check, ChevronDown } from "lucide-react";

import { preventMinus } from "@/lib/helpers";

import { INITIAL_FORM_STATE, GENDERS } from "@/lib/constants";

const DataSearchForm = ({ burials, enscriptionLanguages }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const [disabled, setDisabled] = useState(true);

  // const [selectedType, setSelectedType] = useState(burials[0]);
  // const [selectedGender, setSelectedGender] = useState(GENDERS[0]);
  // const [selectedEnscLang, setSelectedEnscLang] = useState(
  //   enscriptionLanguages[0]
  // );

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
    place,
    type,
    section,
    grave_number,
    enscription_lang,
  } = formData;

  // const filteredRoute = `name=${name}&patronym=${patronym}&surname=${surname}&gender=${gender}&age=${age}&dob=${dob}&dod=&${dod}&place=${place}&type=${type}&section=${section}&grave_number=${grave_number}&enscription_lang=${enscription_lang}`;

  // const filteredRoute = `${name && `&name=${name}`}${
  //   patronym && `&patronym=${patronym}`
  // }${surname && `&surname=${surname}`}${age && `&age=${age}`}${
  //   dob && `&dob=${dob}`
  // }${dod && `&dod=${dod}`}${place && `&place=${place}`}${
  //   grave_number && `&graveNumber=${grave_number}`
  // }${section && `&section=${section}`}${
  //   gender !== null ? `&gender=${gender}` : ""
  // }${type !== null ? `&type=${type}` : ""}${
  //   enscription_lang !== null ? `&enscription=${enscription_lang}` : ""
  // }`;

  const filteredRoute = `${name && `&name=${name}`}${
    patronym && `&patronym=${patronym}`
  }${surname && `&surname=${surname}`}${age && `&age=${age}`}${
    dob && `&dob=${dob}`
  }${dod && `&dod=${dod}`}${place && `&place=${place}`}${
    grave_number && `&graveNumber=${grave_number}`
  }${section && `&section=${section}`}`;

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

  // useEffect(() => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     enscription_lang: selectedEnscLang,
  //   }));
  // }, [selectedEnscLang]);

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
      {JSON.stringify(formData, null, 2)}
      <form onSubmit={(e) => e.preventDefault()} onKeyDown={handleKeyPress}>
        <div className="md:grid md:grid-cols-4 md:gap-4">
          <div className="space-y-2">
            <label htmlFor="place">{fields("place")}</label>
            <input
              onChange={handleInputChange}
              value={place}
              type="text"
              name="place"
              id="place"
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
                  {selectedType === null ? "null" : fields(selectedType)}{" "}
                  <ChevronDown size={20} />
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
                          {item === null ? "null" : fields(item)}
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
                  {selectedGender.value === null
                    ? "null"
                    : fields(selectedGender?.value)}{" "}
                  <ChevronDown size={20} />
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
                          {item.value === null ? "null" : fields(item.value)}
                          <Check
                            size={20}
                            className={`${
                              item.value === selectedGender?.value
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
            <label htmlFor="dod">{fields("dod")}</label>
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
            {/* <Listbox
              value={selectedEnscLang}
              onChange={setSelectedEnscLang}
              className="space-y-2"
            >
              <div className="relative">
                <Listbox.Label>{fields("enscription_lang")}</Listbox.Label>
                <Listbox.Button className="form-select">
                  {selectedEnscLang === null
                    ? "null"
                    : fields(selectedEnscLang)}{" "}
                  <ChevronDown size={20} />
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
                          {item === null ? "null" : fields(item)}
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
            </Listbox> */}
            <label htmlFor="enscription_lang">
              {fields("enscription_lang")}
            </label>
            <select
              name="enscription_lang"
              id="enscription_lang"
              className="form-input"
              onChange={handleInputChange}
            >
              {enscriptionLanguages?.map((item, idx) => (
                <option key={idx} value={item === null ? "" : item}>
                  {item === null ? "null" : fields(item)}
                </option>
              ))}
            </select>
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

        {/* <div className="flex gap-2 my-8 justify-end">
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
        </div> */}
      </form>
    </>
  );
};

export default DataSearchForm;
