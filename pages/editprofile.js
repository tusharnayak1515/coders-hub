import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as cookie from "cookie";
import { wrapper } from "../redux/store";
import { actionCreators } from "../redux";
const PasswordModal = dynamic(() => import("../components/PasswordModal"), {
    ssr: false,
});

import styles from "../styles/editProfile.module.css";

const EditProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, profile } = useSelector(state => state.userReducer,shallowEqual);
  const [userDetails, setUserDetails] = useState({
    name: profile?.name,
    email: profile?.email,
  });
  const [show, setShow] = useState(false);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const passwordChangeClick = (e)=> {
    e.preventDefault();
    setShow(true);
  }

  const onCancel = (e)=> {
    e.preventDefault();
    router.replace("/profile");
  }

  const onEdit = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.editProfile(userDetails));
    router.replace("/profile");
  }

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      dispatch(actionCreators.profile());
    }
  }, [user, router, dispatch]);

  return (
    <div className={styles.editProfile}>
      <Head>
        <title>Edit Profile</title>
        <meta
          name="keywords"
          content="next, next.js, coders hub, blogs, edit profile"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {show && <PasswordModal setShow={setShow} />}
      <div className={styles.edit_container}>
        <div className={styles.dp_div}>
          <img src={profile?.profilepic} alt={profile?.name} />
        </div>

        <div className={styles.user_details}>
          <div className={styles.wrapper_div}>
            <label htmlFor="user_name">Name</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              id="user_name"
              value={userDetails.name}
              onChange={onChangeHandler}
            />
          </div>

          <div className={styles.wrapper_div}>
            <label htmlFor="user_email">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="user_email"
              value={userDetails.email}
              onChange={onChangeHandler}
            />
          </div>

          <div className={styles.wrapper_div}>
            <p className={styles.change_password} onClick={passwordChangeClick}>Change Password</p>
          </div>

          <div className={styles.btn_div}>
            <button className={styles.edit_cancel_btn} onClick={onCancel}>Cancel</button>
            <button className={styles.edit_btn} onClick={onEdit}>Edit</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfile;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    if (cookieObj.jb_user_token) {
      await store.dispatch(actionCreators.profile(cookieObj.jb_user_token));
    }
  }
);
