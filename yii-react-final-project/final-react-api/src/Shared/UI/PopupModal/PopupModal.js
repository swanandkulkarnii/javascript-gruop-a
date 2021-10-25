import React from 'react'
import "./PopupModal.css";
const PopupModal = (props) => {
    return props.trigger ? (
        <div className="popup-box">
            <div className="box">
                {props.children}
                <button
            className="btn btn-danger mt-5"
            onClick={() => props.settrigger(false)}
          >
            Close
          </button>
            </div>
        </div>) : (
            ""
        );
}

export default PopupModal