import { getData } from "@/lib/utils";

import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import TableBody from "../../components/TableBody";

const Filtered = async ({ searchParams: query, params }) => {
  const pageSize = 10;

  const singleBurialData = `
   query myQuery {
      peopleConnection(
        locales: ka
        ${query?.after ? `after: "${query?.after}", first: ${pageSize}` : ""},
        ${query?.before ? `before: "${query?.before}", last: ${pageSize}` : ""}
        where: {OR: [
            {name_contains: "${query?.name}"},
            {patronym_contains: "${query?.patronym}"},
            {surname_contains: "${query?.surname}"},
            {age_in: "${query?.age}"},
            {dob_in: "${query?.dob}"},
            {dod_in: "${query?.dod}"},
            {burrial: {place: {name_contains: "${query?.place}"}}},
            {burrial: {title_contains: "${query?.cemetery_title}"}}
            {section_contains: "${query?.section}"},
            {graveNumber_contains: "${query?.graveNumber}"},
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
      {/* <h2 className="text-lg font-bold">QUERY:</h2>
      <pre>{JSON.stringify(query, null, 2)}</pre>

      <h2 className="text-lg font-bold">DATA:</h2>
      <pre>{JSON.stringify(peopleConnection, null, 2)}</pre> */}
      <pre>{JSON.stringify(query, null, 2)}</pre>
      <h2>search params: </h2>

      <div className="w-full overflow-x-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <Table>
          <TableBody records={peopleConnection?.edges} />
        </Table>
      </div>

      <Pagination query={query} data={peopleConnection} path="/data/filtered" />
    </>
  );
};

export default Filtered;
