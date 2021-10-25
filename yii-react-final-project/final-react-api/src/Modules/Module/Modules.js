import React, { useState, useEffect } from 'react'
import PopupModal from '../../Shared/UI/PopupModal/PopupModal';
import ModuleService from './ModuleService';
import ModuleForm from './ModuleForm';
import Input from '../../Shared/UI/Input/Input';
import axios from 'axios';
import Pagination from '../../Shared/UI/Pagination/Pagination';
const Modules = () => {
    const [moduleData, setModulesData] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [searchModuleTitle, setSearchModuleTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [modulesPerPage] = useState(2);
    useEffect(()=>{
        loadModuleData();
    },[]);
    const loadModuleData = async () =>{
        await axios.get("http://localhost:8888/modules?expand=project").then(res => setModulesData(res.data.items));
    }
    const indexOfLastModules = currentPage * modulesPerPage;
    const indexOfFirstModules = indexOfLastModules - modulesPerPage;
    const currentModules = moduleData.slice(
        indexOfFirstModules,
        indexOfLastModules
    );
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const submitModuleHandler = async (projectId, moduleTitle, moduleDesc) =>{
        if(projectId!=='' && moduleTitle!=='' && moduleDesc!=='')
        {
            setButtonPopup(false);
            await axios.post('http://localhost:8888/modules/create',{
                "project_id":projectId,
                "title":moduleTitle,
                "description":moduleDesc,
            });
            loadModuleData();
        }
        else{
            alert("Please Fill All Fields");
        }
    }
    const searchModuleTitleHandler = async(event) =>{
        setSearchModuleTitle(event.target.value);
        const response = await axios.get(`http://localhost:8888/modules?filter[title][like]=${searchModuleTitle}&expand=project`);
        setModulesData(response.data.items);
    };

    const deleteModuleHandler = async(mid) =>{
        await axios.delete(`http://localhost:8888/modules/delete?id=${mid}`).then(()=>{
            console.log("DELETE Successfully");
        });
        loadModuleData();
    }
    const editModuleHandler = (mid,pid) =>{
        console.log(mid,pid);
    }
    return (
        <div className="container">
            <h1 className="text-center"> Add New Modules</h1>
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
                    <th>Project Title</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </thead>
                {
                    <ModuleService 
                        database = {currentModules} 
                        onModuleDelete = {deleteModuleHandler} 
                        onModuleEdit = {editModuleHandler}></ModuleService>}
            </table>
            <PopupModal
                trigger={buttonPopup}
                settrigger={setButtonPopup}
                title = "Add Module"
            >
                <ModuleForm addModule={submitModuleHandler}></ModuleForm>
            </PopupModal>
            <Pagination
                dataPerPage={modulesPerPage}
                totalData={moduleData.length}
                paginate={paginate}
            />
        </div>
    )
}

export default Modules