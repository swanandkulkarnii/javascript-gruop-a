import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../Shared/UI/Input/Input";
import { AiOutlinePlus, AiTwotoneEdit } from "react-icons/ai";
const ModuleForm = (props) => {
  const [database, setProjectData] = useState([]);
  const [projectId, setProjectId] = useState();
  const [moduleId, setModuleId] = useState();

  // Module Title
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleTitleTouched, setModuleTitleTouched] = useState(false);
  const enteredModuleTitleIsValid = moduleTitle.trim() !== "";
  const titleInputIsInvalid = !enteredModuleTitleIsValid && moduleTitleTouched;

  // Module Description
  const [moduleDesc, setModuleDesc] = useState("");
  const [moduleDescTouched, setModuleDescTouched] = useState(false);
  const enteredModuleDescIsValid = moduleDesc.trim() !== "";
  const descriptionInputIsInvalid =
    !enteredModuleDescIsValid && moduleDescTouched;

  useEffect(() => {
    axios
      .get("http://localhost:8888/project/read")
      .then((res) => setProjectData(res.data.items));
  });
  useEffect(async () => {
    if (props.onEdit.isEdit) {
      await axios
        .get(`http://localhost:8888/modules/view?id=${props.onEdit.module_id}`)
        .then((res) => {
          setModuleId(res.data.module_id);
          setProjectId(res.data.project_id);
          setModuleTitle(res.data.title);
          setModuleDesc(res.data.description);
        });
    }
  }, []);
  let button;
  if (props.onEdit.isEdit) {
    button = (
      <button
        className="btn btn-success my-5"
        onClick={() => {
          props.updateModules(moduleId, projectId, moduleTitle, moduleDesc);
        }}
      >
        <AiTwotoneEdit />
        Update Modules
      </button>
    );
  } else {
    button = (
      <button
        className="btn btn-success my-5"
        onClick={() => {
          props.addModule(projectId, moduleTitle, moduleDesc);
        }}
      >
        {" "}
        <AiOutlinePlus /> &nbsp; Add Modules
      </button>
    );
  }
  const projectVal = (event) => {
    setProjectId(event.target.value);
  };

  // Module Title Handler
  const moduleTitleHandler = (event) => {
    setModuleTitle(event.target.value);
  };
  const moduleTitleBlurHandler = (event) => {
    setModuleTitleTouched(true);
  };

  // Module Description Handler
  const moduleDescHandler = (event) => {
    setModuleDesc(event.target.value);
  };
  const moduleDescBlurHandler = (event) => {
    setModuleDescTouched(true);
  };
  return (
    <>
      <div className="form-group">
        <select
          className="form-control"
          onChange={projectVal}
          value={projectId}
        >
          <option>Select Project</option>
          {database.map((value, index) => (
            <option value={value.project_id}>{value.title}</option>
          ))}
        </select>
      </div>
      <Input
        label="Module Title"
        input={{
          id: "module_title",
          type: "text",
          placeholder: "Enter Module Title",
          name: "moduleTitle",
        }}
        value={moduleTitle}
        onChange={moduleTitleHandler}
        onBlur={moduleTitleBlurHandler}
      ></Input>
      {titleInputIsInvalid && (
        <p className="text-danger">Title must not be empty.</p>
      )}
      <Input
        label="Module Description"
        input={{
          id: "module_ddesc",
          type: "text",
          placeholder: "Enter Module Description",
          name: "moduleDesc",
        }}
        value={moduleDesc}
        onChange={moduleDescHandler}
        onBlur={moduleDescBlurHandler}
      ></Input>
      {descriptionInputIsInvalid && (
        <p className="text-danger">Description must not be empty.</p>
      )}
      {button}
    </>
  );
};
export default ModuleForm;
