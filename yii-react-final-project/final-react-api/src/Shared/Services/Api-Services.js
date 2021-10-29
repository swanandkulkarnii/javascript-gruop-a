import http from './http-common';
export const getApiData = () =>{
    return http.get("/api/read?expand=project,module");
}
export const deleteApi = (api_id) =>{
    return http.put(`api/update?id=${api_id}`,{'is_delete':1});
}
export const addApi = (apiProjectId, apiModuleId, apiTitle, apiDesc, apiUrl, apiMethod, apiRequest, apiResponse) => {
    return http.post("api/create", {
        url: apiUrl,
        title: apiTitle,
        description: apiDesc,
        project_id: apiProjectId,
        module_id: apiModuleId,
        method: apiMethod,
        request: apiRequest,
        response: apiResponse,
      });
}
export const searchApi = (searchApiTitle) =>{
    return http.get(`api?filter[title][like]=${searchApiTitle}&expand=project,module`);
}
export const editAPi = (apiId,projId,moduleId,title,desc,apiUrl,apiMethod,apiRequest,apiResponse) =>{
    return http.put(`api/update?id=${apiId}`,
    {
      "project_id":projId,
      "module_id":moduleId,
      "title":title,
      "description":desc,
      "url":apiUrl,
      "method":apiMethod,
      "request":apiRequest,
      "response":apiResponse
    })
}
export const sort = (sortBy) =>{
    return http.get(`api?sort=${sortBy}&expand=project,module`);
}