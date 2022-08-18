import React from 'react';
import { useRouter } from 'next/router';
import { shallowEqual, useSelector } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import { RiHome2Fill } from 'react-icons/ri';
import { ImUsers } from 'react-icons/im';

import styles from '../styles/navbar.module.css';

const Navbar = () => {
  const router = useRouter();
  const {profile} = useSelector(state=> state.userReducer,shallowEqual);

  const onBlogAdd = (e)=> {
    e.preventDefault();
    router.push("/addblog");
  }

  return (
    <div className={styles.navbar}>
        <div className={styles.logoDiv}>
            <h1 className={styles.logo}>Coders-Hub</h1>
        </div>

        <div className={styles.searchDiv}>
            <input type="text" placeholder='Search Blogs' />
            <h1 className={styles.searchIcon}><MdSearch /></h1>
        </div>

        <div className={styles.menuDiv}>
            <RiHome2Fill className={styles.icons} onClick={()=> router.push("/")} />
            <IoMdAdd className={styles.icons} onClick={onBlogAdd} />
            {profile && profile.role === "admin" && <ImUsers className={styles.icons} onClick={()=> router.push("/users")} />}
            <FaUserAlt className={`${styles.icons} ${styles.profileIcon}`} onClick={()=> router.push("/profile")} />
            <BiLogOut className={styles.icons} />
        </div>
    </div>
  )
}

export default Navbar;