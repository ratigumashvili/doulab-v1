import { getData } from "@/lib/utils";

import SinglePublication from "../../components/SinglePublication";

const Publication = async ({ params }) => {
  const singlePublicationQuery = `
    query singlePublicationQuery {
        publication( locales: ${params.locale},
            where: {slug: "${params.slug}"}
        ) {
            id
            title
            author
            text
            published
        }
    }
`;

  const data = await getData(singlePublicationQuery);

  return <SinglePublication data={data?.publication} />;
};

export default Publication;
