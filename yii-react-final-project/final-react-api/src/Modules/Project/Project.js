import React, { useState, useEffect } from 'react';
import PopupModal from '../../Shared/UI/PopupModal/PopupModal';
import Input from '../../Shared/UI/Input/Input';
import ProjectForm from './ProjectForm';
import ProjectService from './ProjectService';
import axios from 'axios';
import Pagination from '../../Shared/UI/Pagination/Pagination';
import Add from '../../Shared/UI/Buttons/Add';
const Project = () => {
    const [project_data, setProjectData] = useState([]);
    const [editProjectData, setEditProjectData] = useState({isEdit:false,project_id:''});
    const [buttonPopup, setButtonPopup] = useState(false);
    const [searchProjectTitle, setSearchProjectTitle] = useState('');
    //Pagination Variables 
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(8);
    useEffect(()=>{
        loadProjectData()
    },[]);
    const loadProjectData = async() => {
        await axios.get("http://localhost:8888/project/read").then(res => setProjectData(res.data.items));
    }
    //Pagination Logic
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = project_data.slice(
        indexOfFirstProject,
        indexOfLastProject
    );
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    async function submitProjectHandler(projTitle,projDesc){
        if(projTitle!=='' && projDesc!=='')
        {
            setButtonPopup(false);
            setEditProjectData(true);
            await axios.post('http://localhost:8888/project/create',{
                "title":projTitle,
                "description":projDesc
            });
            loadProjectData();
        }
        else{
            alert("Please Fill All Fields");
        }
    }
    const searchProjectTitleHandler = async (event) =>{
        setSearchProjectTitle(event.target.value);
        const response = await axios.get(`http://localhost:8888/project?filter[title][like]=${searchProjectTitle}`);
        setProjectData(response.data.items);
    }
    const deleteHandler = async (pid) =>{
        await axios.put(`http://localhost:8888/project/update?id=${pid}`,{'is_delete':1}).then(()=>{
            console.log("DELETE Successfully");
        });
        loadProjectData();
    }
    const editHandler = async (pid) =>{
        setEditProjectData({isEdit:true,project_id:pid});
        setButtonPopup(true);
    }
    const updateProjectHandler = async(projId,projTitle,projDesc) =>{
        setButtonPopup(false);
        await axios.put(`http://localhost:8888/project/update?id=${projId}`,
        {"title":projTitle,"description":projDesc}).then(()=>{console.log("Updated Successfully")});
        loadProjectData();
    }
    return (
        <div className="container">   
            <h1 className="text-center"> Add New Projects</h1>
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
            <Add
                other = {{onClick:()=>{ setButtonPopup(true); setEditProjectData(false); }}}
                buttonName = "Add New Project"
            />
            <table className="table table-secondary table-striped">
                <thead>
                    <th>Project Title</th>
                    <th>Project Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </thead>
                {<ProjectService database = {currentProjects} onEdit = {editHandler} onDelete = {deleteHandler}></ProjectService>}
            </table>
            <PopupModal
                trigger={buttonPopup}
                settrigger={setButtonPopup}
                title = "Add Project"
            >
                <ProjectForm addProject={submitProjectHandler} updateProject={updateProjectHandler} isEdit={editProjectData}></ProjectForm>
            </PopupModal>
            <Pagination
                dataPerPage={projectsPerPage}
                totalData={project_data.length}
                paginate={paginate}
            />
        </div>
    )
}

export default Project