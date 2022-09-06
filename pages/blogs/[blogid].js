import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as cookie from "cookie";
import { wrapper } from "../../redux/store";
import { actionCreators } from "../../redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
const Comments = dynamic(() => import("../../components/Comments"), {
  ssr: false,
});
const Contents = dynamic(() => import("../../components/Contents"), {
  ssr: false,
});
const ConfirmModal = dynamic(() => import("../../components/ConfirmModal"), {
  ssr: false,
});
const BlogTime = dynamic(() => import("../../components/BlogTime"), {
  ssr: false,
});

import styles from "../../styles/blogPage.module.css";

const BlogPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, profile, theme } = useSelector(state => state.userReducer,shallowEqual);
  const { blog } = useSelector((state) => state.blogReducer, shallowEqual);
  const [show, setShow] = useState(false);

  const onEditClick = (e) => {
    e.preventDefault();
    if (blog?.user._id === profile?._id || profile?.role === "admin") {
      router.push(`/editblog/${blog._id}`);
    } else {
      toast.warn("You do not have permission to perform this action!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onDeleteClick = (e)=> {
    e.preventDefault();
    setShow(true);
  }

  const onDelete = (e) => {
    e.preventDefault();
    if (blog?.user._id !== profile._id && profile?.role === "admin") {
      dispatch(actionCreators.deleteOtherBlog(blog?._id));
      router.replace("/");
    } else if (blog?.user._id === profile._id) {
      dispatch(actionCreators.deleteBlog(blog?._id));
      router.replace("/");
    } else {
      toast.warn("You do not have permission to perform this action!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      dispatch(actionCreators.getBlog({ id: router.query.blogid }));
      dispatch(actionCreators.getAllComments({ id: router.query.blogid }));
    }
  }, [user, router, dispatch]);

  return (
    <div className={`${styles.blog_page} ${theme === "light" ? styles.light_blog_page : styles.dark_blog_page}`}>
      <Head>
        <title>{blog?.title}</title>
        <meta
          name="keywords"
          content={`next, next.js, just-blogs, blogs, ${blog?.title}, ${blog?.description}`}
        />
      </Head>

      {show && <ConfirmModal setShow={setShow} text="Delete" onDelete={onDelete} theme={theme} />}
      <div className={styles.blog_container}>
        <div className={styles.blog_title}>
          <h2>{blog?.title}</h2>
          <div className={styles.blog_iconDiv}>
            {(blog?.user?._id === profile?._id ||
              profile?.role === "admin") && (
              <FaEdit className={styles.blog_editIcon} onClick={onEditClick} />
            )}

            {(blog?.user?._id === profile?._id ||
              profile?.role === "admin") && (
              <FaTrash
                className={styles.blog_deleteIcon}
                onClick={onDeleteClick}
              />
            )}
          </div>
        </div>
        <h3 className={styles.blog_description}>{blog?.description}</h3>
        <h3 className={styles.blog_category}>
          Category: <span className={styles.text}>{blog?.category}</span>
        </h3>
        <div className={styles.blog_content}>
          {blog &&
            blog?.content.map((c) => {
              return (
                <Contents key={c._id} content={c} />
              );
            })}
        </div>
        {user && <BlogTime blog={blog ? blog : null} />}
      </div>

      <div className={styles.comments_container}>
        <Comments />
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
      if(!store.getState().blogReducer.blog) {
        return {
          notFound: true
        }
      }
      await store.dispatch(
        actionCreators.getAllComments({
          id: params.blogid,
          token: cookieObj.jb_user_token,
        })
      );
      await store.dispatch(
        actionCreators.profile(cookieObj.jb_user_token)
      );
    }
  }
);
