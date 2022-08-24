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

  const onHomeClick = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const onBlogAdd = (e) => {
    e.preventDefault();
    router.push("/addblog");
  };

  const onUsersClick = (e) => {
    e.preventDefault();
    router.push("/users");
  };

  const onProfileClick = (e) => {
    e.preventDefault();
    router.push("/profile");
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
          <a href="">
            {theme === "light" ? (
              <BsSun className={`${styles.icons} ${styles.themeIcon}`} />
            ) : (
              <BsFillMoonFill className={`${styles.icons} ${styles.themeIcon}`} />
            )}
          </a>
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
        <h2 onClick={onHomeClick}>
          <a href="/">
            <RiHome2Fill className={styles.icons} />
          </a>
        </h2>
        <h2 className={styles.theme_toggle} onClick={onToggle}>
          <a href="">
            {theme === "light" ? (
              <BsSun className={`${styles.icons} ${styles.themeIcon}`} />
            ) : (
              <BsFillMoonFill className={`${styles.icons} ${styles.themeIcon}`} />
            )}
          </a>
        </h2>
        <h2 onClick={onBlogAdd}>
          <a href="/addblog">
            <IoMdAdd className={styles.icons} />
          </a>
        </h2>
        {profile && profile?.role === "admin" && (
          <h2 onClick={onUsersClick}>
            <a href="/users">
              <ImUsers className={styles.icons} />
            </a>
          </h2>
        )}
        <h2 onClick={onProfileClick}>
          <a href="/profile">
            <FaUserAlt className={`${styles.icons} ${styles.profileIcon}`} />
          </a>
        </h2>
        <h2 onClick={onLogout}>
          <a href="">
            <FiPower className={styles.icons} />
          </a>
        </h2>
        {/* <h2 onClick={onToggle}>
          <a href="">
            {theme === "light" ? (
              <BsSun className={styles.icons} />
            ) : (
              <BsFillMoonFill className={styles.icons} />
            )}
          </a>
        </h2> */}
      </div>
    </div>
  );
};

export default Navbar;
