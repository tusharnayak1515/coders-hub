import { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import dynamic from "next/dynamic";
import { shallowEqual, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
const Navbar = dynamic(() => import("../components/Navbar"), {ssr: false});
import { wrapper } from "../redux/store";
import Nprogress from "nprogress";
Nprogress.configure({ showSpinner: false, easing: 'ease', speed: 1000, parent: 'html' });

import "../styles/globals.css";
import "../styles/prism.css";

function MyApp({ Component, pageProps }) {
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const [domLoaded, setDomLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      Nprogress.start();
      setLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      Nprogress.done();
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Head>
        {loading && <title>Coders Hub</title>}
        <meta
          name="keywords"
          content="next, next.js, just-blogs, blogs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <Navbar />}
      {!loading && <Component {...pageProps} />}
      {domLoaded && <ToastContainer />}
    </>
  );
}

export default wrapper.withRedux(MyApp);
