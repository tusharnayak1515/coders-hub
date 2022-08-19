import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import styles from "../styles/content.module.css";

const Content = ({edit, content, myContent, setMyContent, updateCount }) => {
  const [thisContent, setThisContent] = useState({
    _id: (content && content._id) ? content._id : undefined,
    subtitle: (content && content.subtitle) ? content.subtitle : "",
    language: (content && content.language) ? content.language : "",
    code: (content && content.code) ? content.code : "",
  });

  const contentChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setThisContent({ ...thisContent, [name]: value });
  };

  const confirmContent = (e) => {
    // console.log("thisContent: ", thisContent);
    e.preventDefault();
    updateCount(e);
    if(!content) {
      // console.log("yes: ",content);
      setMyContent([...myContent, thisContent]);
      if(edit) {
        setThisContent({_id: undefined, subtitle: "", language: "", code: ""});
      }
    }
    else {
      let contentarr = [];
      contentarr = myContent.map((c)=> {
        if(c._id === thisContent._id) {
          return thisContent;
        }
        return c;
      })
      // console.log("....");
      // setMyContent((mycontent)=> {
      //   mycontent.map((c1, ind)=> {
      //     console.log("c1: ", c1);
      //     console.log("this: ", thisContent);
      //     console.log("equality: ", ind === index);
      //     if(c1 === thisContent) {
      //       return thisContent;
      //     }
      //     else {
      //       return c1;
      //     }
      //   })
      // });
      // console.log(contentarr);
      setMyContent(contentarr);
    }
  };

  // useEffect(()=> {
  //   console.log("content: ",content);
  //   console.log("thisContent: ",thisContent);
  //   console.log("myContent.length: ",myContent.length);
  //   console.log("myContent: ",myContent);
  //   console.log(myContent.includes(thisContent));
  // }, [myContent]);

  // console.log("thisContent: ",thisContent);
  // console.log("myContent: ",[...myContent]);
  // console.log("present: ",myContent.includes(thisContent));

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
      {(!content && myContent.includes(thisContent) === false) && (
        <FaPlus className={styles.addContentIcon} onClick={confirmContent} />
      )}
      {(content && myContent.includes(thisContent) === false) && (
        <FaPlus className={styles.addContentIcon} onClick={confirmContent} />
      )}
    </div>
  );
};

export default Content;
