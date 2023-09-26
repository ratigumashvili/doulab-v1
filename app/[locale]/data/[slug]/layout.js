import { getData } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const personQuery = `
  query person {
    person(locales: ${params.locale}, where: {slug: "${params.slug}"}) {
        name
        surname
        dob
        dod
        }
    }
  `;

  const { person } = await getData(personQuery);

  return {
    title: `${person?.name} ${person?.surname}, ${person?.dob}-${person?.dod}`,
  };
}

const PersonLayout = ({ children }) => {
  return <>{children}</>;
};

export default PersonLayout;
