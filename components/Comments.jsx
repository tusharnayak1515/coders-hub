import React from 'react';
import { useRouter } from 'next/router';
import { useSelector, shallowEqual } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import Comment from './Comment';

import styles from "../styles/comments.module.css";

const Comments = () => {
  const router = useRouter();
  const {blog} = useSelector(state=> state.blogReducer,shallowEqual);
  const {comments} = useSelector(state=> state.commentReducer,shallowEqual);

  const onAddClick = (e)=> {
    e.preventDefault();
    router.push(`/addcomment/${blog?._id}`);
  }

  return (
    <div className={styles.comments}>
        <div className={styles.head_div}>
            <h1 className={styles.comments_head}>Comments</h1>
            <MdAdd className={styles.comments_addIcon} onClick={onAddClick} />
        </div>
        {comments && comments?.length === 0 ? <h3 className={styles.noComments}>No comments!</h3> : comments?.map((com)=> {
          return <Comment key={com._id} comment={com} />
        })}
    </div>
  )
}

export default Comments;