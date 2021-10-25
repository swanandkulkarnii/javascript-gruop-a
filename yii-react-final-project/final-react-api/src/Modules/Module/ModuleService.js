import React from 'react'
import Td from '../../Shared/UI/Table/Td';
import Edit from '../../Shared/UI/Buttons/Edit';
import Delete from '../../Shared/UI/Buttons/Delete';
const ModuleService = (props) => {
    if(props.database!==null){
        return (
            <tbody>
                {
                    props.database.map((value,index)=>{
                                return(
                                    <tr key={index}>
                                        <Td data = {value.title}></Td>
                                        <Td data = {value.description}></Td>
                                        <Td data = {value.project.title}></Td>
                                        <Td><Edit other = {{onClick:() => {props.onModuleEdit(value.module_id)}}}  buttonName = "Edit"></Edit></Td>
                                        <Td><Delete other = {{onClick:() => {props.onModuleDelete(value.module_id)}}} buttonName = "Delete"></Delete></Td>
                                    </tr>
                                )
                            })
                }
                {/* <PopupModal
                    trigger={buttonPopup}
                    settrigger={setButtonPopup}
                    title = "Add Module"
                >
                    <ModuleForm></ModuleForm>
                </PopupModal>                             */}
            </tbody>
        )
    }
    else
    {
        return(<tbody></tbody>)
    }
}

export default ModuleService