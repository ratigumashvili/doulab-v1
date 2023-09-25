import SingleBurial from "@/app/[locale]/components/pages/data/SingleBurial";
import Pagination from "@/app/[locale]/components/Pagination";
import { getData } from "@/lib/utils";

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

  return (
    <section>
      <SingleBurial meta={burrial} singleBurial={peopleConnection} />
      <Pagination data={peopleConnection} />
    </section>
  );
};

export default Cemetery;
