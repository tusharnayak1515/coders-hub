import React, { useEffect } from 'react';
import Head from 'next/head';
import BlogForm from '../components/BlogForm';
import { shallowEqual, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import styles from "../styles/addblog.module.css";

const Addblog = () => {
const router = useRouter();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  
  useEffect(()=> {
    if(!user) {
        router.replace("/login");
    }
  }, [user, router]);
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