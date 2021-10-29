import http from './http-common';
export const getProjectData = () =>{
    return http.get("project/read");
}
export const deleteProject = (project_id) =>{
    return http.put(`project/update?id=${project_id}`,{'is_delete':1});
}
export const addProject = (projTitle,projDesc) =>{
    return http.post('project/create',{
        "title":projTitle,
        "description":projDesc
    });
}
export const projectSearch = (searchProjectTitle) =>{
    return http.get(`project?filter[title][like]=${searchProjectTitle}`)
}
export const editProject = (projId,projTitle,projDesc) =>{
    return http.put(`project/update?id=${projId}`,
    {"title":projTitle,"description":projDesc});
}
export const sort = (sortBy) =>{
    return http.get(`project?sort=${sortBy}`);
}