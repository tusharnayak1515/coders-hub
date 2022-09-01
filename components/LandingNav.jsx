import React from 'react';
import Link from 'next/link';
import { useSelector, shallowEqual } from 'react-redux';

import styles from "../styles/landingNav.module.css";

const LandingNav = () => {
  const {user} = useSelector(state=> state.userReducer,shallowEqual);

  return (
    <div className={styles.landingNav}>
        <div className={styles.landing_menu_div}>
          {!user && <Link href="/login">
            <h3 className={styles.landing_login_btn}>Login</h3>
          </Link>}

          {!user && <Link href="/register">
            <h3 className={styles.landing_register_btn}>Register</h3>
          </Link>}

          {user && <Link href="/dashboard">
            <h3 className={styles.landing_register_btn}>Dashboard</h3>
          </Link>}
        </div>
    </div>
  )
}

export default LandingNav