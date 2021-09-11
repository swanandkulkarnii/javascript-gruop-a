import React from 'react'
import Delete from '../../Shared/UI/Buttons/Delete';
import Edit from '../../Shared/UI/Buttons/Edit';
import Td from '../../Shared/UI/Table/Td';
const ProjectService = () => {
    const database = JSON.parse(localStorage.getItem('Proj_Module_Api'));
    const editHandler = (pid) =>{
        
    }
    const deleteHandler = (pid) =>{
    }
    if(database!==null){
        return (
            <tbody >
            {
                database.map((value, index)=>{
                    return(
                    <tr key={index}>
                        <Td data = {value.projTitle}></Td>
                        <Td data = {value.projDesc}></Td>
                        <Td data = {value.projImg}></Td>
                        <Td><Edit onClick={editHandler(value.pid)} buttonName = "Edit"></Edit></Td>
                        <Td><Delete onClick={deleteHandler(value.pid)} buttonName = "Delete"></Delete></Td>
                    </tr>);
                })
            }
            </tbody>
        )
    }
    else
    {
        return(<tbody></tbody>)
    }
}

export default ProjectService;
