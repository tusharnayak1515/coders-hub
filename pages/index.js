import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const LandingNav = dynamic(() => import("../components/LandingNav"), {
  ssr: false,
});

import styles from "../styles/landingPage.module.css";

const Home = () => {
  return (
    <div className={styles.landingPage}>
      <Head>
        <title>Coders-Hub</title>
        <meta name="keywords" content="next, next.js, coders-hub, blogs" />
      </Head>

      <LandingNav />

      <div className={styles.landing_banner}>
        <h1 className={styles.landing_banner_head}>
          We &lt;3 people who &lt;3 to code
        </h1>
        <h3 className={styles.intro_text}>
          We provide a platform that empowers coding geeks and enables them to
          find solutions that enable productivity, growth, and discovery.{" "}
        </h3>
      </div>

      <div className={styles.landing_bottom_div}>
        <h1>For developers, by developers</h1>
        <hr style={{width: "5%", height: "0.6rem", backgroundColor: "purple"}} />
        <p>
          Coders Hub is an <span style={{color: "purple", fontWeight: "bold"}}>open community</span> for anyone who codes. We
          help you get solutions to your coding queries, share knowledge and
          help others find solutions to their queries and enhance your skills
          together.
        </p>
      </div>
    </div>
  );
};

export default Home;
