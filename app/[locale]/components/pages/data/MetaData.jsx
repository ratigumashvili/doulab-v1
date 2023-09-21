import { forwardRef } from "react";

import { useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";

import { separate, locationHref, dateOutput } from "@/lib/helpers";

const MetaData = forwardRef(
  (
    {
      name,
      patronym,
      surname,
      gender,
      age,
      dob,
      dod,
      bio,
      section,
      graveNumber,
      enscription,
      enscriptionLang,
      notes,
    },
    ref
  ) => {
    const fields = useTranslations("Data");
    const translate = useTranslations("General");
    return (
      <div ref={ref} className="print:p-8">
        <dl className="md:grid md:grid-cols-2 gap-4 meta">
          <dd className="font-bold">{fields("name")}</dd>
          <dt>{name}</dt>
          <dd className="font-bold">{fields("patronym")}</dd>
          <dt>{patronym}</dt>
          <dd className="font-bold">{fields("surname")}</dd>
          <dt>{surname}</dt>
          <dd className="font-bold">{fields("gender")}</dd>
          <dt>{fields(gender)}</dt>
          <dd className="font-bold">{fields("age")}</dd>
          <dt>{age}</dt>
          <dd className="font-bold">{fields("dob")}</dd>
          <dt>{dob}</dt>
          <dd className="font-bold">{fields("dod")}</dd>
          <dt>{dod}</dt>
          <dd className="font-bold">{fields("bio_notes")}</dd>
          <dt>{bio}</dt>
          <dd className="font-bold">{fields("section")}</dd>
          <dt>{section}</dt>
          <dd className="font-bold">{fields("grave_number")}</dd>
          <dt>{graveNumber}</dt>
          <dd className="font-bold">{fields("enscription")}</dd>
          <dt>
            <ReactMarkdown>{enscription}</ReactMarkdown>
          </dt>
          <dd className="font-bold">{fields("enscription_lang")}</dd>
          <dt>
            {enscriptionLang?.map((language, i) => (
              <span key={language}>
                {fields(language)}
                {separate(enscriptionLang, i)}
              </span>
            ))}
          </dt>
          <dd className="font-bold">{fields("note")}</dd>
          <dt>{notes}</dt>
        </dl>
        <div className="hidden my-8 text-gray-500 print:flex print:flex-col print:gap-2">
          <p>
            {translate("url")}: {locationHref()}
          </p>
          <p>
            &copy; {dateOutput} {translate("copyright")},{" "}
            {translate("institute")}
          </p>
        </div>
      </div>
    );
  }
);

export default MetaData;
