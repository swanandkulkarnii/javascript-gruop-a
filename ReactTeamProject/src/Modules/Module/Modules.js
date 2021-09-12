import React, { useState } from 'react'
import PopupModal from '../../Shared/UI/PopupModal/PopupModal';
import ModuleService from './ModuleService';
import ModuleForm from './ModuleForm';

const Modules = () => {
    const [buttonPopup, setButtonPopup] = useState(false);
    
    const deleteModuleHandler = (mid) =>{
        console.log(mid);
    }
    const editModuleHandler = (mid) =>{
        console.log(mid);
    }
    return (
        <div className="container">
            <h1 className="text-center"> Add New Modules</h1>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => setButtonPopup(true)}
            >
                Add New Module
            </button>
            <table className="table">
                <thead>
                    <th>Module Title</th>
                    <th>Module Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </thead>
                {<ModuleService onModuleDelete = {deleteModuleHandler} onModuleEdit = {editModuleHandler}></ModuleService>}
            </table>
            <PopupModal
                trigger={buttonPopup}
                settrigger={setButtonPopup}
            >
                <ModuleForm></ModuleForm>
            </PopupModal>
        </div>
    )
}

export default Modules
