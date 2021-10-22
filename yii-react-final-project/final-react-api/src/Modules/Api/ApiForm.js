import React, { useState, useEffect } from "react";
import Input from "../../Shared/UI/Input/Input";
import { ApiMethod } from "./ApiMethod";
import { ApiRequest } from "./ApiRequest";
import { ApiResponse } from "./ApiResponse";

const ApiForm = () => {
  const [apiProjectTitle, setApiProjectTitle] = useState();
  const [moduleId, setModuleId] = useState();
  const [apiUrl, setApiUrl] = useState();
  const [apiTitle, setApiTitle] = useState();
  const [apiDesc, setApiDesc] = useState();
  const [apiMethod, setApiMethod] = useState();
  const [apiRequest, setApiRequest] = useState();
  const [apiResponse, setApiResponse] = useState();

  const apiModuleHandler = (event) => {
    setModuleId(event.target.value);
  };

  const apiProjectHandler = (event) => {
    setApiProjectTitle(event.target.value);
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

  const submitApiHandler = (event) => {
    event.preventDefault();
    if (
      apiUrl !== "" &&
      apiTitle !== "" &&
      apiDesc !== "" &&
      apiProjectTitle !== "" &&
      moduleId !== "" &&
      apiMethod !== "" &&
      apiRequest !== "" &&
      apiResponse !== ""
    ) {
      const api = {
        apiId: Math.floor(Math.random() * 100000 + 1),
        apiUrl: apiUrl,
        apiTitle: apiTitle,
        apiDesc: apiDesc,
        apiProject: apiProjectTitle,
        apiModule: moduleId,
        apiMethod: apiMethod,
        apiRequest: apiRequest,
        apiResponse: apiResponse,
      };

      setApiUrl("");
      setApiTitle("");
      setApiDesc("");
      setApiProjectTitle("");
      setModuleId("");
      setApiMethod("");
    } else {
      alert("Please Fill All Fields");
    }
  };

  return (
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
      <div className="form-group mt-3">
        {" "}
        Project
        <select
          className="form-control"
          onChange={apiProjectHandler}
          value={apiProjectTitle}
        >
          <option>Select Project</option>
        </select>
      </div>
      <div className="form-group mt-3">
        Module
        <select
          className="form-control"
          onChange={apiModuleHandler}
          value={moduleId}
        >
          <option>Select Module</option>
        </select>
      </div>
      <ApiMethod value={apiMethod} onChange={apiMethodHandler} />
      <ApiRequest value={apiRequest} onChange={apiRequestHandler} />
      <ApiResponse value={apiResponse} onChange={apiResponseHandler} />
      <button className="btn btn-success mt-5">Add API</button>
    </form>
  );
};

export default ApiForm;
