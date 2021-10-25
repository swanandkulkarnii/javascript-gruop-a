import React from 'react';
const Input = React.forwardRef((props) => {
    return (
        <div className="form-group mt-3">
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input} className="form-control" value={props.value} onChange={props.onChange}/>
        </div>
    );
});

export default Input