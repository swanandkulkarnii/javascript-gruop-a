import React from "react";

export const ApiResponse = (props) => {
  const responses = [
    "200 OK",
    "201 CREATED",
    "204 NO CONTENT",
    "400 BAD REQUEST",
    "401 UNAUTHORIZED",
    "403 FORBIDDEN",
    "404 NOT FOUND",
    "405 METHOD NOT ALLOWED",
    "406 NOT ACCEPTABLE",
    "409 CONFLICT",
    "415 UNSUPPORTED MEDIA TYPE",
    "500 INTERNAL SERVER ERROR",
  ];

  return (
    <>
      <div className="form-group mt-3">
        {" "}
        Response
        <select
          className="form-control"
          onChange={props.onChange}
          value={props.value}
        >
          <option>Select Response</option>
          {responses.map((value) => {
            return <option value={value}>{value}</option>;
          })}
        </select>
      </div>
    </>
  );
};
