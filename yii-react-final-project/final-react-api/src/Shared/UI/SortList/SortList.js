import React from 'react'

const SortList = (props) => {
    return (
        <option value = {props.value}>{props.children}</option>
    );
}

export default SortList
