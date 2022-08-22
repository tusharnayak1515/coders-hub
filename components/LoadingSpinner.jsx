import React from 'react';
import ReactDom from 'react-dom';
import Image from 'next/image';
import loadingSpinner from "../public/static/images/loading.svg";

import styles from "../styles/loadingSpinner.module.css";

const LoadingSpinner = () => {
  return ReactDom.createPortal(
    <div className={styles.loading_backdrop}>
        <div className={styles.loading_modal}>
            <Image src={loadingSpinner} alt="Loading Spinner" />
        </div>
    </div>,
    document.getElementById("modal-root")
  )
}

export default LoadingSpinner;