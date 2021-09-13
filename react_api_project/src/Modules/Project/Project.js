import React, { useState, useEffect } from 'react';
import PopupModal from '../../Shared/UI/PopupModal/PopupModal';
import Td from '../../Shared/UI/Table/Td';
import Input from '../../Shared/UI/Input/Input';
import ProjectForm from './ProjectForm';
import ProjectService from './ProjectService';

const Project = () => {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [searchProjectTitle, setSearchProjectTitle] = useState('');
    const [searchResult, setSearchResult] = useState('');

    useEffect(()=>{
        if(localStorage.getItem('Proj_Module_Api') == null)
        {
            localStorage.setItem("Proj_Module_Api",JSON.stringify([]));
        }
    },[]);
    
    const searchProjectTitleHandler = (event) =>{
        setSearchProjectTitle(event.target.value);
        var project_data = JSON.parse(localStorage.getItem("Proj_Module_Api"));
	    for(var i=0; i<project_data.length;i++)
	    {
            
		    if(project_data[i].projTitle.toUpperCase().includes(searchProjectTitle.toUpperCase()))
		    {
                setSearchResult(
                    <tr>
                        <Td data = {`${JSON.stringify(project_data[i].projTitle)}`}></Td>
                        <Td data = {`${JSON.stringify(project_data[i].projDesc)}`}></Td>
                        <Td><a href={`${JSON.stringify(project_data[i].projImg)}`}>Image</a></Td>
                    </tr>)
            }
	    }
    }

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
        window.location.reload(true)
    }
    const editHandler = (pid) =>{
        console.log("Edit"+pid);
    }

    return (

        <div className="container">   
            <h1 className="text-center"> Add New Projects</h1>
            <table>
                <thead>
                    <th>Project Title</th>
                    <th>Project Description</th>
                    <th>Project Image</th>
                </thead>
                {searchResult}
            </table>
            <Input 
                label="Search" 
                input={{
                    id : 'search_project',
                    type : 'search',
                    placeholder:'Enter Project Title',
                    name:"searchProject"
                }}
                value = {searchProjectTitle}
                onChange={searchProjectTitleHandler}
            ></Input>
            
            <button
                type="button"
                className="btn btn-primary my-5"
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
                title = "Add Project"
            >
                <ProjectForm></ProjectForm>
            </PopupModal>
        </div>
        
    )
}

export default Project
