import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as cookie from "cookie";
import { wrapper } from "../redux/store";
import { actionCreators } from "../redux";
import { FaUserEdit } from "react-icons/fa";
const BlogItem = dynamic(() => import("../components/BlogItem"), {
    ssr: false,
});

import styles from "../styles/profile.module.css";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, profile } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      dispatch(actionCreators.profile());
    }
  }, [user, router, dispatch]);

  return (
    <div className={styles.profile_page}>
      <Head>
        <title>Profile</title>
        <meta
          name="keywords"
          content="next, next.js, coders hub, blogs, profile"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.profile_wrapper}>
        <div className={styles.profile_box}>
          <div className={styles.dp_div}>
            <img src={profile?.profilepic} alt={profile?.name} />
          </div>

          <div className={styles.user_details}>
            <div className={styles.user_name_div}>
              <h1 className={styles.user_name}>{profile?.name}</h1>
              <FaUserEdit className={styles.user_editIcon} />
            </div>
            <h2 className={styles.user_email}>{profile?.email}</h2>
            <h3 className={styles.user_blog_count}>
              {profile?.blogs.length} blogs
            </h3>
          </div>
        </div>
      </div>

      <div className={styles.user_blogs_container}>
        {profile?.blogs.length === 0 ? "" : profile?.blogs.map((blog)=> {
            return <BlogItem key={blog._id} blog={blog} blog_user={profile ? profile?.name : null} />
        })}
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    if (cookieObj.jb_user_token) {
      await store.dispatch(actionCreators.profile(cookieObj.jb_user_token));
    }
  }
);
