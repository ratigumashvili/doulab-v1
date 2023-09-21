import { useLocale, useTranslations } from "next-intl";

import Navbar from "./Navbar";

const Header = () => {
  const navigationItem = useTranslations("Navigation");
  const mainPageTitle = navigationItem("main");

  const locale = useLocale();

  const NAVIGATION = [
    { id: 1, title: navigationItem("about"), path: "/about" },
    { id: 2, title: navigationItem("publications"), path: "/publications" },
    { id: 3, title: navigationItem("data"), path: "/data" },
    { id: 4, title: navigationItem("bookmarked"), path: "/bookmarked" },
  ];

  return (
    <header>
      <Navbar
        items={NAVIGATION}
        mainPageTitle={mainPageTitle}
        locale={locale}
      />
    </header>
  );
};

export default Header;
