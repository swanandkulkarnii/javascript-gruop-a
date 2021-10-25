import React from 'react'

const Td = (props) => {
    return (
        <td>
            {props.data}
            {props.children}
        </td>
    )
}

export default Td