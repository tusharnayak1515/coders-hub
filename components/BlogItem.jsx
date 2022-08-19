import React from 'react';
import Link from 'next/link';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import styles from "../styles/blogItem.module.css";

TimeAgo.addDefaultLocale(en);

const BlogItem = ({blog}) => {
  const timeAgo = new TimeAgo('en-US');
  return (
    <div className={styles.blogItem}>
        <div className={styles.details}>
            <Link href={`/blogs/${blog._id}`}><h3>{blog.title}</h3></Link>
        </div>
        <div className={styles.time}>
            <p>by {blog.user.name}</p>
            <p>posted {timeAgo.format(blog.createdAt)}</p>
        </div>
    </div>
  )
}

export default BlogItem;