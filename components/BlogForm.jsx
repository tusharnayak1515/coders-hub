import React, { useEffect, useState } from "react";

import styles from "../styles/blogForm.module.css";
import Content from "./Content";

const BlogForm = () => {
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

//   useEffect(() => {
//     setBlogDetails({...blogDetails, content: myContent});
//   }, [count]);

  useEffect(() => {
    setBlogDetails({...blogDetails, content: myContent});
  }, [myContent.length]);

  useEffect(()=> {
    console.log(blogDetails.content);
  }, [blogDetails.content])

  return (
    <div className={styles.blogForm}>
      <div className={styles.pair}>
        <label htmlFor="title">Title</label>
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
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Blog Description"
          value={blogDetails.description}
          onChange={onChangeHandler}
        />
      </div>

      <div className={styles.pair}>
        <label htmlFor="content">
          Content
        </label>
        <Content updateCount={updateCount} myContent={myContent} setMyContent={setMyContent} />
        {blogDetails.content.map((c, index) => {
          return (<Content key={index} updateCount={updateCount} myContent={myContent} setMyContent={setMyContent} />);
        })}
      </div>
    </div>
  );
};

export default BlogForm;
