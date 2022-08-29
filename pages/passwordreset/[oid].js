import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actionCreators } from '../../redux';

import styles from "../../styles/passwordreset.module.css";

const ResetPassword = ({myotp}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user,otp} = useSelector(state=> state.userReducer,shallowEqual);
  const [passwordDetails, setPasswordDetails] = useState({otp: myotp, newpassword: "", confirmpassword: ""});

  const onChangeHandler = (e)=> {
    e.preventDefault();
    setPasswordDetails({...passwordDetails, [e.target.name]: e.target.value});
  }

  const onResetPassword = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.resetPassword(passwordDetails));
    router.replace("/login");
  }

  useEffect(()=> {
    if(user) {
      router.replace("/");
    }
    else if(process.env.NODE_ENV !== "development") {
      router.replace("/login");
    }
    else if(!otp) {
      router.replace("/login");
    }

    return () => {
      dispatch(actionCreators.resetStatus());
    };
  }, [process.env.NODE_ENV, user, otp, router]);

  return (
    <div className={styles.passwordreset}>
      <Head>
        <title>Reset Password</title>
        <meta
          name="keywords"
          content="next, next.js, coders hub, blogs, reset password"
        />
      </Head>

      <div className={styles.password_box}>
        <h2 className={styles.reset_header}>Reset Password</h2>
        <input type="password" name='newpassword' placeholder='New Password' value={passwordDetails.newpassword} onChange={onChangeHandler}  />
        <input type="password" name='confirmpassword' placeholder='Confirm Password' value={passwordDetails.confirmpassword} onChange={onChangeHandler}  />
        <button onClick={onResetPassword}>Reset</button>
      </div>
    </div>
  )
}

export default ResetPassword;

export const getServerSideProps = (context)=> {
    const {params} = context;
    const otp = params.oid;
    if(!otp) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        myotp: otp
      }
    }
}
