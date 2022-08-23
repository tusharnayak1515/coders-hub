import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

import styles from "../styles/commentContent.module.css";

const Comment_Content = ({ edit, content, myComment, setMyComment, theme }) => {
  const [thisContent, setThisContent] = useState({
    _id: content && content._id ? content._id : undefined,
    subtitle: content && content.subtitle ? content.subtitle : "",
    language: content && content.language ? content.language : "Language",
    code: content && content.code ? content.code : "",
  });

  const contentChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setThisContent({ ...thisContent, [name]: value });
  };

  const confirmContent = (e) => {
    e.preventDefault();
    if (!content) {
      setMyComment([...myComment, thisContent]);
      if (edit) {
        setThisContent({
          _id: undefined,
          subtitle: "",
          language: "",
          code: "",
        });
      }
    } else {
      let contentarr = [];
      contentarr = myComment.map((c) => {
        if (c._id === thisContent._id) {
          return thisContent;
        }
        return c;
      });
      setMyComment(contentarr);
    }
  };

  return (
    <div className={`${styles.comment_content} ${theme === "light" ? styles.light_comment_content : styles.dark_comment_content}`}>
      <input
        type="text"
        name="subtitle"
        id="subtitle"
        placeholder="Subtitle"
        value={thisContent.subtitle}
        onChange={contentChangeHandler}
      />
      <select
        name="language"
        id="language"
        value={thisContent.language}
        onChange={contentChangeHandler}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="c">C</option>
        <option value="markup">HTML</option>
        <option value="css">Css</option>
        <option value="other">Other</option>
      </select>
      <textarea
        type="text"
        name="code"
        id="code"
        placeholder="Code"
        value={thisContent.code}
        onChange={contentChangeHandler}
      />
      {!content && myComment.includes(thisContent) === false && (
        <FaPlus className={styles.addContentIcon} onClick={confirmContent} />
      )}
      {content && myComment.includes(thisContent) === false && (
        <FaPlus className={styles.addContentIcon} onClick={confirmContent} />
      )}
    </div>
  );
};

export default Comment_Content;
