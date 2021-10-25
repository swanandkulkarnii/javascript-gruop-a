import axios from "axios";
import React, { useState, useEffect } from "react";
import Input from "../../Shared/UI/Input/Input";
import { ApiMethod } from "./ApiMethod";
import { ApiRequest } from "./ApiRequest";
import { ApiResponse } from "./ApiResponse";

const ApiForm = (props) => {
  const [apiProjectId, setApiProjectId] = useState();
  const [apiModuleId, setModuleId] = useState();
  const [apiUrl, setApiUrl] = useState();
  const [apiTitle, setApiTitle] = useState();
  const [apiDesc, setApiDesc] = useState();
  const [apiMethod, setApiMethod] = useState();
  const [apiRequest, setApiRequest] = useState();
  const [apiResponse, setApiResponse] = useState();
  const [projectData, setProjectData] = useState([]);
  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8888/project?expand=modules")
      .then((res) => setProjectData(res.data.items));
  }, []);
  const apiModuleHandler = (event) => {
    setModuleId(event.target.value);
  };

  const apiProjectHandler = (event) => {
    setApiProjectId(event.target.value);
    var projectID = event.target.value;
    projectData.filter((currentValue) => {
      if (Number(currentValue.project_id) === Number(projectID)) {
        setModuleData(currentValue.modules);
      }
    });
  };

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

  

  return (
    <>
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
      <div className="form-group mt-3">
        {" "}
        Project
        <select
          className="form-control"
          onChange={apiProjectHandler}
          value={apiProjectId}
        >
          <option>Select Project</option>
          {projectData.map((value, index) => (
            <option value={value.project_id}>{value.title}</option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        Module
        <select
          className="form-control"
          onChange={apiModuleHandler}
          value={apiModuleId}
        >
          <option>Select Module</option>
          {moduleData.map((value, index) => {
            return <option value={value.module_id}>{value.title}</option>;
          })}
        </select>
      </div>
      <ApiMethod value={apiMethod} onChange={apiMethodHandler} />
      <ApiRequest value={apiRequest} onChange={apiRequestHandler} />
      <ApiResponse value={apiResponse} onChange={apiResponseHandler} />
      <button className="btn btn-success mt-5" onClick={()=>{props.addApi(apiUrl, apiTitle, apiDesc, apiProjectId, apiModuleId, apiMethod, apiRequest, apiResponse)}}>Add API</button>
    </>
  );
};

export default ApiForm;