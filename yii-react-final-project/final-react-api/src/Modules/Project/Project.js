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
} from "../../Shared/Services/Project-Services";
import Pagination from "../../Shared/UI/Pagination/Pagination";
import Add from "../../Shared/UI/Buttons/Add";

const Project = () => {
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
  const [sortStatus, setSortStatus] = useState(true);

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
  const handleSort = () => {
    const data = projectData;

    if (sortStatus) {
      let sorted = data.sort((a, b) => a.title.localeCompare(b.title));

      setProjectData(sorted);
      setSortStatus(!sortStatus);
    } else {
      let sorted = data.sort((a, b) => b.title.localeCompare(a.title));

      setProjectData(sorted);
      setSortStatus(!sortStatus);
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
      <h1 className="text-center"> Add New Projects</h1>

      <button
        type="button"
        className="btn btn-warning"
        style={{ color: "white" }}
        onClick={handleSort}
      >
        Sort By Title
      </button>
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
