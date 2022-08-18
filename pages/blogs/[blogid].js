import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as cookie from "cookie";
import { wrapper } from "../../redux/store";
import { actionCreators } from "../../redux";
import Prism from "prismjs";

import styles from "../../styles/blogPage.module.css";

const BlogPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const { blog } = useSelector((state) => state.blogReducer, shallowEqual);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      dispatch(actionCreators.getBlog({ id: router.query.blogid }));
    }
  }, [user, router, dispatch]);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className={styles.blog_page}>
      <Head>
        <title>{blog?.title}</title>
        <meta
          name="keywords"
          content={`next, next.js, just-blogs, blogs, ${blog?.title}, ${blog?.description}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.blog_container}>
        <h1 className={styles.blog_title}>{blog?.title}</h1>
        <h3 className={styles.blog_description}>{blog?.description}</h3>
        <h3 className={styles.blog_category}>Category: <span>{blog?.category}</span></h3>
        {blog &&
          blog?.content.map((c, index) => {
            return (
              <div key={index} className={styles.c_item}>
                {c.subtitle && c.subtitle !== "" && (
                  <h4 className={styles.blog_subtitle}>{c.subtitle}</h4>
                )}
                {c.code && c.code !== "" && (
                  <pre className="line-numbers">
                    <code className={`language-${c.language.trim().toLowerCase()}`}>{c.code}</code>
                  </pre>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BlogPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    const { params } = context;
    if (cookieObj.jb_user_token) {
      await store.dispatch(
        actionCreators.getBlog({
          id: params.blogid,
          token: cookieObj.jb_user_token,
        })
      );
    }
  }
);
