import React, { useState, useEffect } from "react";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import ProjectService from "./ProjectService";
import ProjectForm from "./ProjectForm";
import Td from "../../Shared/UI/Table/Td";
import Input from "../../Shared/UI/Input/Input";

const Project = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [searchProjectTitle, setSearchProjectTitle] = useState("");
  const [searchResult, setSearchResult] = useState("");

  useEffect(() => {
    if (localStorage.getItem("Proj_Module_Api") == null) {
      localStorage.setItem("Proj_Module_Api", JSON.stringify([]));
    }
  }, []);

  const searchProjectTitleHandler = (event) => {
    setSearchProjectTitle(event.target.value);
    var project_data = JSON.parse(localStorage.getItem("Proj_Module_Api"));
    for (var i = 0; i < project_data.length; i++) {
      if (
        project_data[i].projTitle
          .toUpperCase()
          .includes(searchProjectTitle.toUpperCase())
      ) {
        setSearchResult(
          <tr>
            <Td data={`${JSON.stringify(project_data[i].projTitle)}`}></Td>
            <Td data={`${JSON.stringify(project_data[i].projDesc)}`}></Td>
            <Td>
              <a href={`${JSON.stringify(project_data[i].projImg)}`}>Image</a>
            </Td>
          </tr>
        );
      }
    }
  };

  var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  const deleteHandler = (pid) => {
    var project_data = JSON.parse(localStorage.getItem("Proj_Module_Api"));
    project_data = removeByAttr(project_data, "pid", pid);
    localStorage.setItem("Proj_Module_Api", JSON.stringify(project_data));
    window.location.reload(true);
  };
  const editHandler = (pid) => {};

  return (
    <>
      <h1 className="text-center"> PROJECTS</h1>
      <div className="container">
        <table className="table table-success table-striped">
          <thead>
            <th>Project Title</th>
            <th>Project Description</th>
            <th>Project Image</th>
          </thead>
          {searchResult}
        </table>
        <Input
          label="Search"
          input={{
            id: "search_project",
            type: "search",
            placeholder: "Enter Project Title",
            name: "searchProject",
          }}
          value={searchProjectTitle}
          onChange={searchProjectTitleHandler}
        ></Input>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setButtonPopup(true)}
        >
          Add New Project
        </button>

        <table className="table table-success table-striped">
          <thead>
            <th>Project Title</th>
            <th>Project Description</th>
            <th>Project Image</th>
          </thead>

          {
            <ProjectService
              onEdit={editHandler}
              onDelete={deleteHandler}
            ></ProjectService>
          }
        </table>

        <PopupModal trigger={buttonPopup} settrigger={setButtonPopup}>
          <ProjectForm></ProjectForm>
        </PopupModal>
      </div>
    </>
  );
};

export default Project;
