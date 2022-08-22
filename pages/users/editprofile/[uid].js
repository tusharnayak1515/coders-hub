import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as cookie from "cookie";
import { actionCreators } from "../../../redux";
import { wrapper } from "../../../redux/store";
import { toast } from "react-toastify";
const PasswordModal = dynamic(
  () => import("../../../components/PasswordModal"),
  {
    ssr: false,
  }
);
const ConfirmModal = dynamic(() => import("../../../components/ConfirmModal"), {
  ssr: false,
});

import styles from "../../../styles/editProfile.module.css";

const EditOtherProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { otherUser, profile, user } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );
  const [userDetails, setUserDetails] = useState({
    id: otherUser?._id,
    name: otherUser?.name,
    email: otherUser?.email,
    profilepic: otherUser?.profilepic,
  });
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const onCancel = (e) => {
    e.preventDefault();
    router.replace(`/users/${otherUser?._id}`);
  };

  const onDelete = (e) => {
    e.preventDefault();
    setConfirm(true);
  };

  const onDeleteUser = (e) => {
    e.preventDefault();
    dispatch(actionCreators.deleteOtherUser(userDetails.id));
    router.replace("/users");
  };

  const onEdit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const {name, email} = userDetails;
    if((name.length >= 3 && name.length <= 25) && emailRegex.test(email)) {
      dispatch(actionCreators.editOtherProfile(userDetails));
      router.replace(`/users/${otherUser?._id}`);
    }
    else if(name.length < 3 || name.length > 25) {
      toast.warn("Name must be minimum 3 and maximum 25 characters long!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
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
    } else if (user && profile?.role !== "admin") {
      router.replace("/");
    } else {
      dispatch(actionCreators.profile());
      dispatch(actionCreators.getUser({ id: router.query.uid }));
    }
  }, [user, profile?.role, router, dispatch]);

  return (
    <div className={styles.editProfile}>
      <Head>
        <title>Edit {otherUser?.name}</title>
        <meta
          name="keywords"
          content={`next, next.js, coders hub, blogs, ${otherUser?.name}, edit profile`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {confirm && (
        <ConfirmModal
          setShow={setConfirm}
          text="delete your account permanently"
          onDelete={onDeleteUser}
        />
      )}
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

          <div className={styles.btn_div}>
            <button className={styles.edit_cancel_btn} onClick={onCancel}>
              Cancel
            </button>
            <button className={styles.delete_btn} onClick={onDelete}>
              Deactivate
            </button>
            <button className={styles.edit_btn} onClick={onEdit}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOtherProfile;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    const { params } = context;
    if (cookieObj.jb_user_token) {
      await store.dispatch(actionCreators.profile(cookieObj.jb_user_token));
      await store.dispatch(
        actionCreators.getUser({
          token: cookieObj.jb_user_token,
          id: params.uid,
        })
      );
    }
  }
);
