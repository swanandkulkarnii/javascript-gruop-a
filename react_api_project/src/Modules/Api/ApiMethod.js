import React from "react";

export const ApiMethod = (props) => {
  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

  return (
    <>
      <div className="form-group">
        <select
          className="form-control"
          onChange={props.onChange}
          value={props.value}
        >
          <option>Select Method</option>
          {methods.map((value) => {
            return <option value={value}>{value}</option>;
          })}
        </select>
      </div>
    </>
  );
};
