import React, { useState } from 'react'
import PopupModal from '../../Shared/UI/PopupModal/PopupModal';
import ModuleService from './ModuleService';
import ModuleForm from './ModuleForm';
import Input from '../../Shared/UI/Input/Input';
import Td from '../../Shared/UI/Table/Td';
const Modules = () => {
    const [buttonPopup, setButtonPopup] = useState(false);

    const [searchModuleTitle, setSearchModuleTitle] = useState('');
    const [searchResult, setSearchResult] = useState('');
    
    const searchModuleTitleHandler = (event) =>{
        setSearchModuleTitle(event.target.value);
        const project_data = JSON.parse(localStorage.getItem('Proj_Module_Api'));
	    for(var i=0; i<project_data.length;i++)
	    {
		    for(var j = 0; j<project_data[i].modules.length;j++)
		    {
			    if(project_data[i].modules[j].moduleTitle.toUpperCase().includes(searchModuleTitle.toUpperCase()))
			    {
                    setSearchResult(
                    <tr>
                        <Td data = {`${JSON.stringify(project_data[i].modules[j].moduleTitle)}`}></Td>
                        <Td data = {`${JSON.stringify(project_data[i].modules[j].moduleDesc)}`}></Td>
                    </tr>)
                    console.log(`${JSON.stringify(project_data[i].modules[j].moduleTitle)}`);
			    }
		    }	
	    }
    };

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

    const deleteModuleHandler = (mid,pid) =>{
        console.log(mid,pid);
        var project_data = JSON.parse(localStorage.getItem("Proj_Module_Api"));
		for(var i=0; i<project_data.length;i++)
		{
			if(project_data[i].pid === pid)
			{
				project_data[i].modules = removeByAttr(project_data[i].modules,"mid",mid);
			}	
		}
		localStorage.setItem('Proj_Module_Api',JSON.stringify(project_data));
        window.location.reload(true);
    }
    const editModuleHandler = (mid,pid) =>{
        console.log(mid,pid);
    }
    return (
        <div className="container">
            <h1 className="text-center"> Add New Modules</h1>
            <table>
                <thead>
                    <th>Module Title</th>
                    <th>Module Description</th>
                </thead>
                {searchResult}
            </table>
            <Input 
                label="Search" 
                input={{
                    id : 'search_module',
                    type : 'search',
                    placeholder:'Enter Module Title',
                    name:"searchModule"
                }}
                value = {searchModuleTitle}
                onChange={searchModuleTitleHandler}
            ></Input>
            <button
                type="button"
                className="btn btn-primary my-5"
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
                title = "Add Module"
            >
                <ModuleForm></ModuleForm>
            </PopupModal>
        </div>
    )
}

export default Modules