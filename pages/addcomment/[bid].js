import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as cookie from "cookie";
import { wrapper } from '../../redux/store';
import { actionCreators } from '../../redux';
const CommentForm = dynamic(() => import("../../components/CommentForm"), {
  ssr: false,
});

import styles from "../../styles/addComment.module.css";

const Addcomment = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);

  useEffect(()=> {
    if(!user) {
      router.replace("/login");
    }
    else {
      dispatch(actionCreators.getBlog({id: router.query.bid}));
    }
  }, [user, router, dispatch]);
  
  return (
    <div className={styles.addComment}>
      <Head>
        <title>Add Comment</title>
        <meta
          name="keywords"
          content={"next, next.js, just-blogs, blogs, add comment, comment"}
        />
      </Head>
      <CommentForm />
    </div>
  )
}

export default Addcomment;

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