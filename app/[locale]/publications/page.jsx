import { getData } from "@/lib/utils";
import Pagination from "../components/Pagination";
import FilteredArticles from "./filtered/page";

const pageSize = 10;

const Publications = async ({ params, searchParams }) => {
  const allPublicationsQuery = `
   query pubs {
      publicationsConnection(
        locales: ${params.locale}
        after: ${
          searchParams.after
            ? `"${searchParams.after}" first: ${pageSize}`
            : null
        },
        before: ${
          searchParams.before
            ? `"${searchParams.before}" last: ${pageSize}`
            : null
        }, 
      ) {
        edges {
          cursor
          node {
            id
            author
            title
            text
            slug
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `;

  const { publicationsConnection } = await getData(allPublicationsQuery);

  return (
    <>
      <FilteredArticles data={publicationsConnection} />
      <Pagination data={publicationsConnection} />
    </>
  );
};

export default Publications;
