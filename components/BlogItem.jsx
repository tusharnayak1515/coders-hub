import React from 'react';
import Link from 'next/link';
import { useSelector, shallowEqual } from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import styles from "../styles/blogItem.module.css";

TimeAgo.addLocale(en);

const BlogItem = ({blog, blog_user}) => {
  const {user, theme} = useSelector(state=> state.userReducer, shallowEqual);
  const timeAgo = user && new TimeAgo("en-US");

  return (
    <div className={`${styles.blogItem} ${theme === "light" ? styles.light_blogItem : styles.dark_blogItem}`}>
        <div className={styles.details}>
          {/* <Link href={`/blogs/${blog._id}`} key={blog._id}><a><h3>{blog.title}</h3></a></Link> */}
          <Link href={{
            pathname: "/blogs/[blogid]",
            query: {blogid: blog._id}
          }}><a><h3>{blog.title}</h3></a></Link>
        </div>
        <div className={styles.time}>
          {blog_user ? <p>by {blog_user}</p> : <p>by {blog.user.name}</p>}
          <p>posted { timeAgo && timeAgo.format(blog.createdAt)}</p>
        </div>
    </div>
  )
}

export default BlogItem;