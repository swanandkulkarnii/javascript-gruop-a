import React, { useState, useEffect } from 'react';
import PopupModal from '../../Shared/UI/PopupModal/PopupModal';
import Input from '../../Shared/UI/Input/Input';
import ProjectForm from './ProjectForm';
import ProjectService from './ProjectService';
import axios from 'axios';
import Pagination from '../../Shared/UI/Pagination/Pagination';
const Project = () => {
    const [project_data, setProjectData] = useState([]);
    const [editProjectData, setEditProjectData] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [searchProjectTitle, setSearchProjectTitle] = useState('');
    //Pagination Variables 
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(2);
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
        const data = [];
        setEditProjectData(true);
        await axios.get(`http://localhost:8888/project/view?id=${pid}`)
        .then(res => data.push(res.data));
        console.log(data)
        localStorage.setItem("project_id",data[0].project_id);
        localStorage.setItem("title",data[0].title);
        localStorage.setItem("description",data[0].description);
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
            
            <button
                type="button"
                className="btn btn-primary my-5"
                onClick={() => {setButtonPopup(true); setEditProjectData(false);}}
            >
                Add New Project
            </button>

            <table className="table">
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