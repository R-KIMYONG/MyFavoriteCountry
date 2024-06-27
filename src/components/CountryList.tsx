import { useRef, useState } from "react";
import { Props, Newcountrytype } from "../types/country.type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { supabase } from "../service/supabase";
const ITEMS_TOTAL_LENGTH: number = 250;
const CountryList = ({ countries, isLike, setCountries }: Props) => {
  const navigate = useNavigate();
  const [sortCountryList, setSortCountryList] = useState<
    "ascending" | "descending"
  >("ascending");
  const [seeMore, setSeeMore] = useState<number>(25);
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchCountry, setSearchCountry] = useState<Newcountrytype[]>([]);

  const handleSearchCountry = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const searchValue: string | undefined = searchRef.current?.value?.trim();
    if (!searchValue) {
      toast.info<string>("검색어를 입력하세요.");
      return;
    }
    if (searchValue) {
      const filteredData = countries.filter((country) =>
        country.translations.kor.official.toLowerCase().includes(searchValue)
      );
      setSearchCountry(filteredData);
    }
  };
  const handleSort = (): void => {
    const newSortOrder =
      sortCountryList === "ascending" ? "descending" : "ascending";
    setSortCountryList(newSortOrder);
  };

  const handleToggleLike = async (country: Newcountrytype): Promise<void> => {
    setCountries((prevData) =>
      prevData.map((item) =>
        item.id === country.id ? { ...item, like: !item.like } : item
      )
    );
    // const newCountry = {
    //   country_Id: country.id,
    //   name: country.name,
    //   capital: country.capital,
    //   translations: country.translations,
    //   flags: country.flags,
    //   like: !country.like,
    // };

    // try {
    //   const { data, error } = await supabase
    //     .from("mycountries")
    //     .insert(newCountry);
    //   if (error) {
    //     console.error("supabase error", error);
    //   } else {
    //     console.log("추가 성공:", data);
    //   }
    // } catch (error) {
    //   console.error("추가 실패:", error);
    // }
  };
  const totalFalseLikes = countries
    .slice(0, seeMore)
    .filter((country: Newcountrytype) => country.like === false).length;
  const totalTrueLikes = countries.filter(
    (country: Newcountrytype) => country.like === true
  ).length;
  return (
    <>
      {isLike ? null : (
        <>
          <span className="mr-4">
            Total: {totalFalseLikes} | Favorite: {totalTrueLikes} | Search:{" "}
            {searchCountry.length}
          </span>
          <button
            className={`text-white font-bold py-1 px-2 rounded mt-4 mr-4
              ${
                seeMore >= ITEMS_TOTAL_LENGTH
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }
            `}
            onClick={() => {
              const newTotal = seeMore + 25;
              setSeeMore(newTotal);
            }}
            disabled={seeMore >= ITEMS_TOTAL_LENGTH}
          >
            더보기
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded mt-4"
            onClick={() => {
              setSeeMore(25);
              setSearchCountry([]);
            }}
          >
            초기화
          </button>
          <div className="flex gap-[10px] flex-wrap mt-4 mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded transition-all"
              onClick={handleSort}
            >
              {sortCountryList === "ascending" ? "내림차순" : "오름차순"}
            </button>
            <form
              className="flex gap-[10px] flex-wrap"
              onSubmit={handleSearchCountry}
            >
              <input
                type="text"
                placeholder="나라명을 입력하세요"
                className=" border pl-2 py-1 rounded"
                maxLength={10}
                ref={searchRef}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded transition-all"
              >
                검색
              </button>
            </form>
          </div>
        </>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {(searchCountry.length > 0 ? searchCountry : countries)
          .filter((country: Newcountrytype) => country.like === isLike)
          .slice(0, seeMore)
          .sort((a: Newcountrytype, b: Newcountrytype) => {
            const countryA = a.translations.kor.official;
            const countryB = b.translations.kor.official;
            if (sortCountryList === "ascending") {
              return countryA.localeCompare(countryB);
            } else {
              return countryB.localeCompare(countryA);
            }
          })
          .map((country: Newcountrytype) => (
            <li
              key={country.id}
              onClick={() => handleToggleLike(country)}
              className="shadow-slate-200 rounded-lg grid grid-row-2 cursor-pointer shadow hover:shadow-lg transition-all box-border min-w-min"
            >
              <div className="mx-auto w-[100px] h-[65px]">
                <img
                  className="w-[100%] h-[100%] block shadow-md rounded-md"
                  src={country.flags.png}
                  alt="national flag"
                />
              </div>

              <div className="mt-4 flex justify-between items-end p-3">
                <div>
                  <p className="font-semibold text-sm sm:text-xm w-[120px] truncate">
                    {country.translations.kor.official}
                  </p>
                  <p className="font-light text-gray-500 text-sm">
                    {country.capital?.[0]}
                  </p>
                </div>
                <div>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-4"
                    onClick={() => {
                      navigate(`/detail/${country.name}`);
                    }}
                  >
                    상세보기
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default CountryList;
