import React from 'react';
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import styles from "../styles/blogPage.module.css";

TimeAgo.addLocale(en);

const BlogTime = ({blog}) => {
  const timeAgo = new TimeAgo("en-US");
  return (
    <div className={styles.blog_time}>
        <p>by <span className={styles.blog_username}>{blog?.user.name}</span></p>
        {blog?.createdAt === blog?.updatedAt ? (
        <p>posted {timeAgo && timeAgo.format(blog?.createdAt)}</p>
        ) : (
        <p>updated {timeAgo && timeAgo.format(blog?.updatedAt)}</p>
        )}
    </div>
  )
}

export default BlogTime;