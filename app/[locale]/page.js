import { getData } from "@/lib/utils";
import HomePage from "./components/pages/home/HomePage";

const Home = async ({ params }) => {
  const queryParams = `
    query aboutPage {
    page(where: {slug: "main-page"}, locales: ${params.locale}) {
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
