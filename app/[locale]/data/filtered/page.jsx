import { getData } from "@/lib/utils";
import NothingFound from "../../components/NothingFound";

import Pagination from "../../components/Pagination";
import SearchParameters from "../../components/SearchParameters";
import Table from "../../components/Table";
import TableBody from "../../components/TableBody";

const Filtered = async ({ searchParams: query, params }) => {
  const pageSize = 10;

  console.log(query?.gender);

  const singleBurialData = `
   query myQuery {
      peopleConnection(
        locales: ka
        ${query?.after ? `after: "${query?.after}", first: ${pageSize}` : ""},
        ${query?.before ? `before: "${query?.before}", last: ${pageSize}` : ""}
        where: {OR: [
            ${query?.name ? `{name_contains: "${query?.name}"},` : ""}
            ${
              query?.patronym
                ? `{patronym_contains: "${query?.patronym}"},`
                : ""
            }
            ${query?.surname ? `{surname_contains: "${query?.surname}"},` : ""}
            ${query?.age ? `{age_contains: "${query?.age}"},` : ""}
            ${query?.dob ? `{dob_contains: "${query?.dob}"},` : ""}
            ${query?.dod ? `{dod_contains: "${query?.dod}"},` : ""}
            ${
              query?.country
                ? `{burrial: {country: {title_contains: "${query?.country}"}}},`
                : ""
            }
            ${
              query?.place
                ? `{burrial: {place: {name_contains: "${query?.place}"}}},`
                : ""
            }
            ${
              query?.cemetery_title
                ? `{burrial: {title_contains: "${query?.cemetery_title}"}},`
                : ""
            }
            ${query?.section ? `{section_contains: "${query?.section}"},` : ""}
            ${
              query?.graveNumber
                ? `{graveNumber_contains: "${query?.graveNumber}"},`
                : ""
            }
            ${
              query?.gender
                ? `{gender_in: ${query?.gender}},`
                : `{gender_in: []},`
            }
            ${
              query?.type
                ? ` {burrial: {burrialType_in: ${query?.type}}},`
                : ` {burrial: {burrialType_in: []}},`
            }
            ${
              query?.enscriptionLang
                ? `{enscriptionLang_contains_some: ${query?.enscriptionLang}},`
                : `{enscriptionLang_contains_some: []},`
            }
          ]}
      ) {
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

  const { peopleConnection } = await getData(singleBurialData);

  return (
    <>
      {/* <pre>{JSON.stringify(peopleConnection, null, 2)}</pre> */}
      <SearchParameters query={query} redirect="/data" />

      {peopleConnection.edges.length === 0 && <NothingFound />}

      {peopleConnection.edges.length !== 0 && (
        <div className="w-full overflow-x-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
          <Table>
            <TableBody records={peopleConnection?.edges} />
          </Table>
        </div>
      )}

      <Pagination query={query} data={peopleConnection} path="/data/filtered" />
    </>
  );
};

export default Filtered;
