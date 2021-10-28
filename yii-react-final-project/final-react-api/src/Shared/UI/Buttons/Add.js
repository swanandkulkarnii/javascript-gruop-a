import React from 'react'
import { AiFillPlusSquare } from "react-icons/ai";
const Add = (props) => {
    return (
        <button className="btn btn-success my-5" {...props.other}>
            <AiFillPlusSquare /> &nbsp;
            {props.buttonName}
        </button>
    )
}

export default Add
