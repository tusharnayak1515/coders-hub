import React from "react";
import dynamic from "next/dynamic";
import { useSelector, shallowEqual } from "react-redux";
const User = dynamic(() => import("../components/User"), {
    ssr: false,
});

import styles from "../styles/userList.module.css";

const UserList = () => {
  const {users} = useSelector(state=> state.userReducer,shallowEqual);

  return (
    <div className={styles.userList}>
      {users && users?.length === 0 ? (
        <h1 className={styles.no_users_found}>No Users Found</h1>
      ) : (
        users?.map((user) => {
          return <User key={user._id} user={user} />;
        })
      )}
    </div>
  );
};

export default UserList;
