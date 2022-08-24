import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as cookie from "cookie";
import { wrapper } from "../../redux/store";
import { actionCreators } from "../../redux";
const BlogForm = dynamic(() => import("../../components/BlogForm"), {
  ssr: false,
});

import styles from "../../styles/editblog.module.css";

const EditBlog = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, profile, theme } = useSelector((state) => state.userReducer, shallowEqual);
  const { blog } = useSelector((state) => state.blogReducer, shallowEqual);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
    else if(user && (profile?._id !== blog?.user._id && profile?.role !== "admin")) {
      router.replace(`/blogs/${blog?._id}`);
    }
    else {
      dispatch(actionCreators.getBlog({ id: router.query.bid }));
    }
  }, [user, router, dispatch]);

  return (
    <div className={`${styles.editblog} ${theme === "light" ? styles.light_editblog : styles.dark_editblog}`}>
      <Head>
        <title>Edit Blog-{blog?.title}</title>
        <meta
          name="keywords"
          content={`next, next.js, just-blogs, blogs, edit blog, ${blog?.title}, ${blog?.description}`}
        />
      </Head>
      
      <BlogForm blog={blog ? blog : null} />
    </div>
  );
};

export default EditBlog;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    const { params } = context;
    if (cookieObj.jb_user_token) {
      await store.dispatch(
        actionCreators.getBlog({
          id: params.bid,
          token: cookieObj.jb_user_token,
        })
      );
    }
  }
);
