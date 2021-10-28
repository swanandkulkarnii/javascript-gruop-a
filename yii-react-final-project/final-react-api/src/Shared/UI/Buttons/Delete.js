import React from 'react'
import { AiFillDelete } from "react-icons/ai";
const Delete = (props) => {
    return (
        <button className="btn btn-danger" {...props.other}> 
            <AiFillDelete/> &nbsp;
            {props.buttonName}
        </button>
    )
}

export default Delete