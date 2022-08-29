import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { actionCreators } from "../redux";
import { toast } from "react-toastify";

import styles from "../styles/forgotPassword.module.css";

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, otp, isLoading } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );
  const [email, setEmail] = useState("");
  const [myotp, setMyOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onOtpChange = (e) => {
    e.preventDefault();
    setMyOtp(e.target.value);
  };

  const onEmailSend = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (emailRegex.test(email)) {
      dispatch(actionCreators.sendEmail(email));
    } else {
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
  };

  const onOtpSubmit = (e) => {
    e.preventDefault();
    dispatch(actionCreators.submitOtp(myotp));
  };

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  useEffect(() => {
    if (isLoading) {
      setOtpSent(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if(process.env.NODE_ENV !== "development") {
      router.push("/login");
    }
    else if (otp) {
      router.push(`/passwordreset/${otp._id}`);
    }
  }, [process.env.NODE_ENV, otp, router, dispatch]);

  return (
    <div className={styles.forgotPassword}>
      <Head>
        <title>Forgot Password</title>
        <meta
          name="keywords"
          content="next, next.js, coders hub, blogs, forgot password"
        />
      </Head>

      <div className={styles.details_box}>
        <h2 className={styles.reset_head}>Reset your password</h2>
        <div className={styles.container_div}>
          <h3>Enter your email</h3>
          <div className={styles.email_input_div}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className={styles.reset_btn_div}>
          <button onClick={onEmailSend}>Send Otp</button>
        </div>

        {otpSent && !isLoading && (
          <div className={styles.bottom_div}>
            <div className={styles.container_div}>
              <h3>Enter the verification code</h3>
              <div className={styles.code_div}>
                <div className={styles.otp_div}>
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    placeholder="Enter Otp"
                    value={myotp}
                    onChange={onOtpChange}
                    disabled={!otpSent}
                  />
                </div>
              </div>
            </div>
            <div className={styles.reset_btn_div}>
              <button disabled={!otpSent} onClick={onOtpSubmit}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
