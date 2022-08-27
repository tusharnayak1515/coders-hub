import React from 'react';
import { useRouter } from 'next/router';

import styles from "../styles/user.module.css";
import Image from 'next/image';

const User = ({user, theme}) => {
  const router = useRouter();

  const onUserClick = (e)=> {
    e.preventDefault();
    router.push(`/users/${user._id}`);
  }

  return (
    <div className={`${styles.user_div} ${theme === "light" ? styles.light_user_div : styles.dark_user_div}`}>
      <div className={styles.user_dp_div}>
        <Image src={user.profilepic} alt={user.name} layout="fill" />
      </div>
      <h2 className={styles.username} onClick={onUserClick}><a href={`/users/${user._id}`}>{user.name}</a></h2>
    </div>
  )
}

export default User;