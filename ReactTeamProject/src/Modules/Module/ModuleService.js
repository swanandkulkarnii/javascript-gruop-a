import React from 'react'
import Td from '../../Shared/UI/Table/Td';
import Edit from '../../Shared/UI/Buttons/Edit';
import Delete from '../../Shared/UI/Buttons/Delete';
const ModuleService = (props) => {
    const database = JSON.parse(localStorage.getItem('Proj_Module_Api'));
    
    const moduleD = database.map((value, index)=>{
            return value.modules;
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
                                <Td>{mdouleObj.mid}</Td>
                                <Td><Edit other = {{onClick:() => {props.onModuleEdit(mdouleObj.mid)}}} buttonName = "Edit"></Edit></Td>
                                <Td><Delete other = {{onClick:() => {props.onModuleDelete(mdouleObj.mid)}}} buttonName = "Delete"></Delete></Td>
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
