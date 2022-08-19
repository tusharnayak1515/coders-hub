import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as cookie from "cookie";
import { wrapper } from "../../redux/store";
import { actionCreators } from "../../redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Prism from "prismjs";
import { FaEdit } from "react-icons/fa";

import styles from "../../styles/blogPage.module.css";

TimeAgo.addLocale(en);

const BlogPage = () => {
  const timeAgo = new TimeAgo("en-US");
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const { blog } = useSelector((state) => state.blogReducer, shallowEqual);

  const onEditClick = (e) => {
    e.preventDefault();
    router.push(`/editblog/${blog._id}`);
  };

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

  console.log(blog);

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
        <div className={styles.blog_title}>
          <h1>{blog?.title}</h1>
          <FaEdit className={styles.blog_editIcon} onClick={onEditClick} />
        </div>
        <h3 className={styles.blog_description}>{blog?.description}</h3>
        <h3 className={styles.blog_category}>
          Category: <span>{blog?.category}</span>
        </h3>
        <div className={styles.blog_content}>
          {blog &&
            blog?.content.map((c, index) => {
              return (
                <div key={index} className={styles.c_item}>
                  {c.subtitle && c.subtitle !== "" && (
                    <h3 className={styles.blog_subtitle}>{c.subtitle}</h3>
                  )}
                  {c.code && c.code !== "" && (
                    <pre className="line-numbers">
                      <code
                        className={`language-${c.language
                          .trim()
                          .toLowerCase()}`}
                      >
                        {c.code}
                      </code>
                    </pre>
                  )}
                </div>
              );
            })}
        </div>
        <div className={styles.blog_time}>
          <p>by {blog?.user.name}</p>
          {blog.createdAt === blog.updatedAt ? (
            <p>posted {timeAgo.format(blog.createdAt)}</p>
          ) : (
            <p>updated {timeAgo.format(blog.updatedAt)}</p>
          )}
        </div>
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
