import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
const Add = (props) => {
  return (
    <button className="btn btn-success my-5" {...props.other}>
      <AiOutlinePlus /> &nbsp;
      {props.buttonName}
    </button>
  );
};

export default Add;
