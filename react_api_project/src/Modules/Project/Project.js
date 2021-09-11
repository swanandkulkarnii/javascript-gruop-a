import React, { useState , useEffect } from 'react';
import Input from '../../UI/Input/Input';
import ProjectService from './ProjectService';
const Project = () => {
    const [projTitle, setProjTitle] = useState('');
    const [projDesc, setProjDesc] = useState('');
    const [projImg, setProjImg] =useState('');
    useEffect(()=>{
        if(localStorage.getItem('Proj_Module_Api') == null)
        {
            localStorage.setItem("Proj_Module_Api",JSON.stringify([]));
        }
    },[]);

    const projTitleHandler = (event) =>
    {
        setProjTitle(event.target.value);
    };
    const projDescHandler = (event) =>
    {
        setProjDesc(event.target.value);
    };
    const projImgHandler = (event) =>{
        setProjImg(event.target.value);
    };  
    const submitProjectHandler = (event) =>{
        event.preventDefault();
        if(projTitle!=='' && projDesc!=='' && projImg!=='')
        {
            const project = {pid:Math.floor(Math.random()*100000+1),projTitle: projTitle, projDesc:projDesc, projImg:projImg};
            const database = JSON.parse(localStorage.getItem('Proj_Module_Api'));
            database.push(project);
            localStorage.setItem('Proj_Module_Api',JSON.stringify(database));
            setProjTitle('');
            setProjDesc('');
            setProjImg('');
        }
        else{
            alert("Please Fill All Fields");
        }
    }

    return (
        <div className="container">   
            <h1 className="text-center"> Add New Projects</h1>
            <table className="table">
                <thead>
                    <th>Project Title</th>
                    <th>Project Description</th>
                    <th>Project Image</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </thead>
                {<ProjectService></ProjectService>}
            </table>
            <form>
                <Input 
                    label="Project Title" 
                    input={{
                        id : 'project_title',
                        type : 'text',
                        placeholder:'Enter Project Title',
                        name:"projTitle"
                    }}
                    
                    value = {projTitle}
                    onChange={projTitleHandler}
                >
                </Input>
                <Input
                    label= 'Project Description'
                    input={{
                        id:'project_desc',
                        type : 'text',
                        placeholder:'Enter Project Description',
                        name:"projDesc"
                    }}
                    
                    value = {projDesc}
                    onChange={projDescHandler}
                >
                </Input>
                <Input
                    label= 'Project Image'
                    input={{
                        id:'project_img',
                        type : 'text',
                        placeholder:'Enter Image URL',
                        name:"projImg"
                    }}
                    value = {projImg}
                    onChange={projImgHandler}
                >
                </Input>
                <button className="btn btn-success mt-5" onClick={submitProjectHandler}>Add Project</button>
            </form>
        </div>
        
    )
}

export default Project