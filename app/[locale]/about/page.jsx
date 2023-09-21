import { useLocale } from "next-intl";

import { getData } from "@/lib/utils";

import AboutPage from "../components/pages/about/AboutPage";

const About = async () => {
  const locale = useLocale();

  const queryParams = `
  query aboutPage {
    page(where: {slug: "about-the-project"}, locales: ${locale}) {
      title
      text
      }
    }
  `;

  const data = await getData(queryParams);

  return (
    <section>
      <AboutPage data={data} />
    </section>
  );
};

export default About;
