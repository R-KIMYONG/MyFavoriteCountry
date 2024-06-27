import { supabase } from "../service/supabase";
import { Country, Newcountrytype } from "../types/country.type";
import { countryApi } from "./countryApi";
import { nanoid } from "nanoid";
// export const setCountries = async (): Promise<void> => {
//   try {
//     const { data: countryies } = await countryApi.get<Country[]>("/all");

//     const selectData = countryies.map((country: Country) => ({
//       id: nanoid(),
//       name: { common: country.name.common },
//       capital: country.capital,
//       translations: {
//         kor: { official: country.translations.kor.official },
//         est: { official: country.translations.est.official },
//       },
//       flags: country.flags.png,
//       like: false,
//     }));
//     const { data, error } = await supabase
//       .from("mycountries")
//       .upsert(selectData, { onConflict: "name" });

//     if (error) {
//       throw error;
//     }
//     return data;
//   } catch (error) {
//     console.error("Error adding supabase table:", error);
//   }
// };
