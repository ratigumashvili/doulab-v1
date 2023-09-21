import { getData } from "@/lib/utils";

import PersonPage from "../../components/pages/data/PersonPage";

const Person = async ({ params }) => {
  const personQuery = `
  query person {
    person(locales: ${params.locale}, where: {slug: "${params.slug}"}) {
        id
        name
        patronym
        surname
        age
        gender
        dob
        dod
        bio
        burrial {
            title
            burrialType
            coordinates {
                latitude
                longitude
            }
        }
        graveNumber
        section
        notes
        enscription
        enscriptionLang
        }
    }
  `;

  const queryGraveImages = `
  query graveImages {
    person(locales: ka, where: {slug: "${params.slug}"}) {
      graveImage {
        id
        width
        height
        url
      }
    }
  }
  `;

  const { person } = await getData(personQuery);
  const { person: images } = await getData(queryGraveImages);

  return <PersonPage data={person} images={images} />;
};

export default Person;
