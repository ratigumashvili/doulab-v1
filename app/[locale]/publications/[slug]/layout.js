import { getData } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const singlePublicationQuery = `
    query singlePublicationQuery {
        publication( locales: ${params.locale},
            where: {slug: "${params.slug}"}
        ) {
            title
            author
            }
        }
    `;

  const { publication } = await getData(singlePublicationQuery);

  return {
    title: publication.author + ", " + publication.title,
  };
}

const PublicationsLayout = ({ children }) => {
  return <>{children}</>;
};

export default PublicationsLayout;
