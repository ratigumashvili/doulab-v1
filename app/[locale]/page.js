import { useLocale } from "next-intl";

import { getData } from "@/lib/utils";
import HomePage from "./components/pages/home/HomePage";

const Home = async () => {
  const locale = useLocale();

  const queryParams = `
    query aboutPage {
    page(where: {slug: "main-page"}, locales: ${locale}) {
      title
      text
    }
  }
  `;

  const data = await getData(queryParams);

  return (
    <>
      <HomePage data={data} />
    </>
  );
};

export default Home;
