import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionCreators } from "../redux";
import Content from "./Content";
import { useRouter } from "next/router";

import styles from "../styles/blogForm.module.css";

const BlogForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [myContent, setMyContent] = useState([]);
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    description: "",
    content: myContent,
    category: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBlogDetails({ ...blogDetails, [name]: value });
  };

  const updateCount = (e) => {
    e.preventDefault();
    setCount((count) => count + 1);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      blogDetails.title.length >= 3 &&
      blogDetails.title.length <= 100 &&
      blogDetails.category.length >= 3 &&
      blogDetails.category.length <= 15
    ) {
        dispatch(actionCreators.addBlog(blogDetails));
        router.replace("/");
    }
    else {
        if(blogDetails.title.length < 3 || blogDetails.title.length > 100) {
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
        else {
            toast.warn("Category must be minimum 3 and maximum 15 characters long!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    }
  };

  useEffect(() => {
    setBlogDetails({ ...blogDetails, content: myContent });
  }, [myContent.length]);

  useEffect(() => {
    console.log(blogDetails);
  }, [blogDetails.content]);

  return (
    <div className={styles.blogForm}>
      <div className={styles.pair}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Blog Title"
          value={blogDetails.title}
          onChange={onChangeHandler}
        />
      </div>

      <div className={styles.pair}>
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          name="description"
          id="description"
          placeholder="Blog Description"
          value={blogDetails.description}
          onChange={onChangeHandler}
        />
      </div>

      <div className={styles.pair}>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Category"
          value={blogDetails.category}
          onChange={onChangeHandler}
        />
      </div>

      <div className={styles.pair}>
        <label htmlFor="content">Content:</label>
        <Content
          updateCount={updateCount}
          myContent={myContent}
          setMyContent={setMyContent}
        />
        {blogDetails.content.map((c, index) => {
          return (
            <Content
              key={index}
              updateCount={updateCount}
              myContent={myContent}
              setMyContent={setMyContent}
            />
          );
        })}
      </div>

      <div className={styles.pair}>
        <button onClick={onSubmitHandler}>POST</button>
      </div>
    </div>
  );
};

export default BlogForm;
