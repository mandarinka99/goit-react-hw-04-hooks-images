import { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ pageURL, alt, onClose }) => {

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      const body = document.querySelector("body");
      body.style.overflow = "auto";
    }
  });

  const handleKeyDown = e => e.code === "Escape" && onClose();

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={pageURL} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  pageURL: PropTypes.string,
  alt: PropTypes.string,
};

export default Modal;
