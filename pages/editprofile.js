import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as cookie from "cookie";
import { wrapper } from "../redux/store";
import { actionCreators } from "../redux";
import { toast } from "react-toastify";
const PasswordModal = dynamic(() => import("../components/PasswordModal"), {
  ssr: false,
});
const ConfirmModal = dynamic(() => import("../components/ConfirmModal"), {
  ssr: false,
});
const DpModal = dynamic(() => import("../components/DpModal"), {
  ssr: false,
});

import styles from "../styles/editProfile.module.css";

const EditProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, profile, theme } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );
  const [userDetails, setUserDetails] = useState({
    name: profile?.name,
    email: profile?.email,
    profilepic: profile?.profilepic,
  });
  const [myImg, setMyImg] = useState(profile?.profilepic);
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [onDpClick, setOnDpClick] = useState(false);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const onDpModalClick = (e) => {
    e.preventDefault();
    setOnDpClick(true);
  };

  const passwordChangeClick = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const onDelete = (e) => {
    e.preventDefault();
    setConfirm(true);
  };

  const onDeleteUser = (e) => {
    e.preventDefault();
    dispatch(actionCreators.deleteUser());
    setConfirm(false);
  };

  const onEdit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const { name, email } = userDetails;
    if (name.length >= 3 && name.length <= 25 && emailRegex.test(email)) {
      dispatch(actionCreators.editProfile(userDetails));
      router.replace("/profile");
    } else if (name.length < 3 || name.length > 25) {
      toast.warn("Name must be minimum 3 and maximum 25 characters long!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.warn("Enter a valid email!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      dispatch(actionCreators.profile());
    }
  }, [user, userDetails.profilepic, router, dispatch]);

  return (
    <div className={`${styles.editProfile} ${theme === "light" ? styles.light_editProfile : styles.dark_editProfile}`}>
      <Head>
        <title>Edit Profile</title>
        <meta
          name="keywords"
          content="next, next.js, coders hub, blogs, edit profile"
        />
      </Head>

      {confirm && (
        <ConfirmModal
          theme={theme}
          setShow={setConfirm}
          text="delete your account permanently"
          onDelete={onDeleteUser}
        />
      )}
      {show && <PasswordModal setShow={setShow} theme={theme} />}
      {onDpClick && (
        <DpModal
          theme={theme}
          setShow={setOnDpClick}
          profile={profile}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          setMyImg={setMyImg}
        />
      )}
      <div className={styles.edit_container}>
        <div className={styles.dp_div}>
          <img
            src={myImg ? myImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
            alt={userDetails.name}
            onClick={onDpModalClick}
          />
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
            <p className={styles.change_password} onClick={passwordChangeClick}>
              Change Password
            </p>
          </div>

          <div className={styles.btn_div}>
            <button className={styles.edit_btn} onClick={onEdit}>
              Edit
            </button>
            <p className={styles.delete_btn} onClick={onDelete}>
              Delete Account
            </p>
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
