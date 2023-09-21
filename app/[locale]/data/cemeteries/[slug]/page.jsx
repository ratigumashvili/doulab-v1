import SingleBurial from "@/app/[locale]/components/pages/data/SingleBurial";
import { getData } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";

const TranslateNextBtn = () => {
  const general = useTranslations("General");
  return general("next");
};

const TranslatePrevBtn = () => {
  const general = useTranslations("General");
  return general("previous");
};

const Cemetery = async ({ params, searchParams }) => {
  const pageSize = 10;

  const singleBurialData = `
    query people {
      peopleConnection(
        locales: ${params.locale}, 
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
        
        where: {burrial: {slug_contains: "${params.slug}"}}) {
        edges {
          cursor
          node {
            id
            name
            patronym
            surname
            age
            dob
            dod
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

  const singleBurialMeta = `
     query burial {
      burrial(locales: ${params.locale}, where: {slug: "${params.slug}"}) {
        place {
          name
        }
        title
        burrialType
        description
        slug
      }
    }
  `;

  const { peopleConnection } = await getData(singleBurialData);
  const { burrial } = await getData(singleBurialMeta);

  const firstElement = peopleConnection?.pageInfo?.startCursor;
  const lastElement = peopleConnection?.pageInfo?.endCursor;
  const hasNext = peopleConnection?.pageInfo?.hasNextPage;
  const hasPreviouse = peopleConnection?.pageInfo?.hasPreviousPage;

  return (
    <section>
      <SingleBurial meta={burrial} singleBurial={peopleConnection} />
      <div className="flex gap-2">
        {hasPreviouse && (
          <Link
            className="p-3 mt-4 block border shadow-md border-gray-200 dark:border-gray-800 rounded-[0.25rem] hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 transition-all"
            href={`?before=${firstElement}`}
            scroll={false}
          >
            <TranslatePrevBtn />
          </Link>
        )}
        {hasNext && (
          <Link
            className="p-3 mt-4 block border shadow-md border-gray-200 dark:border-gray-800 rounded-[0.25rem] hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 transition-all"
            href={`?after=${lastElement}`}
            scroll={false}
          >
            <TranslateNextBtn />
          </Link>
        )}
      </div>
    </section>
  );
};

export default Cemetery;
