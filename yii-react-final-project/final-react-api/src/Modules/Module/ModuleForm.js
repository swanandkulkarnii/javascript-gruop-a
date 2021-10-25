import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../../Shared/UI/Input/Input';

const ModuleForm = (props) => {
    const [database, setProjectData] = useState([]);
    const [projectId, setProjectId] = useState();
    const [moduleTitle, setModuleTitle] = useState();
    const [moduleDesc,setModuleDesc] = useState('');
    
    useEffect(() => {
        axios.get("http://localhost:8888/project").then(res => setProjectData(res.data.items));
    })
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
                    <select className="form-control" onChange={projectVal}>
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
                <button className="btn btn-success mt-5" onClick={()=>{props.addModule(projectId,moduleTitle,moduleDesc)}}>Add Module</button>
            </>
    )
}
export default ModuleForm