import axios from "axios";
export const countryApi = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

// export const getCountryData = async () => {
//   try {
//     const { data } = await countryApi.get(`/all`);
//     const contries: Country[] = data.map((country: any) => ({
//       name: { common: country.name.common },
//       capital: country.capital,
//       translations: { kor: { official: country.name.official } },
//       flags: { png: country.flags.png },
//     }));
//     return contries;
//   } catch (error) {
//     console.error("Error fetching country data:", error);
//     return null;
//   }
// };
