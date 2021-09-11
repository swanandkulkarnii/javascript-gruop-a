import React, { useState } from 'react'
import Input from '../../UI/Input/Input';
import ModuleService from './ModuleService';
const Modules = () => {
    const database = JSON.parse(localStorage.getItem('Proj_Module_Api'));
    const [projectId, setProjectId] = useState();
    const [moduleTitle, setModuleTitle] = useState();
    const [moduleDesc,setModuleDesc] = useState('');

    const projectVal = (event) =>{
        setProjectId(event.target.value);
    }
    const moduleTitleHandler = (event) =>{
        setModuleTitle(event.target.value);
    }
    const  moduleDescHandler = (event) =>{
        setModuleDesc(event.target.value);
    }
    const submitModuleHandler = (event) =>{
        event.preventDefault();
        if(projectId!=='' && moduleTitle!=='' && moduleDesc!=='')
        {
            const proj_module = {moduleTitle: moduleTitle, moduleDesc: moduleDesc};
            for(var i = 0;i<database.length;i++)
		    {
			if(database[i].pid === Number(projectId))
			{
				if(database[i].modules === undefined)
				{
                    console.log('SAD')
					let modules_list = new Array();
					proj_module.mid = 0;
					modules_list.push(proj_module);
					database[i].modules = modules_list;
					localStorage.setItem("Proj_Module_Api", JSON.stringify(database));
				}	
				else
				{
					for(var j=0; j<database[i].modules.length;j++)
					{
		 				var id = database[i].modules[j].mid++;
					}
					proj_module.mid = id;
					database[i].modules.push(proj_module);
					localStorage.setItem("Proj_Module_Api",JSON.stringify(database));
				}
                setProjectId('');
                    setModuleTitle('');
                    setModuleDesc('');
			}
		    }
            /*database.map((value,index)=>{
                if(value.pid === Number(projectId))
                {
                    if(value.modules === undefined)
                    {
                        const module = {mid:Math.floor(Math.random()*100000+1),moduleTitle: moduleTitle, moduleDesc:moduleDesc};
                        console.log(module);
                    }
                }
            })*/
        }
    }
    return (
        <div className="container">
            <h1 className="text-center"> Add New Modules</h1>
            <table className="table">
                <thead>
                    <th>Module Title</th>
                    <th>Module Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </thead>
                {<ModuleService></ModuleService>}
            </table>
            <form onSubmit={submitModuleHandler}>
                <div className="form-group">
                    <select className="form-control" onChange={projectVal} value={projectId}>
                        <option>Select Project</option>
                        {
                            database.map((value, index)=>{
                                return(
                                    <option value={value.pid}>{value.projTitle}</option>
                                );
                            })
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
                <button className="btn btn-success mt-5">Add Module</button>
            </form>
        </div>
    )
}

export default Modules
