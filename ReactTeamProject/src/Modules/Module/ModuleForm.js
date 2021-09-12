import React, {useState} from 'react'
import Input from '../../Shared/UI/Input/Input';

const ModuleForm = () => {
    const [projectId, setProjectId] = useState();
    const [moduleTitle, setModuleTitle] = useState();
    const [moduleDesc,setModuleDesc] = useState('');
    const database = JSON.parse(localStorage.getItem('Proj_Module_Api'));

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
					    let modules_list = new Array();
					    proj_module.mid = Math.floor(Math.random()*100000+1);
					    modules_list.push(proj_module);
					    database[i].modules = modules_list;
					    localStorage.setItem("Proj_Module_Api", JSON.stringify(database));
				    }	
				    else
				    {
    					proj_module.mid = Math.floor(Math.random()*100000+1);
	    				database[i].modules.push(proj_module);
		    			localStorage.setItem("Proj_Module_Api",JSON.stringify(database));
			    	}
                    setProjectId('');
                    setModuleTitle('');
                    setModuleDesc('');
			    }
		    }
        }
    }

    return (
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
    )
}
export default ModuleForm