import { useEffect, useState } from "react";
import { Newcountrytype } from "../types/country.type";
import CountryList from "./CountryList";
import { countryApi } from "../api/countryApi";
import { nanoid } from "nanoid";
import { AxiosError } from "axios";

const Countrys: React.FC = () => {
  const [countries, setCountries] = useState<Newcountrytype[]>([]);
  const [isPending, setIspending] = useState<boolean>(false);
  const [isError, setIsError] = useState<null | AxiosError>(null);

  useEffect(() => {
    const fetchCountryData = async (): Promise<void> => {
      try {
        setIspending(true);
        const { data } = await countryApi.get<Newcountrytype[]>("/all");
        const selectData = data.map((item) => ({
          ...item,
          id: nanoid(),
          like: false,
        }));

        setCountries(selectData);
      } catch (error) {
        if (error instanceof AxiosError) {
          setIsError(error);
        }
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
