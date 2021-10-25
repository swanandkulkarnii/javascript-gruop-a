import React from 'react'

const Edit = (props) => {
    return (
        <button className="btn btn-success" {...props.other}>
            {props.buttonName}
        </button>
    )
}

export default Edit