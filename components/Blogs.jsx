import React from 'react';
import dynamic from 'next/dynamic';
import { shallowEqual, useSelector } from 'react-redux';
const BlogItem = dynamic(() => import("./BlogItem"), {
  ssr: false,
});

import styles from "../styles/blogs.module.css";

const Blogs = () => {
  const {blogs} = useSelector(state=> state.blogReducer,shallowEqual);

  return (
    <div className={styles.blogs}>
        {blogs && blogs.map((blog)=> {
            return <BlogItem key={blog._id} blog={blog} />
        })}
    </div>
  )
}

export default Blogs;