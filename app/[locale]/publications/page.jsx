import { getData } from "@/lib/utils";
import FilteredArticles from "./filtered/page";

const Publications = async ({ params }) => {
  const allPublicationsQuery = `
    query allPublications {
      publications (locales: ${params.locale}) {
        id
        title
        author
        published
        slug
      }
    }
  `;

  const data = await getData(allPublicationsQuery);

  return <FilteredArticles data={data?.publications} />;
};

export default Publications;
