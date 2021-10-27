import React, { useState, useEffect } from 'react'
import Input from '../../Shared/UI/Input/Input';

const ProjectForm = (props) => {
    const [projId, setProjId] = useState(''); 
    const [projTitle, setProjTitle] = useState('');
    const [projDesc, setProjDesc] = useState('');
    const projTitleHandler = (event) =>
    {
        setProjTitle(event.target.value);
    };
    const projDescHandler = (event) =>
    {
        setProjDesc(event.target.value);
    };
    useEffect(async () => {
        if(props.isEdit)
        {
            setProjId(localStorage.getItem('project_id'))
            setProjTitle(localStorage.getItem('title'));
            setProjDesc(localStorage.getItem('description'));
        }
    }, []);
    let button;
    if(props.isEdit)
    {
        button = <button className="btn btn-success mt-5" onClick={()=>{props.updateProject(projId,projTitle,projDesc)}}>Update Project</button>;
    }
    else
    {
        button = <button className="btn btn-success mt-5" onClick={()=>{props.addProject(projTitle,projDesc)}}>Add Project</button>
    }
    return (
        <>
        <h1>{props.pid}</h1>
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
                {button}
        </>
    )
}

export default ProjectForm