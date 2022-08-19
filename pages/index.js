import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as cookie from "cookie";
import { wrapper } from "../redux/store";
import { actionCreators } from "../redux";
import Blogs from "../components/Blogs";

import styles from "../styles/Home.module.css";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, profile } = useSelector(state => state.userReducer,shallowEqual);
  const categories = [
    "All",
    "JavaScript",
    "React.js",
    "Node.js",
    "Next.js",
    "Python",
    "Django",
    "Flask",
    "Java",
    "Spring Boot",
    "C++",
    "C",
    "MongoDB",
    "MySQL",
  ];

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      dispatch(actionCreators.profile());
    }
  }, [user, router, dispatch]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coders-Hub</title>
        <meta name="keywords" content="next, next.js, just-blogs, blogs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.categoriesDiv}>
          {categories && categories.map((category,index)=> {
            return <h4 key={index}>{category}</h4>
          })}
        </div>

        <h1 className={styles.title}>Trending Blogs</h1>

        {user && <Blogs />}

      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    if (cookieObj.jb_user_token) {
      await store.dispatch(actionCreators.profile(cookieObj.jb_user_token));
    }
  }
);
