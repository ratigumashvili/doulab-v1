import { getData } from "@/lib/utils";

const Filtered = async ({ searchParams: query, params }) => {
  const queryParams = `
    query people {
      people (locales: ${params.locale}, first: 100, where: {
        OR: [
          {name_contains: "${query?.name}"},
          {patronym_contains: "${query?.patronym}"},
          {surname_contains: "${query?.surname}"},
          {age_in: "${query?.age}"},
          # {gender: ${query?.gender} },
          {dob_in: "${query?.dob}"},
          {dod_in: "${query?.dod}"},
          {burrial: {place: {name_contains: "${query?.place}"}}},
          # {burrial: {burrialType: ${query?.type}}},
          # {enscriptionLang_contains_some: Russian},
          {section_contains: "${query?.section}"},
          {graveNumber_contains: "${query?.graveNumber}"},
        ]
      }) {
        id
        name
        patronym
        surname
        age
        dob
        dod
      }
    }
  `;

  const data = await getData(queryParams);

  return (
    <>
      <h2 className="text-lg font-bold">QUERY:</h2>
      <pre>{JSON.stringify(query, null, 2)}</pre>

      <h2 className="text-lg font-bold">DATA:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Filtered;
