import React, { useState, useEffect } from 'react'
import Input from '../../Shared/UI/Input/Input';
import axios from 'axios';
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
        if(props.isEdit.isEdit)
        {
            await axios.get(`http://localhost:8888/project/view?id=${props.isEdit.project_id}`)
            .then(res => {
                setProjId(res.data.project_id);
                setProjTitle(res.data.title);
                setProjDesc(res.data.description);
            });
            
        }
    }, []);
    let button;
    if(props.isEdit.isEdit)
    {
        button = <button className="btn btn-success mt-5" onClick={()=>{props.updateProject(projId,projTitle,projDesc)}}>Update Project</button>;
    }
    else
    {
        button = <button className="btn btn-success mt-5" onClick={()=>{props.addProject(projTitle,projDesc)}}>Add Project</button>
    }
    return (
        <>
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