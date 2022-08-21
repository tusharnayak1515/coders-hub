import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { actionCreators } from "../redux";
import { toast } from "react-toastify";
const Comment_Content = dynamic(() => import("./Comment_Content"), {
  ssr: false,
});
const ConfirmModal = dynamic(() => import("./ConfirmModal"), {
  ssr: false,
});

import styles from "../styles/commentForm.module.css";

const CommentForm = ({comment}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userReducer, shallowEqual);
  const { blog } = useSelector((state) => state.blogReducer, shallowEqual);
  const [show, setShow] = useState(false);

  const [myComment, setMyComment] = useState((comment && comment.comment.length !== 0) ? comment.comment : []);
  const [commentDetails, setCommentDetails] = useState({
    id: comment ? comment._id : null,
    title: comment && comment.title ? comment.title : "",
    comment: myComment,
    blogId: blog?._id,
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCommentDetails({ ...commentDetails, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (commentDetails.title.length >= 3 && commentDetails.title.length <= 100) {
      dispatch(actionCreators.addComment(commentDetails));
      router.replace(`/blogs/${blog?._id}`);
    } else {
        toast.warn("Title must be minimum 3 and maximum 100 characters long!", {
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

  const editHandler = (e)=> {
    e.preventDefault();
    setShow(true);
  }

  const onEditHandler = (e) => {
    e.preventDefault();
    if (commentDetails.title.length >= 3 && commentDetails.title.length <= 100) {
      // console.log(blogDetails);
      if(comment?.user._id !== profile?._id && profile?.role === "admin") {
        dispatch(actionCreators.editOtherComment(commentDetails));
      }
      else if(comment?.user._id === profile?._id) {
        dispatch(actionCreators.editComment(commentDetails));
      }
      else {
        toast.warn("You do not have permission to perform this task!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      router.replace(`/blogs/${comment.blog}`);
    } else {
        toast.warn("Title must be minimum 3 and maximum 100 characters long!", {
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
    // console.log("yes1: ", myComment);
    setCommentDetails({ ...commentDetails, comment: myComment });
  }, [myComment]);

  return (
    <div className={styles.commentForm}>
      {show && <ConfirmModal setShow={setShow} text="edit" onEdit={onEditHandler} />}
      <div className={styles.comment_pair}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Comment Title"
          value={commentDetails.title}
          onChange={onChangeHandler}
        />
      </div>

      <div className={styles.comment_pair}>
        <label htmlFor="comment">Comment:</label>
        {!comment && <Comment_Content
          myComment={myComment}
          setMyComment={setMyComment}
        />}
        {!comment && commentDetails.comment.map((c, index) => {
          return (
            <Comment_Content
              key={index}
              myComment={myComment}
              setMyComment={setMyComment}
            />
          );
        })}
        {comment && commentDetails.comment.map((c, index) => {
          return (
            <Comment_Content
              content={c}
              key={index}
              myComment={myComment}
              setMyComment={setMyComment}
            />
          );
        })}
        {comment && <Comment_Content
          edit={true}
          myComment={myComment}
          setMyComment={setMyComment}
        />}
      </div>

      <div className={styles.comment_pair}>
        <button onClick={comment ? editHandler : onSubmitHandler}>
          {comment ? "EDIT" : "POST"}
        </button>
      </div>

    </div>
  );
};

export default CommentForm;
