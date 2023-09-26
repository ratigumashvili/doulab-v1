import { getData } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const singleBurialMeta = `
     query burial {
      burrial(locales: ${params.locale}, where: {slug: "${params.slug}"}) {
        place {
          name
        }
        title
      }
    }
  `;

  const { burrial } = await getData(singleBurialMeta);

  return {
    title: burrial?.place?.name + ", " + burrial?.title,
  };
}

const CemeteryLayout = ({ children }) => {
  return <>{children}</>;
};

export default CemeteryLayout;
