import React from "react";

import styles from "../styles/blogPage.module.css";

const Contents = ({content}) => {
  return (
    <div className={styles.c_item}>
      {content.subtitle && content.subtitle !== "" && (
        <h3 className={styles.blog_subtitle}>{content.subtitle}</h3>
      )}
      {(content.code && content.code !== "") && (
        <pre className="line-numbers">
          <code className={`language-${content.language}`}>{content.code}</code>
        </pre>
      )}
    </div>
  );
};

export default Contents;
