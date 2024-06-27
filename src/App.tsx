import Router from "./router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router />
      <ToastContainer autoClose={1500} stacked />
    </>
  );
};

export default App;
