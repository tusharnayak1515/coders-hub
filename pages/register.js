import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { actionCreators } from "../redux";
import bannerImg from "../public/static/images/banner.svg";
import { toast } from "react-toastify";

import styles from "../styles/login_register.module.css";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer, shallowEqual);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isClicked, setIsClicked] = useState({name: false, email: false, password: false });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const onRegister = (e) => {
    e.preventDefault();
    const { name, email, password } = userDetails;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    if (
      name.length >= 3 &&
      name.length <= 25 &&
      emailRegex.test(email) === true &&
      passwordRegex.test(password) === true &&
      /\s/.test(password) === false
    ) {
      dispatch(actionCreators.register(userDetails));
    } else {
      if (name.length < 3 || name.length > 25) {
        toast.warn("Name must be minimum 3 and maximum 25 characters long!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (emailRegex.test(email) === false) {
        toast.warn("Enter a valid email!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.warn(
          "Password must be minimum 8 characters long and a combination of uppercase,lowercase,spacial characters and numbers and must not contain any spaces!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    }
  };

  const onLoginClick = (e) => {
    e.preventDefault();
    router.replace("/login");
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
        <title>Register</title>
        <meta
          name="keywords"
          content="next, next.js, just-blogs, blogs, register"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.leftSide}>
        <div className={styles.formDiv}>
          <h1 className={styles.heading}>Register</h1>
          <p className={styles.intro}>
            Register and be a part of the coding community where you can find
            solutions to all your queries and also help others solve their
            queries.
          </p>
          <div className={styles.flexDiv}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              id="name"
              className={isClicked.name ? styles.input_active : ""}
              value={userDetails.name}
              onChange={onChangeHandler}
              onFocus={onInputClick}
              onBlur={onBlurClick}
            />
          </div>
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
            <button onClick={onRegister}>Register</button>
          </div>

          <p className={styles.other}>
            Have an account?
            <span className={styles.otherText} onClick={onLoginClick}>
              Login
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

export default Register;
