import React, { useState, useEffect } from "react";
import Input from "../../Shared/UI/Input/Input";
//import ModuleService from "../Module/ModuleService";
import { ApiMethod } from "./ApiMethod";
import { ApiRequest } from "./ApiRequest";
import { ApiResponse } from "./ApiResponse";
import ApiService from "./ApiService";

const Api = () => {
  const projectList = JSON.parse(localStorage.getItem("Proj_Module_Api"));
  const [apiProjectId, setApiProjectId] = useState();
  // const [apiModuleId, setApiModuleId] = useState();
  const [apiUrl, setApiUrl] = useState();
  const [apiTitle, setApiTitle] = useState();
  const [apiDesc, setApiDesc] = useState();
  const [apiMethod, setApiMethod] = useState();
  const [apiRequest, setApiRequest] = useState();
  const [apiResponse, setApiResponse] = useState();

  useEffect(() => {
    if (localStorage.getItem("Apis") == null) {
      localStorage.setItem("Apis", JSON.stringify([]));
    }
  }, []);

  const apiProjectHandler = (event) => {
    setApiProjectId(event.target.value);
  };

  // const apiModuleHandler = (event) => {
  //   setApiModuleId(event.target.value);
  // };

  const apiRequestHandler = (event) => {
    setApiRequest(event.target.value);
  };

  const apiResponseHandler = (event) => {
    setApiResponse(event.target.value);
  };

  const apiUrlHandler = (event) => {
    setApiUrl(event.target.value);
  };
  const apiTitleHandler = (event) => {
    setApiTitle(event.target.value);
  };
  const apiDescHandler = (event) => {
    setApiDesc(event.target.value);
  };

  const apiMethodHandler = (event) => {
    setApiMethod(event.target.value);
  };

  const submitApiHandler = (event) => {
    event.preventDefault();
  };

  if (
    apiUrl !== "" &&
    apiTitle !== "" &&
    apiDesc !== "" &&
    apiProjectId !== "" &&
    //apiModuleId !== "" &&
    apiMethod !== "" &&
    apiRequest !== "" &&
    apiResponse !== ""
  ) {
    const api = {
      apiId: Math.floor(Math.random() * 100000 + 1),
      apiUrl: apiUrl,
      apiTitle: apiTitle,
      apiDesc: apiDesc,
      apiProject: apiProjectId,
      //apiModule: apiModuleId,
      apiMethod: apiMethod,
      apiRequest: apiRequest,
      apiResponse: apiResponse,
    };
    const data = JSON.parse(localStorage.getItem("Apis"));
    data.push(api);
    localStorage.setItem("Apis", JSON.stringify(data));
    setApiUrl("");
    setApiTitle("");
    setApiDesc("");
    setApiProjectId("");
    //setApiModuleId("");
    setApiMethod("");
  } else {
    alert("Please Fill All Fields");
  }

  return (
    <div className="container">
      <h1 className="text-center"> Add New API</h1>
      <table className="table">
        <thead>
          <th>API URL</th>
          <th>API Title</th>
          <th>API Description</th>
          <th>Project</th>
          <th>Module</th>
          <th>Method</th>
          <th>Request</th>
          <th>Response</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        {<ApiService></ApiService>}
      </table>
      <form onSubmit={submitApiHandler}>
        <Input
          label="API URL"
          input={{
            id: "api_url",
            type: "text",
            placeholder: "Enter API URL",
            name: "apiUrl",
          }}
          value={apiUrl}
          onChange={apiUrlHandler}
        ></Input>
        <Input
          label="API Title"
          input={{
            id: "api_title",
            type: "text",
            placeholder: "Enter API Title",
            name: "apiTitle",
          }}
          value={apiTitle}
          onChange={apiTitleHandler}
        ></Input>
        <Input
          label="API Description"
          input={{
            id: "api_ddesc",
            type: "text",
            placeholder: "Enter API Description",
            name: "apiDesc",
          }}
          value={apiDesc}
          onChange={apiDescHandler}
        ></Input>
        <div className="form-group">
          <select
            className="form-control"
            onChange={apiProjectHandler}
            value={apiProjectId}
          >
            <option>Select Project</option>
            {projectList.map((value, index) => {
              return <option value={value.pid}>{value.projTitle}</option>;
            })}
          </select>
        </div>
        {/* <div className="form-group">
          <select
            className="form-control"
            onChange={apiModuleHandler}
            value={apiModuleId}
          >
            <option>Select Module</option>
            {projectList.map((value, index) => {
              return <option value={value.pid}>{value.moduleTitle}</option>;
            })}
          </select>
        </div> */}
        <ApiMethod value={apiMethod} onChange={apiMethodHandler} />
        <ApiRequest value={apiRequest} onChange={apiRequestHandler} />
        <ApiResponse value={apiResponse} onChange={apiResponseHandler} />
        <button className="btn btn-success mt-5">Add API</button>
      </form>
    </div>
  );
};

export default Api;
