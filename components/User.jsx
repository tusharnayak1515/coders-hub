import React from 'react';
import { useRouter } from 'next/router';

import styles from "../styles/user.module.css";

const User = ({user}) => {
  const router = useRouter();

  const onUserClick = (e)=> {
    e.preventDefault();
    router.push(`/users/${user._id}`);
  }

  return (
    <div className={styles.user_div}>
        <img src={user.profilepic} alt={user.name} />
        <h2 className={styles.username} onClick={onUserClick}><a href={`/users/${user._id}`}>{user.name}</a></h2>
    </div>
  )
}

export default User;