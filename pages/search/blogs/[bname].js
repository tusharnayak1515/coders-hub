import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as cookie from "cookie";
import { wrapper } from '../../../redux/store';
import { actionCreators } from '../../../redux';
const BlogItem = dynamic(() => import("../../../components/BlogItem"), {
  ssr: false,
});

import styles from "../../../styles/searchBlogs.module.css";

const SearchBlogs = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer, shallowEqual);
  const {searchedBlogs} = useSelector(state=> state.blogReducer, shallowEqual);

  useEffect(()=> {
    if(!user) {
      router.replace("/login");
    }
    else {
      dispatch(actionCreators.searchBlogs({name: router.query.bname}));
    }
  }, [user, router, dispatch]);

  return (
    <div className={styles.searchBlogs}>
      <Head>
        <title>Search Blogs</title>
        <meta name="keywords" content="next, next.js, coding hub, blogs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.result_head}>Blogs</h1>
      <div className={styles.results_div}>
        {searchedBlogs && searchedBlogs.length === 0 ? <h2 className={styles.no_result}>No results found!</h2> : searchedBlogs.map((result)=> {
          return <BlogItem key={result._id} blog={result} />
        })}
      </div>
    </div>
  )
}

export default SearchBlogs;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    const {params} = context;
    if (cookieObj.jb_user_token) {
      await store.dispatch(actionCreators.searchBlogs({token: cookieObj.jb_user_token, name: params.bname}));
    }
  }
);