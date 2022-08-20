import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as cookie from "cookie";
import { wrapper } from "../../redux/store";
import { actionCreators } from "../../redux";
const BlogItem = dynamic(() => import("../../components/BlogItem"), {
    ssr: false,
});
import { FaUserEdit } from "react-icons/fa";

import styles from "../../styles/profile.module.css";

const OtherProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, profile, otherUser } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (user && profile?.role !== "admin") {
      router.replace("/");
    } else {
      dispatch(actionCreators.getUser({ id: router.query.uid }));
    }
  }, []);

  return (
    <div className={styles.profile_page}>
      <Head>
        <title>{otherUser?.name}</title>
        <meta
          name="keywords"
          content={`next, next.js, coders hub, blogs, ${otherUser?.name}, profile`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.profile_wrapper}>
        <div className={styles.profile_box}>
          <div className={styles.dp_div}>
            <img src={otherUser?.profilepic} alt={otherUser?.name} />
          </div>

          <div className={styles.user_details}>
            <div className={styles.user_name_div}>
              <h1 className={styles.user_name}>{otherUser?.name}</h1>
              <FaUserEdit className={styles.user_editIcon} />
            </div>
            <h2 className={styles.user_email}>{otherUser?.email}</h2>
            <h3 className={styles.user_blog_count}>
              {otherUser?.blogs.length} blogs
            </h3>
          </div>
        </div>
      </div>

      <div className={styles.user_blogs_container}>
        {otherUser?.blogs.length === 0
          ? <h1 className={styles.noBlogs}>No Blogs</h1>
          : otherUser?.blogs.map((blog) => {
              return (
                <BlogItem
                  key={blog._id}
                  blog={blog}
                  blog_user={profile ? profile?.name : null}
                />
              );
            })}
      </div>
    </div>
  );
};

export default OtherProfile;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    const { params } = context;
    if (cookieObj.jb_user_token) {
      await store.dispatch(actionCreators.profile(cookieObj.jb_user_token));
      await store.dispatch(
        actionCreators.getUser({
          token: cookieObj.jb_user_token,
          id: params.uid,
        })
      );
    }
  }
);