"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Tab } from "@headlessui/react";

import DataSearchForm from "../../DataSearchForm";
import Map from "./map";

const DataPage = ({ burials, enscriptionLanguages, mapData }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const fields = useTranslations("Data");
  const note = useTranslations("General");
  const pageTitle = useTranslations("Navigation");

  return (
    <div>
      <h2 className="font-bold text-[1.5em] leading-[1.3333333] mb-[1em]">
        {pageTitle("data")}
      </h2>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-2 rounded-[0.25rem] bg-gray-200 dark:bg-gray-900 shadow-md p-2 mb-8">
          <Tab
            className={`${
              selectedIndex === 0 ? "active_tab" : "font-normal"
            } p-3`}
          >
            {fields("advanced_search")}
          </Tab>
          <Tab
            className={`${
              selectedIndex === 1 ? "active_tab" : "font-normal"
            } p-3`}
          >
            {fields("map")}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <DataSearchForm
              burials={burials}
              enscriptionLanguages={enscriptionLanguages}
            />
          </Tab.Panel>
          <Tab.Panel>
            <Map data={mapData} />
            <p className="my-4 text-sm text-gray-600">{note("mapNote")}</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default DataPage;
