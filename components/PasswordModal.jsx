import React, { useState } from "react";
import ReactDom from "react-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionCreators } from "../redux";

import styles from "../styles/passwordModal.module.css";

const PasswordModal = ({ setShow, theme }) => {
  const dispatch = useDispatch();
  const [passwordDetails, setPasswordDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPasswordDetails({ ...passwordDetails, [name]: value });
  };

  const onCancel = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const onConfirm = (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    const { oldPassword, newPassword, confirmPassword } = passwordDetails;
    if (
      passwordRegex.test(oldPassword) &&
      passwordRegex.test(newPassword) &&
      passwordRegex.test(confirmPassword) &&
      (oldPassword !== newPassword) && (newPassword === confirmPassword)
    ) {
      dispatch(actionCreators.changePassword(passwordDetails));
      setShow(false);
    } else {
      if (
        !passwordRegex.test(oldPassword) ||
        !passwordRegex.test(newPassword) ||
        !passwordRegex.test(confirmPassword)
      ) {
        toast.warn(
          "Password must be minimum 8 characters and must contain minimum 1 uppercase,lowercase,special character and number",
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
      } else if(oldPassword === newPassword) {
        toast.warn("New password should be different from old password!", {
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
        toast.warn("New Password and Confirm Password do not match!", {
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

  return ReactDom.createPortal(
    <div className={styles.password_overlay}>
      <div className={`${styles.password_modal} ${theme === "light" ? styles.light_password_modal : styles.dark_password_modal}`}>
        <div className={styles.password_input_div}>
          <input
            type="password"
            placeholder="Old Password"
            name="oldPassword"
            value={passwordDetails.oldPassword}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={passwordDetails.newPassword}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={passwordDetails.confirmPassword}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.password_btn_div}>
          <button className={styles.password_cancel_btn} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.password_confirm_btn} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default PasswordModal;
