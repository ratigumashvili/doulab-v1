import { useLocale } from "next-intl";

import { getData } from "@/lib/utils";

import DataPage from "../components/pages/data/DataPage";

const Data = async () => {
  const locale = useLocale();

  const burialTypesQuery = `
    query burialTypesQuery {
      burrials(locales: ${locale}) {
        burrialType
      }
    }
  `;

  const enscriptionLangsQuery = `
    query enscriptionLangs {
      people(locales: ${locale}) {
        enscriptionLang
      }
    }
  `;

  const mapData = `
    query mapData {
      burrials(locales: ${locale}) {
        country {
          title
        }
        place {
          name
        }
        id
        title
        burrialType
        coordinates {
          longitude
          latitude
        }
        slug
        people {
          id
        }
      }
    }
  `;

  const burialTypes = await getData(burialTypesQuery);

  const typesSet = new Set();
  burialTypes?.burrials?.map((item) => typesSet.add(item.burrialType));
  const allTypes = Array.from(typesSet);
  allTypes.unshift(null);

  const enscriptionLangs = await getData(enscriptionLangsQuery);

  const langs = enscriptionLangs?.people
    ?.map((ensc) => [null, ...ensc.enscriptionLang])
    .flat(1);

  const languagesSet = new Set();
  langs?.map((lang) => languagesSet.add(lang));
  const allLangs = Array.from(languagesSet);

  const queryMapData = await getData(mapData);

  return (
    <section>
      <DataPage
        burials={allTypes}
        enscriptionLanguages={allLangs}
        mapData={queryMapData}
      />
    </section>
  );
};

export default Data;
