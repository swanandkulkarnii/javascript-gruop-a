import React, { useState, useEffect } from 'react';
import PopupModal from '../../Shared/UI/PopupModal/PopupModal';
import ProjectForm from './ProjectForm';
import ProjectService from './ProjectService';
const Project = () => {
    const [buttonPopup, setButtonPopup] = useState(false);
    useEffect(()=>{
        if(localStorage.getItem('Proj_Module_Api') == null)
        {
            localStorage.setItem("Proj_Module_Api",JSON.stringify([]));
        }
    },[]);
    
    var removeByAttr = function(arr, attr, value){
        var i = arr.length;
        while(i--){
           if( arr[i] 
               && arr[i].hasOwnProperty(attr) 
               && (arguments.length > 2 && arr[i][attr] === value ) ){ 
    
               arr.splice(i,1);
    
           }
        }
        return arr;
    }

    const deleteHandler = (pid) =>{
        
        var project_data = JSON.parse(localStorage.getItem("Proj_Module_Api"));
        project_data=removeByAttr(project_data,"pid",pid);
        localStorage.setItem('Proj_Module_Api',JSON.stringify(project_data));
    
    }
    const editHandler = (pid) =>{
        console.log("Edit"+pid);
    } 
    return (

        <div className="container">   
            <h1 className="text-center"> Add New Projects</h1>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => setButtonPopup(true)}
            >
                Add New Project
            </button>
            <table className="table">
                <thead>
                    <th>Project Title</th>
                    <th>Project Description</th>
                    <th>Project Image</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </thead>
                {<ProjectService onEdit = {editHandler} onDelete = {deleteHandler}></ProjectService>}
            </table>
            <PopupModal
                trigger={buttonPopup}
                settrigger={setButtonPopup}
            >
                <ProjectForm></ProjectForm>
            </PopupModal>
        </div>
        
    )
}

export default Project
