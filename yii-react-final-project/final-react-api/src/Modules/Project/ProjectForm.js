import React, { useState, useEffect } from "react";
import Input from "../../Shared/UI/Input/Input";
import axios from "axios";
import { AiOutlinePlus, AiTwotoneEdit } from "react-icons/ai";
const ProjectForm = (props) => {
  const [projId, setProjId] = useState("");

  //Project Title
  const [projTitle, setProjTitle] = useState("");
  const [projTitleTouched, setprojTitleTouched] = useState(false);
  const enteredProjTitleIsValid = projTitle.trim() !== "";
  const titleInputIsInvalid = !enteredProjTitleIsValid && projTitleTouched;

  // Project Description
  const [projDesc, setProjDesc] = useState("");
  const [projDescTouched, setprojDescTouched] = useState(false);
  const enteredProjDescIsValid = projDesc.trim() !== "";
  const descriptionInputIsInvalid = !enteredProjDescIsValid && projDescTouched;

  // Project Title Handler
  const projTitleHandler = (event) => {
    setProjTitle(event.target.value);
  };
  const projectTitleBlurHandler = (event) => {
    setprojTitleTouched(true);
  };

  // Project Description Handler
  const projDescHandler = (event) => {
    setProjDesc(event.target.value);
  };
  const projDescBlurHandler = (event) => {
    setprojDescTouched(true);
  };

  useEffect(async () => {
    if (props.isEdit.isEdit) {
      await axios
        .get(`http://localhost:8888/project/view?id=${props.isEdit.project_id}`)
        .then((res) => {
          setProjId(res.data.project_id);
          setProjTitle(res.data.title);
          setProjDesc(res.data.description);
        });
    }
  }, []);

  let button;
  if (props.isEdit.isEdit) {
    button = (
      <button
        className="btn btn-success my-5"
        onClick={() => {
          props.updateProject(projId, projTitle, projDesc);
        }}
      >
        <AiTwotoneEdit /> &nbsp; Update Project
      </button>
    );
  } else {
    button = (
      <button
        className="btn btn-success my-5"
        onClick={() => {
          props.addProject(projTitle, projDesc);
        }}
      >
        <AiOutlinePlus /> &nbsp; Add Project
      </button>
    );
  }

  return (
    <>
      <Input
        label="Project Title"
        input={{
          id: "project_title",
          type: "text",
          placeholder: "Enter Project Title",
          name: "projTitle",
        }}
        value={projTitle}
        onChange={projTitleHandler}
        onBlur={projectTitleBlurHandler}
      ></Input>
      {titleInputIsInvalid && (
        <p className="text-danger">Title must not be empty.</p>
      )}
      <Input
        label="Project Description"
        input={{
          id: "project_desc",
          type: "text",
          placeholder: "Enter Project Description",
          name: "projDesc",
        }}
        value={projDesc}
        onChange={projDescHandler}
        onBlur={projDescBlurHandler}
      ></Input>
      {descriptionInputIsInvalid && (
        <p className="text-danger">Description must not be empty.</p>
      )}
      {button}
    </>
  );
};

export default ProjectForm;
