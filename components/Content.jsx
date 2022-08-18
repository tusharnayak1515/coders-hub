import React, { useState } from "react";
import { FaPlus } from 'react-icons/fa';

import styles from "../styles/content.module.css";

const Content = ({myContent, setMyContent, updateCount}) => {
  const [thisContent, setThisContent] = useState({ subtitle: "", language: "", code: "" });

  const contentChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setThisContent({...thisContent, [name]: value});
  };

  const confirmContent = (e)=> {
    console.log("thisContent: ",thisContent);
    e.preventDefault();
    updateCount(e);
    setMyContent([...myContent, thisContent]);
  }

  return (
    <div className={styles.content}>
      <input
        type="text"
        name="subtitle"
        id="subtitle"
        placeholder="Subtitle"
        value={thisContent.subtitle}
        onChange={contentChangeHandler}
      />
      <input
        type="text"
        name="language"
        id="language"
        placeholder="Language"
        value={thisContent.language}
        onChange={contentChangeHandler}
      />
      <textarea
        type="text"
        name="code"
        id="code"
        placeholder="Code"
        value={thisContent.code}
        onChange={contentChangeHandler}
      />
      {!myContent.includes(thisContent) && <FaPlus className={styles.addContentIcon} onClick={confirmContent} />}
    </div>
  );
};

export default Content;
