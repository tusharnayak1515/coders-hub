import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { actionCreators } from "../redux";
import bannerImg from "../public/static/images/banner.svg";

import styles from "../styles/login_register.module.css";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [isClicked, setIsClicked] = useState({ email: false, password: false });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const onLogin = (e) => {
    e.preventDefault();
    const {email, password} = userDetails;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if((emailRegex.test(email) === true) && (/\s/.test(password) === false && password.length > 0)) {
      dispatch(actionCreators.login(userDetails));
    }
    else {
      if(emailRegex.test(email) === false) {
        toast.warn("Enter a vlid email!", {
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
        toast.warn("Password cannot be empty and must not contain any spaces!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const onRegisterClick = (e) => {
    e.preventDefault();
    router.replace("/register");
  };

  const onInputClick = (e)=> {
    e.preventDefault();
    const { name } = e.target;
    setIsClicked({...isClicked, [name]: true});
  }

  const onBlurClick = (e)=> {
    e.preventDefault();
    const { name } = e.target;
    setIsClicked({...isClicked, [name]: false});
  }

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <div className={styles.mycontainer}>
      <Head>
        <title>Login</title>
        <meta
          name="keywords"
          content="next, next.js, just-blogs, blogs, login"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.leftSide}>
        <div className={styles.formDiv}>
          <h1 className={styles.heading}>Login</h1>
          <p className={styles.intro}>
            Log in to your account and explore all the coding related blogs,
            queries and also find the solution to your queries!
          </p>
          <div className={styles.flexDiv}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              id="email"
              className={isClicked.email ? styles.input_active : ""}
              value={userDetails.email}
              onChange={onChangeHandler}
              onFocus={onInputClick}
              onBlur={onBlurClick}
            />
          </div>
          <div className={styles.flexDiv}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              id="password"
              className={isClicked.password ? styles.input_active : ""}
              value={userDetails.password}
              onChange={onChangeHandler}
              onFocus={onInputClick}
              onBlur={onBlurClick}
            />
          </div>

          <div className={styles.btnDiv}>
            <div className={styles.rememberDiv}>
              <input type="checkbox" name="remember" id="remember" />
              <label className={styles.remember} htmlFor="remember">
                Remember Me
              </label>
            </div>
            <button onClick={onLogin}>Login</button>
          </div>

          <p className={styles.other}>
            Don&apos;t have an account?
            <span className={styles.otherText} onClick={onRegisterClick}>
              Register
            </span>
          </p>
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.bannerDiv}>
          <Image src={bannerImg} alt="Banner" />
        </div>

        <div className={styles.info}>
          <h2>Welcome to Coders-Hub!</h2>
          <p>
            A platform for all the coders to share your code online and find
            solutions to your issues and bugs!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
