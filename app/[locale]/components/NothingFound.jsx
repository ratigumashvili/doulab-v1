import { useTranslations } from "next-intl";

const NothingFound = () => {
  const translate = useTranslations("General");
  return <h2 className="my-8 text-lg mx-auto">{translate("nothing_found")}</h2>;
};

export default NothingFound;
