import { getData } from "@/lib/utils";
import PublicationSearchForm from "../../components/PublicationSearchForm";
import SearchParameters from "../../components/SearchParameters";

import { useTranslations } from "next-intl";

import PublicationList from "../../components/PublicationList";
import NothingFound from "../../components/NothingFound";
import NoItems from "../../components/NoItems";
import Pagination from "../../components/Pagination";

const pageSize = 10;

const PageTitle = () => {
  const translation = useTranslations("Navigation");
  return (
    <h2 className="font-bold text-[1.5em] leading-[1.3333333] mb-[1em]">
      {translation("publications")}
    </h2>
  );
};

const FilteredArticles = async ({ data, searchParams: query, params }) => {
  const queryPublicationsByParams = `
    query pubs {
      publicationsConnection(
        locales: ${params?.locale}
        after: ${query?.after ? `"${query?.after}" first: ${pageSize}` : null},
        before: ${
          query?.before ? `"${query?.before}" last: ${pageSize}` : null
        }, 
        orderBy: ${query?.sortBy},
        where: { OR: [
        ${query?.author ? `{ author_contains_some: "${query?.author}" },` : ""}
        ${
          query?.datePublished
            ? `{ published_in: "${query?.datePublished}" },`
            : ""
        }
        ${query?.title ? `{title_contains: "${query?.title}"}` : ""}
        ]}
      ) {
        edges {
          cursor
          node {
            id
            author
            title
            text
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

  const response = await getData(queryPublicationsByParams);

  return (
    <>
      <PageTitle />

      <PublicationSearchForm />

      {query && <SearchParameters query={query} redirect="/publications" />}

      {data && <PublicationList data={data} />}

      {response !== null && (
        <PublicationList data={response?.publicationsConnection} />
      )}

      <Pagination data={response?.publicationsConnection} query={query} />

      {data === undefined || (data?.edges?.length === 0 && <NoItems />)}

      {response !== null &&
        response?.publicationsConnection?.edges?.length === 0 && (
          <NothingFound />
        )}
    </>
  );
};

export default FilteredArticles;
