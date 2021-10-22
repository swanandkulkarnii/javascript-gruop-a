import React from "react";

const Edit = (props) => {
  return (
    <button className=" btn btn-outline-success" {...props.other}>
      {props.buttonName}
    </button>
  );
};

export default Edit;
