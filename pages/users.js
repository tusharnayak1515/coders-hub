import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as cookie from "cookie";
import { actionCreators } from "../redux";
import { wrapper } from "../redux/store";
const UserList = dynamic(() => import("../components/UserList"), {
    ssr: true,
});

import styles from "../styles/users.module.css";

const Users = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, profile } = useSelector(state => state.userReducer,shallowEqual);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (user && profile && profile?.role !== "admin") {
      router.replace("/");
    } else {
      dispatch(actionCreators.profile());
      dispatch(actionCreators.getAllUsers());
    }
  }, [user, router, profile?.role, dispatch]);

  return (
    <div className={styles.users_page}>
      <Head>
        <title>All Users</title>
        <meta
          name="keywords"
          content="next, next.js, coders hub, blogs, users"
        />
      </Head>

      <h1 className={styles.allusers_head}>All Users</h1>

      {user && <UserList />}
    </div>
  );
};

export default Users;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    if (cookieObj.jb_user_token) {
      await store.dispatch(actionCreators.profile(cookieObj.jb_user_token));
      await store.dispatch(actionCreators.getAllUsers(cookieObj.jb_user_token));
    }
  }
);
