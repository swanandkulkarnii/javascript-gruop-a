import React from 'react'
import { AiTwotoneEdit } from "react-icons/ai";
const Edit = (props) => {
    return (
        <button className="btn btn-success" {...props.other}>
            <AiTwotoneEdit /> &nbsp;
            {props.buttonName}
        </button>
    )
}

export default Edit