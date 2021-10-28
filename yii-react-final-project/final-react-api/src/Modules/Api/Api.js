import React, { useState, useEffect } from "react";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import ApiService from "./ApiService";
import ApiForm from "./ApiForm";
import Input from "../../Shared/UI/Input/Input";
import Add from "../../Shared/UI/Buttons/Add";
import axios from "axios";
import Pagination from "../../Shared/UI/Pagination/Pagination";
const Api = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [searchApiTitle, setSearchApiTitle] = useState("");
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [apisPerPage] = useState(2);
  const [editApiData, setEditApiData] = useState({ isEdit: false, api_id: "" });
  useEffect(() => {
    loadApiData();
  }, []);
  const loadApiData = async () => {
    await axios
      .get("http://localhost:8888/api/read?expand=module,project")
      .then((res) => setApiData(res.data.items));
  };
  const indexOfLastApis = currentPage * apisPerPage;
  const indexOfFirstApis = indexOfLastApis - apisPerPage;
  const currentApis = apiData.slice(indexOfFirstApis, indexOfLastApis);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      await axios.post("http://localhost:8888/api/create", {
        url: apiUrl,
        title: apiTitle,
        description: apiDesc,
        project_id: apiProjectId,
        module_id: apiModuleId,
        method: apiMethod,
        request: apiRequest,
        response: apiResponse,
      });
      loadApiData();
    } else {
      alert("Please Fill All Fields");
    }
  };

  const searchApiTitleHandler = async (event) => {
    setSearchApiTitle(event.target.value);
    const response = await axios.get(
      `http://localhost:8888/api?filter[title][like]=${searchApiTitle}&expand=project,module`
    );
    setApiData(response.data.items);
  };

  const deleteApiHandler = async (apiId) => {
    await axios
      .put(`http://localhost:8888/api/update?id=${apiId}`, { is_delete: 1 })
      .then(() => {
        console.log("DELETE Successfully");
      });
    loadApiData();
  };

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
    await axios
      .put(`http://localhost:8888/modules/update?id=${apiId}`, {
        project_id: projId,
        module_id: moduleId,
        title: title,
        description: desc,
        url: apiUrl,
        method: apiMethod,
        request: apiRequest,
        response: apiResponse,
      })
      .then(() => {
        console.log("Updated Successfully");
      });
    loadApiData();
  };
  return (
    <div className="container">
      <h1 className="text-center"> Add New API</h1>
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
