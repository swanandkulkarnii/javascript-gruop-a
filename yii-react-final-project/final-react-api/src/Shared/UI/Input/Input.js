import React from "react";
const Input = React.forwardRef((props) => {
  return (
    <div className="form-group mt-3">
      <b>
        <label htmlFor={props.input.id}>{props.label}</label>
      </b>
      <input
        {...props.input}
        className="form-control"
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
