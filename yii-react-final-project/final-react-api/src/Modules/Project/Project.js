import React, { useState, useEffect } from "react";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import Input from "../../Shared/UI/Input/Input";
import ProjectForm from "./ProjectForm";
import ProjectService from "./ProjectService";
import {
  getProjectData,
  deleteProject,
  addProject,
  projectSearch,
  editProject,
  sort,
} from "../../Shared/Services/Project-Services";
import Pagination from "../../Shared/UI/Pagination/Pagination";
import Add from "../../Shared/UI/Buttons/Add";
import SortList from "../../Shared/UI/SortList/SortList";

const Project = () => {
  const sortType = [
    {
      value: "title ASC",
      text: "Title Ascending",
    },
    {
      value: "title DESC",
      text: "Title Descending",
    },
    {
      value: "description ASC",
      text: "Description Ascending",
    },
    {
      value: "description DESC",
      text: "Description Decending",
    },
  ];
  // Set State for Project Data
  const [projectData, setProjectData] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);

  // Set Set State for Search Project Title Variable
  const [searchProjectTitle, setSearchProjectTitle] = useState("");

  // Set State for Pagination Variables
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(2);

  // Set State for Edit Project Variable
  const [editProjectData, setEditProjectData] = useState({
    isEdit: false,
    project_id: "",
  });

  // Set State for Sort Project Variable
  const [sortStatus, setSortStatus] = useState("");

  //Load Project Data
  useEffect(() => {
    loadProjectData();
  }, []);

  const loadProjectData = async () => {
    const res = await getProjectData();
    setProjectData(res.data.items);
  };

  //Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projectData.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sort Projects
  const handleSort = async (event) => {
    const sortBy = event.target.value;
    if (sortBy == "title ASC") {
      const res = await sort("title");
      setProjectData(res.data.items);
    } else if (sortBy == "title DESC") {
      const res = await sort("-title");
      setProjectData(res.data.items);
    } else if (sortBy == "description ASC") {
      const res = await sort("description");
      setProjectData(res.data.items);
    } else if (sortBy == "description DESC") {
      const res = await sort("-description");
      setProjectData(res.data.items);
    }
  };

  //Create A Project
  async function submitProjectHandler(projTitle, projDesc) {
    if (projTitle !== "" && projDesc !== "") {
      setButtonPopup(false);
      setEditProjectData(true);
      const data = await addProject(projTitle, projDesc);
      loadProjectData();
    } else {
      alert("Please Fill All Fields");
    }
  }

  // Search Project by Title
  const searchProjectTitleHandler = async (event) => {
    setSearchProjectTitle(event.target.value);
    const response = await projectSearch(searchProjectTitle);
    setProjectData(response.data.items);
  };

  // Delete Project
  const deleteHandler = async (pid) => {
    const confirm = window.confirm(
      "Are you sure you wish to delete this project?"
    );
    if (confirm === true) {
      const data = await deleteProject(pid);
      loadProjectData();
    }
  };

  // Edit Project
  const editHandler = async (pid) => {
    setEditProjectData({ isEdit: true, project_id: pid });
    setButtonPopup(true);
  };
  const updateProjectHandler = async (projId, projTitle, projDesc) => {
    setButtonPopup(false);
    const data = await editProject(projId, projTitle, projDesc);
    loadProjectData();
  };

  return (
    <div className="container">
      <h1 className="text-center"> Projects</h1>
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
      <div className="form-group mt-5">
        <b>
          <label>Sort By</label>
        </b>
        <select className="form-control" onChange={handleSort} name="sortList">
          <option>Select Sort By</option>
          {sortType.map((currentValue, index) => {
            return (
              <SortList key={index} value={currentValue.value}>
                {currentValue.text}
              </SortList>
            );
          })}
        </select>
      </div>
      <Add
        other={{
          onClick: () => {
            setButtonPopup(true);
            setEditProjectData(false);
          },
        }}
        buttonName="Add New Project"
      />
      <table className="table table-secondary table-striped">
        <thead>
          <th>Project Title</th>
          <th>Project Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        {
          <ProjectService
            database={currentProjects}
            onEdit={editHandler}
            onDelete={deleteHandler}
          ></ProjectService>
        }
      </table>
      <PopupModal
        trigger={buttonPopup}
        settrigger={setButtonPopup}
        title="Add Project"
      >
        <ProjectForm
          addProject={submitProjectHandler}
          updateProject={updateProjectHandler}
          isEdit={editProjectData}
        ></ProjectForm>
      </PopupModal>
      <Pagination
        dataPerPage={projectsPerPage}
        totalData={projectData.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Project;
