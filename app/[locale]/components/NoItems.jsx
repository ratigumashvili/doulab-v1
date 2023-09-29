import { useTranslations } from "next-intl";

const NoItems = () => {
  const translate = useTranslations("General");

  return <h2 className="my-8 text-lg mx-auto">{translate("no_items")}</h2>;
};

export default NoItems;
