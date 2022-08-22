import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as cookie from "cookie";
import { wrapper } from "../../redux/store";
import { actionCreators } from "../../redux";
const CommentForm = dynamic(() => import("../../components/CommentForm"), {
  ssr: false,
});

import styles from "../../styles/editComment.module.css";

const EditComment = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const { comment } = useSelector(
    (state) => state.commentReducer,
    shallowEqual
  );

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      dispatch(actionCreators.getComment({ id: router.query.cid }));
    }
  }, [user, router, dispatch]);

  return (
    <div className={styles.editComment}>
      <Head>
        <title>Edit Comment</title>
        <meta
          name="keywords"
          content={`next, next.js, just-blogs, blogs, edit blog, ${comment?.title}`}
        />
      </Head>

      <CommentForm comment={comment} />
    </div>
  );
};

export default EditComment;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    const { params } = context;
    if (cookieObj.jb_user_token) {
      await store.dispatch(
        actionCreators.getComment({
          id: params.cid,
          token: cookieObj.jb_user_token,
        })
      );
    }
  }
);
