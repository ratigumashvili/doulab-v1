export const getData = async (queryParams) => {
  try {
    const response = await fetch(process.env.HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify({
        query: `${queryParams}`,
      }),
    });
    const json = await response.json();
    return json.data;
  } catch (error) {
    throw "Something went wrong, please try again later!";
  }
};
