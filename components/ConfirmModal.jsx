import React from 'react';
import ReactDom from "react-dom";

import styles from "../styles/confirmModal.module.css";

const ConfirmModal = ({setShow, text, onEdit, onDelete}) => {

  const onCancel = (e)=> {
    e.preventDefault();
    setShow(false);
  }

  return ReactDom.createPortal(
    <div className={styles.overlay}>
        <div className={styles.modal}>
            <h2 className={styles.modalText}>Are You sure you want to {text}?</h2>
            <div className={styles.modal_btn_div}>
                <button className={styles.cancel_btn} onClick={onCancel}>Cancel</button>
                <button className={styles.action_btn} onClick={onEdit ? onEdit : onDelete}>Confirm</button>
            </div>
        </div>
    </div>,
    document.getElementById("modal-root")
  )
}

export default ConfirmModal