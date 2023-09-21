import { getData } from "@/lib/utils";
import Link from "next/link";
import PublicationSearchForm from "../../components/PublicationSearchForm";
import PublicationSearchParams from "../../components/PublicationSearchParams";

import { useTranslations } from "next-intl";

import PublicationList from "../../components/PublicationList";
import NothingFound from "../../components/NothingFound";

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
  query publicationsByParams {
    publications(locales: ${params?.locale}, orderBy: ${
    query?.sortBy
  }, where: { 
      OR: [
        ${query?.author && `{ author_contains_some: "${query?.author}" },`}
        ${
          query?.datePublished && `{ published_in: "${query?.datePublished}" },`
        }
        ${query?.title && `{title_contains: "${query?.title}"}`}  
        ] 
      }) {
      id
      title
      author
      published
      slug
    }
  }
`;

  const filteredPublications = await getData(queryPublicationsByParams);

  return (
    <>
      <PageTitle />

      <PublicationSearchForm />

      {query && <PublicationSearchParams query={query} />}

      {data === undefined &&
        filteredPublications?.publications?.length === 0 && <NothingFound />}

      {data && <PublicationList data={data} />}

      {filteredPublications && (
        <PublicationList data={filteredPublications?.publications} />
      )}
    </>
  );
};

export default FilteredArticles;
