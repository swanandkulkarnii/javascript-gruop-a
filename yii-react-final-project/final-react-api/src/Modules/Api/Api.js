import React, { useState, useEffect } from "react";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import ApiService from "./ApiService";
import {
  addApi,
  deleteApi,
  editAPi,
  getApiData,
  searchApi,
} from "../../Shared/Services/Api-Services";
import ApiForm from "./ApiForm";
import Input from "../../Shared/UI/Input/Input";
import Add from "../../Shared/UI/Buttons/Add";
import Pagination from "../../Shared/UI/Pagination/Pagination";

const Api = () => {
  // Set State for Api Data
  const [apiData, setApiData] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);

  // Set Set State for Search Api Title Variable
  const [searchApiTitle, setSearchApiTitle] = useState("");

  // Set State for Pagination Variables
  const [currentPage, setCurrentPage] = useState(1);
  const [apisPerPage] = useState(2);

  // Set State for Edit Api Variable
  const [editApiData, setEditApiData] = useState({ isEdit: false, api_id: "" });

  // Set State for Sort Api Variable
  const [sortStatus, setSortStatus] = useState(true);

  // Load Api Data
  useEffect(() => {
    loadApiData();
  }, []);
  const loadApiData = async () => {
    const res = await getApiData();
    setApiData(res.data.items);
  };

  // Pagination
  const indexOfLastApis = currentPage * apisPerPage;
  const indexOfFirstApis = indexOfLastApis - apisPerPage;
  const currentApis = apiData.slice(indexOfFirstApis, indexOfLastApis);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sort Modules
  const handleSort = () => {
    const data = apiData;
    if (sortStatus == true) {
      let sorted = data.sort((a, b) => a.title.localeCompare(b.title));
      setApiData(sorted);

      setSortStatus(!sortStatus);
    } else {
      let sorted = data.sort((a, b) => b.title.localeCompare(a.title));
      console.log("rev - sorted-----", sorted);
      setApiData(sorted);

      setSortStatus(!sortStatus);
    }
  };

  // Submit Handler
  const submitApiHandler = async (
    apiProjectId,
    apiModuleId,
    apiTitle,
    apiDesc,
    apiUrl,
    apiMethod,
    apiRequest,
    apiResponse
  ) => {
    if (
      apiUrl !== "" &&
      apiTitle !== "" &&
      apiDesc !== "" &&
      apiProjectId !== "" &&
      apiModuleId !== "" &&
      apiMethod !== "" &&
      apiRequest !== "" &&
      apiResponse !== ""
    ) {
      setButtonPopup(false);
      const data = await addApi(
        apiProjectId,
        apiModuleId,
        apiTitle,
        apiDesc,
        apiUrl,
        apiMethod,
        apiRequest,
        apiResponse
      );
      loadApiData();
    } else {
      alert("Please Fill All Fields");
    }
  };

  // Search Api by Title
  const searchApiTitleHandler = async (event) => {
    setSearchApiTitle(event.target.value);
    const response = await searchApi(searchApiTitle);
    setApiData(response.data.items);
  };

  // Delete Api
  const deleteApiHandler = async (apiId) => {
    const confirm = window.confirm("Are you sure you wish to delete this api?");
    if (confirm === true) {
      const data = await deleteApi(apiId);
      loadApiData();
    }
  };

  // Edit Api
  const editApiHandler = (apiId) => {
    setEditApiData({ isEdit: true, api_id: apiId });
    setButtonPopup(true);
  };
  const updateApiHandler = async (
    apiId,
    projId,
    moduleId,
    title,
    desc,
    apiUrl,
    apiMethod,
    apiRequest,
    apiResponse
  ) => {
    setButtonPopup(false);
    const data = await editAPi(
      apiId,
      projId,
      moduleId,
      title,
      desc,
      apiUrl,
      apiMethod,
      apiRequest,
      apiResponse
    );
    loadApiData();
  };

  return (
    <div className="container">
      <h1 className="text-center"> Add New API</h1>
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
          id: "search_api",
          type: "search",
          placeholder: "Enter Api Title",
          name: "searchApi",
        }}
        value={searchApiTitle}
        onChange={searchApiTitleHandler}
      ></Input>
      <Add
        other={{
          onClick: () => {
            setButtonPopup(true);
            setEditApiData(false);
          },
        }}
        buttonName="Add New Api"
      />
      <table className="table table-secondary table-striped">
        <thead>
          <th>API URL</th>
          <th>API Title</th>
          <th>API Description</th>
          <th>Project</th>
          <th>Module</th>
          <th>Method</th>
          <th>Request</th>
          <th>Response</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        {
          <ApiService
            onApiDelete={deleteApiHandler}
            onApiEdit={editApiHandler}
            apiData={currentApis}
          ></ApiService>
        }
      </table>
      <PopupModal
        trigger={buttonPopup}
        settrigger={setButtonPopup}
        title="Add Api"
      >
        <ApiForm
          addApi={submitApiHandler}
          updateApi={updateApiHandler}
          isEdit={editApiData}
        ></ApiForm>
      </PopupModal>
      <Pagination
        dataPerPage={apisPerPage}
        totalData={apiData.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Api;
