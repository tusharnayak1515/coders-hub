import React, { useState } from "react";
import ReactDom from "react-dom";
import { FaTrash, FaImage } from "react-icons/fa";

import styles from "../styles/dpModal.module.css";

const DpModal = ({ setShow, profile, userDetails, setUserDetails }) => {
  const [image, setImage] = useState(profile?.profilepic);
  const [dp, setDp] = useState("");

  const onDpChange = (e)=> {
    e.preventDefault();
    setImage(URL.createObjectURL(e.target.files[0]));
    setDp(e.target.files[0]);
  }

  const onRemove = (e) => {
    e.preventDefault();
    setDp("");
    setImage("");
  };

  const onCancel = (e)=> {
    e.preventDefault();
    setShow(false);
  }

  const onConfirm = (e)=> {
    e.preventDefault();
    if(image === profile?.profilepic) {
        setShow(false);
    }
    else {
        setUserDetails({...userDetails, profilepic: dp});
        setShow(false);
    }
  }

  return ReactDom.createPortal(
    <div className={styles.dp_overlay}>
      <div className={styles.dp_modal}>
        <div className={styles.image_preview}>
          {image !== "" && <FaTrash className={styles.remove_image_icon} onClick={onRemove} />}
          {image !== "" ? (
            <img src={image} alt={profile?.name} />
          ) : (
            <label htmlFor="dp">
              <FaImage className={styles.image_icon} />
            </label>
          )}
          <input type="file" name="dp" id="dp" onChange={onDpChange} />
        </div>

        <div className={styles.dp_btn_div}>
            <button className={styles.dp_confirm_btn} onClick={onConfirm}>Confirm</button>
            <button className={styles.dp_cancel_btn} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default DpModal;
