import { getData } from "@/lib/utils";

import AboutPage from "../components/pages/about/AboutPage";

const About = async ({ params }) => {
  const queryParams = `
  query aboutPage {
    page(where: {slug: "about-the-project"}, locales: ${params.locale}) {
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
