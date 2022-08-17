import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as cookie from "cookie";
import { wrapper } from "../redux/store";
import { actionCreators } from "../redux";
import BlogItem from './BlogItem';

import styles from "../styles/blogs.module.css";

const Blogs = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const {blogs} = useSelector(state=> state.blogReducer,shallowEqual);

  useEffect(()=> {
    if(user) {
        dispatch(actionCreators.getAllBlogs());
    }
  }, [user, dispatch]);
  return (
    <div className={styles.blogs}>
        {blogs && blogs.map((blog)=> {
            return <BlogItem key={blog._id} blog={blog} />
        })}
    </div>
  )
}

export default Blogs;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
      const mycookie = context?.req?.headers?.cookie || "";
      const cookieObj = cookie.parse(mycookie);
      if (cookieObj.jb_user_token) {
        await store.dispatch(actionCreators.getAllBlogs(cookieObj.jb_user_token));
      }
    }
  );