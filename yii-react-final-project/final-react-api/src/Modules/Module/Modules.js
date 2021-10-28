import React, { useState, useEffect } from "react";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import ModuleService from "./ModuleService";
import {
  deleteModules,
  getModulesData,
  addModules,
  moduleSearch,
  editModule,
} from "../../Shared/Services/Modules-Services";
import ModuleForm from "./ModuleForm";
import Input from "../../Shared/UI/Input/Input";
import Add from "../../Shared/UI/Buttons/Add";
import axios from "axios";
import Pagination from "../../Shared/UI/Pagination/Pagination";

const Modules = () => {
  // Set State for Module Data
  const [moduleData, setModulesData] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);

  // Set Set State for Search Module Title Variable
  const [searchModuleTitle, setSearchModuleTitle] = useState("");

  // Set State for Pagination Variables
  const [currentPage, setCurrentPage] = useState(1);
  const [modulesPerPage] = useState(2);

  // Set State for Edit Module Variable
  const [editModuleData, setEditModuleData] = useState({
    isEdit: false,
    module_id: "",
  });

  // Set State for Sort Module Variable
  const [sortStatus, setSortStatus] = useState(true);

  // Load Module Data
  useEffect(() => {
    loadModuleData();
  }, []);
  const loadModuleData = async () => {
    const res = await getModulesData();
    setModulesData(res.data.items);
  };

  // Pagination
  const indexOfLastModules = currentPage * modulesPerPage;
  const indexOfFirstModules = indexOfLastModules - modulesPerPage;
  const currentModules = moduleData.slice(
    indexOfFirstModules,
    indexOfLastModules
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sort Modules
  const handleSort = () => {
    const data = moduleData;
    if (sortStatus == true) {
      let sorted = data.sort((a, b) => a.title.localeCompare(b.title));
      setModulesData(sorted);

      setSortStatus(!sortStatus);
    } else {
      let sorted = data.sort((a, b) => b.title.localeCompare(a.title));
      console.log("rev - sorted-----", sorted);
      setModulesData(sorted);

      setSortStatus(!sortStatus);
    }
  };

  // Submit Handler
  const submitModuleHandler = async (projectId, moduleTitle, moduleDesc) => {
    if (projectId !== "" && moduleTitle !== "" && moduleDesc !== "") {
      setButtonPopup(false);
      const data = await addModules(projectId, moduleTitle, moduleDesc);
      loadModuleData();
    } else {
      alert("Please Fill All Fields");
    }
  };

  // Search Module by Title
  const searchModuleTitleHandler = async (event) => {
    setSearchModuleTitle(event.target.value);
    const response = await moduleSearch(searchModuleTitle);
    setModulesData(response.data.items);
  };

  // Delete Module
  const deleteModuleHandler = async (mid) => {
    const confirm = window.confirm(
      "Are you sure you wish to delete this module?"
    );
    if (confirm === true) {
      const data = await deleteModules(mid);
      loadModuleData();
    }
  };

  // Edit Module
  const editModuleHandler = async (mid) => {
    setEditModuleData({ isEdit: true, module_id: mid });
    setButtonPopup(true);
  };
  const updateModulesHandler = async (
    moduleId,
    projId,
    moduleTitle,
    moduleDesc
  ) => {
    setButtonPopup(false);
    const data = await editModule(moduleId, projId, moduleTitle, moduleDesc);
    loadModuleData();
  };

  return (
    <div className="container">
      <h1 className="text-center"> Add New Modules</h1>
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
          id: "search_module",
          type: "search",
          placeholder: "Enter Module Title",
          name: "searchModule",
        }}
        value={searchModuleTitle}
        onChange={searchModuleTitleHandler}
      ></Input>
      <Add
        other={{
          onClick: () => {
            setButtonPopup(true);
            setEditModuleData(false);
          },
        }}
        buttonName="Add New Modules"
      />
      <table className="table table-secondary table-striped">
        <thead>
          <th>Module Title</th>
          <th>Module Description</th>
          <th>Project Title</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        {
          <ModuleService
            database={currentModules}
            onModuleDelete={deleteModuleHandler}
            onModuleEdit={editModuleHandler}
          ></ModuleService>
        }
      </table>
      <PopupModal
        trigger={buttonPopup}
        settrigger={setButtonPopup}
        title="Add Module"
      >
        <ModuleForm
          addModule={submitModuleHandler}
          updateModules={updateModulesHandler}
          onEdit={editModuleData}
        ></ModuleForm>
      </PopupModal>
      <Pagination
        dataPerPage={modulesPerPage}
        totalData={moduleData.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Modules;
