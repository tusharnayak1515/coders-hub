import React from 'react';
import { useRouter } from 'next/router';
import { shallowEqual, useSelector } from 'react-redux';

import styles from "../styles/notFound.module.css";

const NotFound = () => {
  const router = useRouter();
  const {theme} = useSelector(state=> state.userReducer,shallowEqual);

  const onBack = (e)=> {
    e.preventDefault();
    router.replace("/");
  }

  return (
    <div className={`${styles.notFoundPage} ${theme === "light" ? styles.light_notFoundPage : styles.dark_notFoundPage}`}>
        <div className={styles.notFound_div}>
           <h1>404</h1>
           <h2>Page Not Found</h2>
        </div>
        <button className={styles.notFound_back_btn} onClick={onBack}>Go Back</button>
    </div>
  )
}

export default NotFound