import React from "react";
import "./PopupModal.css";
import { AiOutlineClose } from "react-icons/ai";
const PopupModal = (props) => {
  return props.trigger ? (
    <div className="popup-box">
      <div className="box">
        {props.children}
        <button
          className="btn btn-danger mx-3 my-5"
          onClick={() => props.settrigger(false)}
        >
          <AiOutlineClose /> &nbsp; Close
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopupModal;
