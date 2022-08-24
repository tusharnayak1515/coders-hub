import React, { useState } from "react";
import { useRouter } from "next/router";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux";
import { FaUserAlt } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FiPower } from "react-icons/fi";
import { RiHome2Fill } from "react-icons/ri";
import { ImUsers } from "react-icons/im";
import { BsSun, BsFillMoonFill } from "react-icons/bs";

import styles from "../styles/navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile, theme } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );
  const [bname, setBName] = useState("");

  const onChangeHandler = (e) => {
    e.preventDefault();
    setBName(e.target.value);
  };

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(actionCreators.logout());
  };

  const onSearch = (e) => {
    e.preventDefault();
    router.push(`/search/blogs/${bname}`);
    setBName("");
  };

  const onToggle = (e) => {
    e.preventDefault();
    dispatch(actionCreators.toggleTheme());
  };

  return (
    <div className={`${styles.navbar} ${theme === "light" ? styles.light_nav : styles.dark_nav}`}>
      <div className={styles.logoDiv}>
        <h1 className={styles.logo}>Coders-Hub</h1>
        <h2 onClick={onToggle}>
            {theme === "light" ? (
            <BsSun className={`${styles.icons} ${styles.themeIcon}`} />
            ) : (
              <BsFillMoonFill className={`${styles.icons} ${styles.themeIcon}`} />
            )}
        </h2>
      </div>

      <div className={styles.searchDiv}>
        <input
          type="text"
          placeholder="Search Blogs"
          value={bname}
          onChange={onChangeHandler}
        />
        <MdSearch className={styles.searchIcon} onClick={onSearch} />
      </div>

      <div className={styles.menuDiv}>
        <h2>
          <Link href="/">
            <a><RiHome2Fill className={styles.icons} /></a>
          </Link>
        </h2>
        <h2 className={styles.theme_toggle} onClick={onToggle}>
            {theme === "light" ? (
              <BsSun className={`${styles.icons} ${styles.themeIcon}`} />
            ) : (
              <BsFillMoonFill className={`${styles.icons} ${styles.themeIcon}`} />
            )}
        </h2>
        <h2>
          <Link href="/addblog">
            <a><IoMdAdd className={styles.icons} /></a>
          </Link>
        </h2>
        {profile && profile?.role === "admin" && (
          <h2>
            <Link href="/users">
              <a><ImUsers className={styles.icons} /></a>
            </Link>
          </h2>
        )}
        <h2>
          <Link href="/profile">
            <a><FaUserAlt className={`${styles.icons} ${styles.profileIcon}`} /></a>
          </Link>
        </h2>
        <h2 onClick={onLogout}>
          <a><FiPower className={styles.icons} /></a>
        </h2>
      </div>
    </div>
  );
};

export default Navbar;
