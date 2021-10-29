import http from './http-common';
export const getModulesData = () =>{
    return http.get("/modules/read?expand=project");
}
export const deleteModules = (modules_id) =>{
    return http.put(`modules/update?id=${modules_id}`,{'is_delete':1});
}
export const addModules = (projectId,moduleTitle,moduleDesc) =>{
    return http.post('modules/create',{
        "project_id":projectId,
        "title":moduleTitle,
        "description":moduleDesc,
    });
}
export const moduleSearch = (searchModuleTitle) =>{
    return http.get(`modules?filter[title][like]=${searchModuleTitle}&expand=project`)
}
export const editModule = (moduleId,projId,moduleTitle,moduleDesc) =>{
    return http.put(`http://localhost:8888/modules/update?id=${moduleId}`,
    {"project_id":projId,"title":moduleTitle,"description":moduleDesc});
}
export const sort = (sortBy) =>{
    return http.get(`modules?sort=${sortBy}&expand=project`);
}