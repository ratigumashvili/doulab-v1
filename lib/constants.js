export const LOCALES = [
  { id: 1, locale: "ka", title: "ქართული" },
  { id: 2, locale: "en", title: "English" },
];

export const GENDERS = [
  { id: 0, value: null },
  { id: 1, value: "man" },
  { id: 2, value: "female" },
  { id: 3, value: "un" },
];

export const INITIAL_FORM_STATE = {
  country: "",
  place: "",
  cemetery_title: "",
  type: "",
  section: "",
  grave_number: "",
  name: "",
  patronym: "",
  surname: "",
  gender: "",
  age: "",
  dob: "",
  dod: "",
  // enscription_lang: null,
};

export const ADDITIONAL_FILTERS = {
  type: "cemetery",
  gender: "man",
  enscription_lang: "Russian",
};

const MAP_OPTIONS = {
  center: [34.00396212979572, 53.933067029928694],
  zoom: 5,
  scroll: true,
  height: "100%",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attributionDark:
    '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  urlDark:
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}",
};

export const {
  center,
  zoom,
  scroll,
  height,
  attribution,
  attributionDark,
  url,
  urlDark,
} = MAP_OPTIONS;

export const PUBLICATIONS_SORT_OPTIONS = [
  { id: 1, value: "published_ASC" },
  { id: 2, value: "published_DESC" },
  { id: 3, value: "title_ASC" },
  { id: 4, value: "title_DESC" },
];

export const PUBLICATION_FORM = {
  author: "",
  title: "",
  datePublished: "",
  sort_by: "date_ASC",
};
