import React, { useState } from 'react'
import Td from '../../Shared/UI/Table/Td';
import Edit from '../../Shared/UI/Buttons/Edit';
import Delete from '../../Shared/UI/Buttons/Delete';
import PopupModal from '../../Shared/UI/PopupModal/PopupModal';
import ModuleForm from './ModuleForm';
const ModuleService = (props) => {
    const database = JSON.parse(localStorage.getItem('Proj_Module_Api'));

    const [buttonPopup, setButtonPopup] = useState(false);
    if(database!==null){
        return (
            <tbody>
                {
                    database.map((value,index)=>{
                        return(
                            value.modules.map((moduleData,index)=>{
                                return(
                                    <tr key={index}>
                                        <Td data = {moduleData.moduleTitle}></Td>
                                        <Td data = {moduleData.moduleDesc}></Td>
                                        <Td><Edit other = {{onClick:() => {props.onModuleEdit(moduleData.mid,value.pid)},onClick:() => {setButtonPopup(true)}}}  buttonName = "Edit"></Edit></Td>
                                        <Td><Delete other = {{onClick:() => {props.onModuleDelete(moduleData.mid,value.pid)}}} buttonName = "Delete"></Delete></Td>
                                    </tr>
                                )
                            })
                        )
                    })
                }
                <PopupModal
                    trigger={buttonPopup}
                    settrigger={setButtonPopup}
                    title = "Add Module"
                >
                    <ModuleForm></ModuleForm>
                </PopupModal>                            
            </tbody>
        )
    }
    else
    {
        return(<tbody></tbody>)
    }
}

export default ModuleService
