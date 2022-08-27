import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Prism from "prismjs";
import { actionCreators } from "../redux";
import TimeAgo from "javascript-time-ago";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
const ConfirmModal = dynamic(() => import("./ConfirmModal"), {
  ssr: false,
});

import styles from "../styles/comment.module.css";

const Comment = ({ comment }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile, theme } = useSelector((state) => state.userReducer, shallowEqual);
  const timeAgo = new TimeAgo("en-US");
  const [onHover, setOnHover] = useState(false);
  const [show, setShow] = useState(false);

  const onFocusHandler = (e) => {
    e.preventDefault();
    setOnHover(true);
  };

  const onBlurHandler = (e) => {
    e.preventDefault();
    setOnHover(false);
  };

  const onLike = (e) => {
    e.preventDefault();
    dispatch(actionCreators.likeComment(comment._id));
  };

  const onUnlike = (e) => {
    e.preventDefault();
    dispatch(actionCreators.unlikeComment(comment._id));
  };

  const onEditClick = (e) => {
    e.preventDefault();
    if (comment.user._id === profile?._id || profile?.role === "admin") {
      router.push(`/editcomment/${comment._id}`);
    } else {
      toast.warn("You do not permission to perform this task!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onDeleteClick = (e)=> {
    e.preventDefault();
    setShow(true);
  }

  const onDelete = (e) => {
    e.preventDefault();
    if (comment.user._id !== profile?._id && profile?.role === "admin") {
      dispatch(actionCreators.deleteOtherComment(comment._id));
    } else if (comment.user._id === profile?._id) {
      dispatch(actionCreators.deleteComment(comment._id));
    } else {
      toast.warn("You do not permission to perform this task!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className={`${styles.comment_div} ${theme === "light" ? styles.light_comment_div : styles.dark_comment_div}`}>
      {show && <ConfirmModal setShow={setShow} text="Delete" onDelete={onDelete} />}
      <div className={styles.comment_user_div}>
        <div className={styles.flex_div}>
          <div className={styles.dp_div}>
            <Image
              src={comment.user.profilepic}
              alt={comment.user.name}
              layout="fill"
            />
          </div>
          <h3 className={styles.comment_user_name}>{comment.user.name}</h3>
        </div>
        {(comment.user._id === profile?._id || profile?.role === "admin") && <div className={styles.operations}>
          <FaEdit
            className={`${styles.operation_icons} ${styles.operations_edit_icon}`}
            onClick={onEditClick}
          />
          <FaTrash
            className={`${styles.operation_icons} ${styles.operations_delete_icon}`}
            onClick={onDeleteClick}
          />
        </div>}
      </div>

      <div className={styles.comment_details_div}>
        <h4 className={styles.comment_title}>{comment.title}</h4>
        {comment.comment?.map((c) => {
          return (
            <div key={c._id} className={styles.solution_div}>
              <h4 className={styles.comment_subtitle}>{c.subtitle}</h4>
              <pre className="line-numbers">
                <code className={`language-${c.language}`}>{c.code}</code>
              </pre>
            </div>
          );
        })}
      </div>

      <div className={styles.likes_div}>
        <div className={styles.icon_div}>
          {comment.likes.includes(profile?._id) ? (
            <AiFillHeart
              className={`${styles.like_icons} ${styles.liked_icon}`}
              onClick={onUnlike}
            />
          ) : onHover ? (
            <AiFillHeart
              className={`${styles.like_icons} ${styles.liked_icon}`}
              onClick={onLike}
              onMouseLeave={onBlurHandler}
            />
          ) : (
            <AiOutlineHeart
              className={`${styles.like_icons} ${styles.not_liked_icon}`}
              onMouseEnter={onFocusHandler}
            />
          )}
          <p className={styles.comment_time}>Posted {timeAgo && timeAgo.format(comment.createdAt)}</p>
        </div>
        <p className={styles.likes_count}>{comment.likes.length} likes</p>
      </div>
    </div>
  );
};

export default Comment;
