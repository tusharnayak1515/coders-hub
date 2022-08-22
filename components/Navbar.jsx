import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { FiPower } from 'react-icons/fi';
import { RiHome2Fill } from 'react-icons/ri';
import { ImUsers } from 'react-icons/im';
import { actionCreators } from '../redux';

import styles from '../styles/navbar.module.css';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {profile} = useSelector(state=> state.userReducer,shallowEqual);
  const [bname, setBName] = useState("");

  const onChangeHandler = (e)=> {
    e.preventDefault();
    setBName(e.target.value);
  }

  const onBlogAdd = (e)=> {
    e.preventDefault();
    router.push("/addblog");
  }

  const onLogout = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.logout());
  }

  const onSearch = (e)=> {
    e.preventDefault();
    router.push(`/search/blogs/${bname}`);
    setBName("");
  }

  return (
    <div className={styles.navbar}>
        <div className={styles.logoDiv}>
            <h1 className={styles.logo}>Coders-Hub</h1>
        </div>

        <div className={styles.searchDiv}>
            <input type="text" placeholder='Search Blogs' value={bname} onChange={onChangeHandler} />
            <MdSearch className={styles.searchIcon} onClick={onSearch} />
        </div>

        <div className={styles.menuDiv}>
            <RiHome2Fill className={styles.icons} onClick={()=> router.push("/")} />
            <IoMdAdd className={styles.icons} onClick={onBlogAdd} />
            {(profile && profile?.role === "admin") && <ImUsers className={styles.icons} onClick={()=> router.push("/users")} />}
            <FaUserAlt className={`${styles.icons} ${styles.profileIcon}`} onClick={()=> router.push("/profile")} />
            <FiPower className={styles.icons} onClick={onLogout} />
        </div>
    </div>
  )
}

export default Navbar;