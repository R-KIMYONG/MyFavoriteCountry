import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { countryApi } from "../api/countryApi";
import { Country } from "../types/country.type";

type Params = { id: string };
const CountryDetail: React.FC = () => {
  const { id } = useParams<Params>();
  const [countryDetail, setCountryDetail] = useState<Country[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryDetail = async (): Promise<void> => {
      try {
        const { data } = await countryApi.get<Country[]>(
          `/name/${id}?fullText=true`
        );
        if (data.length > 0) {
          setCountryDetail(data);
        }
      } catch (error) {
        console.error("Error fetching country detail:", error);
      }
    };
    fetchCountryDetail();
  }, [id]);
  return (
    <>
      <div className="flex gap-4 items-center justify-center mx-auto min-w-min mt-20">
        <h1 className="text-2xl">상세페이지</h1>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
          onClick={() => {
            navigate("/");
          }}
        >
          홈으로
        </button>
      </div>
      {countryDetail.length > 0 && (
        <div className="flex justify-center w-[80%] items-center gap-10 mt-20 mx-auto">
          <img
            src={countryDetail[0].flags.png}
            alt="country flag"
            className="rounded-md block"
          />
          <div className="grid grid-rows-3 min-h-32">
            <h1>{countryDetail[0].translations.kor.official}</h1>
            <p>Capital: {countryDetail[0].capital?.[0]}</p>
            <Link to={countryDetail[0].maps.googleMaps} target="_blank">
              <h1>위치 보기</h1>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CountryDetail;
