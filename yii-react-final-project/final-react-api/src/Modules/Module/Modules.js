import React, { useState, useEffect } from "react";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import ModuleService from "./ModuleService";
import {
  deleteModules,
  getModulesData,
  addModules,
  moduleSearch,
  editModule,
  sort,
} from "../../Shared/Services/Modules-Services";
import ModuleForm from "./ModuleForm";
import Input from "../../Shared/UI/Input/Input";
import Add from "../../Shared/UI/Buttons/Add";
import Pagination from "../../Shared/UI/Pagination/Pagination";
import SortList from "../../Shared/UI/SortList/SortList";
const Modules = () => {
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
  const [moduleData, setModulesData] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [searchModuleTitle, setSearchModuleTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modulesPerPage] = useState(2);
  const [editModuleData, setEditModuleData] = useState({
    isEdit: false,
    module_id: "",
  });

  useEffect(() => {
    loadModuleData();
  }, []);
  const loadModuleData = async () => {
    const res = await getModulesData();
    setModulesData(res.data.items);
  };
  const indexOfLastModules = currentPage * modulesPerPage;
  const indexOfFirstModules = indexOfLastModules - modulesPerPage;
  const currentModules = moduleData.slice(
    indexOfFirstModules,
    indexOfLastModules
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const submitModuleHandler = async (projectId, moduleTitle, moduleDesc) => {
    if (projectId !== "" && moduleTitle !== "" && moduleDesc !== "") {
      setButtonPopup(false);
      const data = await addModules(projectId, moduleTitle, moduleDesc);
      loadModuleData();
    } else {
      alert("Please Fill All Fields");
    }
  };
  const searchModuleTitleHandler = async (event) => {
    setSearchModuleTitle(event.target.value);
    const response = await moduleSearch(searchModuleTitle);
    setModulesData(response.data.items);
  };

  const deleteModuleHandler = async (mid) => {
    const confirm = window.confirm(
      "Are you sure you wish to delete this module?"
    );
    if (confirm === true) {
      const data = await deleteModules(mid);
      loadModuleData();
    }
  };
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
  const handleSort = async (event) => {
    const sortBy = event.target.value;
    if (sortBy == "title ASC") {
      const res = await sort("title");
      setModulesData(res.data.items);
    } else if (sortBy == "title DESC") {
      const res = await sort("-title");
      setModulesData(res.data.items);
    } else if (sortBy == "description ASC") {
      const res = await sort("description");
      setModulesData(res.data.items);
    } else if (sortBy == "description DESC") {
      const res = await sort("-description");
      setModulesData(res.data.items);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center"> Modules</h1>
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
