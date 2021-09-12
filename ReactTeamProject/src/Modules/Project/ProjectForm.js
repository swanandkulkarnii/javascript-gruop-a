import React, {useState} from 'react'
import Input from '../../Shared/UI/Input/Input';

const ProjectForm = () => {
    const [projTitle, setProjTitle] = useState('');
    const [projDesc, setProjDesc] = useState('');
    const [projImg, setProjImg] =useState('');
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
            const project = {pid:Math.floor(Math.random()*100000+1),projTitle: projTitle, projDesc:projDesc, projImg:projImg, modules:[]};
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
    )
}

export default ProjectForm
