import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionCreators } from "../redux";
import Content from "./Content";
import { useRouter } from "next/router";

import styles from "../styles/blogForm.module.css";

const BlogForm = ({ blog }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [count, setCount] = useState(
    blog && blog.content ? blog.content.length : 1
  );
  const [myContent, setMyContent] = useState(
    blog && blog.content.length !== 0 ? blog.content : []
  );
  const [blogDetails, setBlogDetails] = useState({
    id: blog ? blog._id : null,
    title: blog && blog.title ? blog.title : "",
    description: blog && blog.description ? blog.description : "",
    content: myContent,
    category: blog && blog.category ? blog.category : "",
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
    } else {
      if (blogDetails.title.length < 3 || blogDetails.title.length > 100) {
        toast.warn("Title must be minimum 3 and maximum 100 characters long!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.warn(
          "Category must be minimum 3 and maximum 15 characters long!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    }
  };

  const onEditHandler = (e) => {
    e.preventDefault();
    if (
      blogDetails.title.length >= 3 &&
      blogDetails.title.length <= 100 &&
      blogDetails.category.length >= 3 &&
      blogDetails.category.length <= 15
    ) {
      // console.log(blogDetails);
      dispatch(actionCreators.editBlog(blogDetails));
      router.replace(`/blogs/${blog._id}`);
    } else {
      if (blogDetails.title.length < 3 || blogDetails.title.length > 100) {
        toast.warn("Title must be minimum 3 and maximum 100 characters long!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.warn(
          "Category must be minimum 3 and maximum 15 characters long!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    }
  };

  useEffect(() => {
    // console.log("yes1: ", myContent);
    setBlogDetails({ ...blogDetails, content: myContent });
  }, [myContent]);

  // useEffect(() => {
  //   console.log("rerender");
  //   console.log("blogDetails: ", blogDetails);
  // }, [blogDetails.content]);

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
        {!blog && <Content
          updateCount={updateCount}
          myContent={myContent}
          setMyContent={setMyContent}
        />}
        {!blog && blogDetails.content.map((c, index) => {
          return (
            <Content
              key={index}
              index={index}
              updateCount={updateCount}
              myContent={myContent}
              setMyContent={setMyContent}
            />
          );
        })}
        {blog && <Content
          edit={true}
          updateCount={updateCount}
          myContent={myContent}
          setMyContent={setMyContent}
        />}
        {blog && blogDetails.content.map((c, index) => {
          return (
            <Content
              content={c}
              key={index}
              index={index}
              updateCount={updateCount}
              myContent={myContent}
              setMyContent={setMyContent}
            />
          );
        })}
        {/* {blog && <Content
          updateCount={updateCount}
          myContent={myContent}
          setMyContent={setMyContent}
        />} */}
        {/* {blogDetails.content.length !== 0 && (
          <Content
            updateCount={updateCount}
            myContent={myContent}
            setMyContent={setMyContent}
          />
        )} */}
      </div>

      <div className={styles.pair}>
        <button onClick={blog ? onEditHandler : onSubmitHandler}>
          {blog ? "EDIT" : "POST"}
        </button>
      </div>
    </div>
  );
};

export default BlogForm;
