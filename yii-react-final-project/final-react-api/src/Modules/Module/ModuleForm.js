import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../../Shared/UI/Input/Input';

const ModuleForm = (props) => {
    const [database, setProjectData] = useState([]);
    const [projectId, setProjectId] = useState();
    const [moduleTitle, setModuleTitle] = useState();
    const [moduleDesc,setModuleDesc] = useState('');
    const [moduleId, setModuleId] = useState();
    useEffect(() => {
        axios.get("http://localhost:8888/project/read").then(res => setProjectData(res.data.items));
    });
    useEffect(async () => {
        if(props.isEdit.isEdit)
        {
            await axios.get(`http://localhost:8888/modules/view?id=${props.isEdit.module_id}`)
            .then(res =>{
                setModuleId(res.data.module_id);
                setProjectId(res.data.project_id);
                setModuleTitle(res.data.title);
                setModuleDesc(res.data.description);    
            });
        }
    }, []);
    let button;
    if(props.isEdit.isEdit)
    {
        button = <button className="btn btn-success mt-5" onClick={()=>{props.updateModules(moduleId,projectId,moduleTitle,moduleDesc)}}>Update Modules</button>;
    }
    else
    {
        button = <button className="btn btn-success mt-5" onClick={()=>{props.addModule(projectId,moduleTitle,moduleDesc)}}>Add Modules</button>
    }
    const projectVal = (event) =>{
        setProjectId(event.target.value);
    }
    const moduleTitleHandler = (event) =>{
        setModuleTitle(event.target.value);
    }
    const  moduleDescHandler = (event) =>{
        setModuleDesc(event.target.value);
    }
    return (
        <>
                <div className="form-group">
                    <select className="form-control" onChange={projectVal} value={projectId}>
                        <option>Select Project</option>
                        {
                            database.map((value, index)=>(
                                    <option value={value.project_id}>{value.title}</option>
                            ))
                        }
                    </select>    
                </div>
                <Input 
                    label="Module Title" 
                    input={{
                        id : 'module_title',
                        type : 'text',
                        placeholder:'Enter Module Title',
                        name:"moduleTitle"
                    }}
                    value = {moduleTitle}
                    onChange={moduleTitleHandler}
                >
                </Input>
                <Input 
                    label="Module Description" 
                    input={{
                        id : 'module_ddesc',
                        type : 'text',
                        placeholder:'Enter Module Description',
                        name:"moduleDesc"
                    }}
                    value = {moduleDesc}
                    onChange={moduleDescHandler}
                >
                </Input>
                {button}
            </>
    )
}
export default ModuleForm