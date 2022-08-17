import React from 'react';
import Head from 'next/head';
import BlogForm from '../components/BlogForm';

import styles from "../styles/addblog.module.css";

const Addblog = () => {
  return (
    <div className={styles.addblog}>
        <Head>
            <title>Add Blog</title>
            <meta name="keywords" content="next, next.js, just-blogs, blogs, add blog, form" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BlogForm />
    </div>
  )
}

export default Addblog;