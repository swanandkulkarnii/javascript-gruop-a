import React from "react";

export const ApiRequest = (props) => {
  const requests = ["get", "batchUpdate", "create"];

  return (
    <>
      <div className="form-group mt-3">
        {" "}
        Request
        <select
          className="form-control"
          onChange={props.onChange}
          value={props.value}
        >
          <option>Select Request</option>
          {requests.map((value) => {
            return <option value={value}>{value}</option>;
          })}
        </select>
      </div>
    </>
  );
};
