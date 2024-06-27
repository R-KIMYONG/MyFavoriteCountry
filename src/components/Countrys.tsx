import { useEffect, useState } from "react";
import { Country, newCountryType } from "../types/country.type";
import CountryList from "./CountryList";
import { countryApi } from "../api/countryApi";
import { nanoid } from "nanoid";

const Countrys: React.FC = () => {
  const [countries, setCountries] = useState<newCountryType[]>([]);
  const [isPending, setIspending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountryData = async (): Promise<void> => {
      try {
        setIspending(true);
        const { data } = await countryApi.get("/all");
        const selectData: newCountryType[] = data.map((country: Country) => ({
          id: nanoid(),
          name: country.name.common,
          capital: country.capital,
          translations: {
            kor: { official: country.translations.kor.official },
            est: { official: country.translations.est.official },
          },
          flags: { png: country.flags.png },
          like: false,
        }));

        setCountries(selectData);
      } catch (error) {
        setIsError(true);
      } finally {
        setIspending(false);
      }
    };
    fetchCountryData();
  }, []);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error fetching country data</div>;
  return (
    <>
      <div className="p-10">
        <h1 className="text-center mb-5 text-2xl font-light">
          Favorite Countries
        </h1>
        <CountryList
          countries={countries}
          isLike={true}
          setCountries={setCountries}
        />
        <h1 className="text-center mb-5 text-4xl font-black">Countries</h1>{" "}
        <CountryList
          countries={countries}
          isLike={false}
          setCountries={setCountries}
        />
      </div>
    </>
  );
};

export default Countrys;
