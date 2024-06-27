export interface Props {
  countries: Newcountrytype[];
  isLike: boolean;
  setCountries: (cb: (prev: Newcountrytype[]) => Newcountrytype[]) => void;
}

export type Country = {
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  region: string;
  startOfWeek: string;
  status: string;
  subregion: string;
  fifa: string;
  flag: string;
  altSpellings: string[];
  area: number;
  population: number;
  latlng: number[];
  capital: string[];
  capitalInfo: { [keys: string]: number[] };
  car: { [keys: string]: string[] | string };
  coatOfArms: { [keys: string]: string };
  continents: [string];
  currencies: { [keys: string]: { [keys: string]: string } };
  demonyms: { [keys: string]: { f: string; m: string } };
  flags: { [keys: string]: string };
  gini: { [keys: number]: number };
  idd: { [keys: string]: string | [string] };
  independent: boolean;
  landlocked: boolean;
  languages: { [keys: string]: string };
  maps: { [keys: string]: string };
  name: {
    [keys: string]: string | { [keys: string]: string };
  };
  postalCode: { [keys: string]: string };
  timezones: [string];
  tld: [string];
  translations: {
    [keys: string]: { [keys: string]: string };
  };
  unMember: boolean;
};

export type Newcountrytype = Country & {
  like: boolean;
  id: string;
};
