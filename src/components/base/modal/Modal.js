import './Modal.css';
import React from "react";
import {createPortal} from "react-dom";
const Backdrop = ({ close }) => {
  return (
    <div className="backdrop" onClick={close} />
  )
};

const ModalOverlay = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal__content">{children}</div>
    </div>
  )
};

const portalElement = document.querySelector('#overlays');
const Modal = ({ children, close }) => {
  return (
    <React.Fragment>
      {createPortal(<Backdrop close={close}/>, portalElement)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </React.Fragment>
  )
}

export default Modal;
