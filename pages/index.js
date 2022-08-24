import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as cookie from "cookie";
import { wrapper } from "../redux/store";
import { actionCreators } from "../redux";
const Blogs = dynamic(() => import("../components/Blogs"), {
  ssr: false,
});

import styles from "../styles/Home.module.css";

export default function Home({categories}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, theme } = useSelector(state => state.userReducer,shallowEqual);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      dispatch(actionCreators.profile());
      dispatch(actionCreators.getAllBlogs());
    }
  }, [user, router, dispatch]);

  return (
    <div className={`${styles.container} ${theme === "light" ? styles.light_home : styles.dark_home}`}>
      <Head>
        <title>Coders-Hub</title>
        <meta name="keywords" content="next, next.js, just-blogs, blogs" />
      </Head>

      <main className={styles.main}>
        {/* <div className={styles.categoriesDiv}>
          {categories && categories.map((category,index)=> {
            return <h4 key={index}>{category}</h4>
          })}
        </div> */}
        <h1 className={styles.title}>Trending Blogs</h1>
        {user && <Blogs />}
      </main>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    if (cookieObj.jb_user_token) {
      await store.dispatch(actionCreators.profile(cookieObj.jb_user_token));
      await store.dispatch(actionCreators.getAllBlogs(cookieObj.jb_user_token));
    }
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

    return {
      props: {
        categories: categories
      }
    }
  }
);
