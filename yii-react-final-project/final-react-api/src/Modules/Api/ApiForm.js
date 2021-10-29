import axios from "axios";
import React, { useState, useEffect } from "react";
import Input from "../../Shared/UI/Input/Input";
import { ApiMethod } from "./ApiMethod";
import { ApiRequest } from "./ApiRequest";
import { ApiResponse } from "./ApiResponse";
import { AiOutlinePlus, AiTwotoneEdit } from "react-icons/ai";
const ApiForm = (props) => {
  const [apiProjectId, setApiProjectId] = useState();
  const [apiModuleId, setModuleId] = useState();
  const [apiId, setApiId] = useState();
  // Api Url
  const [apiUrl, setApiUrl] = useState("");
  const [apiUrlTouched, setApiUrlTouched] = useState(false);
  const enteredApiUrlIsValid = apiUrl.trim() !== "";
  const urlInputIsInvalid = !enteredApiUrlIsValid && apiUrlTouched;

  // Api Title
  const [apiTitle, setApiTitle] = useState("");
  const [apiTitleTouched, setApiTitleTouched] = useState(false);
  const enteredApiTitleIsValid = apiTitle.trim() !== "";
  const titleInputIsInvalid = !enteredApiTitleIsValid && apiTitleTouched;

  // Api Description
  const [apiDesc, setApiDesc] = useState("");
  const [apiDescTouched, setApiDescTouched] = useState(false);
  const enteredApiDescIsValid = apiDesc.trim() !== "";
  const descriptionInputIsInvalid = !enteredApiDescIsValid && apiDescTouched;

  // Api Method
  const [apiMethod, setApiMethod] = useState();

  // Api Request
  const [apiRequest, setApiRequest] = useState();

  // Api Response
  const [apiResponse, setApiResponse] = useState();

  // Api Project Data
  const [projectData, setProjectData] = useState([]);

  // Api Module Data
  const [moduleData, setModuleData] = useState([]);

  // Api Url Handler
  const apiUrlHandler = (event) => {
    setApiUrl(event.target.value);
  };
  const apiUrlBlurHandler = (event) => {
    setApiUrlTouched(true);
  };

  // Api Title Handler
  const apiTitleHandler = (event) => {
    setApiTitle(event.target.value);
  };
  const apiTitleBlurHandler = (event) => {
    setApiTitleTouched(true);
  };

  // Api Description Handler
  const apiDescHandler = (event) => {
    setApiDesc(event.target.value);
  };
  const apiDescBlurHandler = (event) => {
    setApiDescTouched(true);
  };

  // Api Project Handler
  const apiProjectHandler = (event) => {
    setApiProjectId(event.target.value);
    var projectID = event.target.value;
    projectData.filter((currentValue) => {
      if (Number(currentValue.project_id) === Number(projectID)) {
        setModuleData(currentValue.modules);
      }
    });
  };

  // Api Module Handler
  const apiModuleHandler = (event) => {
    setModuleId(event.target.value);
  };

  // Api Request Handler
  const apiRequestHandler = (event) => {
    setApiRequest(event.target.value);
  };

  // Api Response Handler
  const apiResponseHandler = (event) => {
    setApiResponse(event.target.value);
  };

  // Api Method Handler
  const apiMethodHandler = (event) => {
    setApiMethod(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8888/project?expand=modules")
      .then((res) => setProjectData(res.data.items));
  }, []);
  useEffect(async () => {
    if (props.isEdit.isEdit) {
      await axios
        .get(`http://localhost:8888/api/view?id=${props.isEdit.api_id}`)
        .then((res) => {
          setApiId(res.data.api_id);
          setApiProjectId(res.data.project_id);
          setModuleId(res.data.module_id);
          setApiUrl(res.data.url);
          setApiTitle(res.data.title);
          setApiDesc(res.data.description);
          setApiMethod(res.data.method);
          setApiRequest(res.data.request);
          setApiResponse(res.data.response);
        });
    }
  }, []);
  let button;
  if (props.isEdit.isEdit) {
    button = (
      <button
        className="btn btn-success my-5s"
        onClick={() => {
          props.updateApi(
            apiId,
            apiProjectId,
            apiModuleId,
            apiTitle,
            apiDesc,
            apiUrl,
            apiMethod,
            apiRequest,
            apiResponse
          );
        }}
      >
        <AiTwotoneEdit /> &nbsp; Update Api
      </button>
    );
  } else {
    button = (
      <button
        className="btn btn-success my-5"
        onClick={() => {
          props.addApi(
            apiProjectId,
            apiModuleId,
            apiTitle,
            apiDesc,
            apiUrl,
            apiMethod,
            apiRequest,
            apiResponse
          );
        }}
      >
        {" "}
        <AiOutlinePlus /> &nbsp; Add Api
      </button>
    );
  }

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
        onBlur={apiUrlBlurHandler}
      ></Input>
      {urlInputIsInvalid && (
        <p className="text-danger">Url must not be empty.</p>
      )}
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
        onBlur={apiTitleBlurHandler}
      ></Input>
      {titleInputIsInvalid && (
        <p className="text-danger">Title must not be empty.</p>
      )}
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
        onBlur={apiDescBlurHandler}
      ></Input>
      {descriptionInputIsInvalid && (
        <p className="text-danger">Description must not be empty.</p>
      )}
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
      {button}
    </>
  );
};

export default ApiForm;
