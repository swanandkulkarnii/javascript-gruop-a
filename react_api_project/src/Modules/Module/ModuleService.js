import React from 'react'
import Td from '../../Shared/UI/Table/Td';
import Edit from '../../Shared/UI/Buttons/Edit';
import Delete from '../../Shared/UI/Buttons/Delete';
const ModuleService = () => {
    const database = JSON.parse(localStorage.getItem('Proj_Module_Api'));
    const editHandler = (pid) =>{
        
    }
    const deleteHandler = (pid) =>{
    }
    
    const moduleD = database.map((value, index)=>{
            return value.modules
    });
    console.log(moduleD);
    if(database!==null){
        return (
            <tbody >
            {
                moduleD.map((moduleData, index)=>{
                    return(
                        moduleD[index].map((mdouleObj)=>{
                            return(
                            <tr key={index}>
                                <Td data = {mdouleObj.moduleTitle}></Td>
                                <Td data = {mdouleObj.moduleDesc}></Td>
                                <Td><Edit onClick={editHandler(mdouleObj.mid)} buttonName = "Edit"></Edit></Td>
                                <Td><Delete onClick={deleteHandler(mdouleObj.mid)} buttonName = "Delete"></Delete></Td>
                            </tr>)
                        })
                    );
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

export default ModuleService
