import React, { useState, useEffect } from "react";
import Input from "../../Shared/UI/Input/Input";
import axios from "axios";
const ProjectForm = () => {
  const [projTitle, setProjTitle] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projImg, setProjImg] = useState("");
  const projTitleHandler = (event) => {
    setProjTitle(event.target.value);
  };
  const projDescHandler = (event) => {
    setProjDesc(event.target.value);
  };
  const projImgHandler = (event) => {
    setProjImg(event.target.value);
  };

  // get
  // useEffect(() => {
  //   //const apiUrl = "http://localhost/Yii/api_final/web/test";
  //   axios.get("http://localhost:8080/project").then((repos) => {
  //     const allRepos = repos.data;
  //     console.log(allRepos);
  //   });
  // }, []);

  //
  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: "JWT fefege...",
  //   "Access-Control-Allow-Origin": true,
  // };

  async function submitProjectHandler(event) {
    event.preventDefault();
    if (projTitle !== "" && projDesc !== "" && projImg !== "") {
      console.log({
        title: projTitle,
        description: projDesc,
      });
      const resp = await axios.post("http://localhost:8080/project/create", {
        title: projTitle,
        description: projDesc,
      });
      console.log(resp.data);
      // const project = {pid:Math.floor(Math.random()*100000+1),projTitle: projTitle, projDesc:projDesc, projImg:projImg, modules:[]};
      // const database = JSON.parse(localStorage.getItem('Proj_Module_Api'));
      // database.push(project);
      // localStorage.setItem('Proj_Module_Api',JSON.stringify(database));
      setProjTitle("");
      setProjDesc("");
      setProjImg("");
    } else {
      alert("Please Fill All Fields");
    }
  }

  return (
    <form>
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
      ></Input>
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
      ></Input>
      <Input
        label="Project image"
        input={{
          id: "project_img",
          type: "text",
          placeholder: "Enter Project image",
          name: "projDesc",
        }}
        value={projImg}
        onChange={projImgHandler}
      ></Input>
      <button className="btn btn-success mt-5" onClick={submitProjectHandler}>
        Add Project
      </button>
    </form>
  );
};

export default ProjectForm;
