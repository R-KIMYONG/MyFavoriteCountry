import { BrowserRouter, Route, Routes } from "react-router-dom";
import Countrys from "../components/Countrys";
import CountryDetail from "../components/CountryDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Countrys />} />
        <Route path="/detail/:id" element={<CountryDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
