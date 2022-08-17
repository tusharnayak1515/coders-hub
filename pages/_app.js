import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import { wrapper } from "../redux/store";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(()=> {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {user && domLoaded &&  <Navbar />}
      {domLoaded && <Component {...pageProps} />}
      {domLoaded && <ToastContainer />}
    </>
  );
}

export default wrapper.withRedux(MyApp);
