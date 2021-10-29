import React, { useState, useEffect } from "react";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import ApiService from "./ApiService";
import {
  addApi,
  deleteApi,
  editAPi,
  getApiData,
  searchApi,
  sort,
} from "../../Shared/Services/Api-Services";
import ApiForm from "./ApiForm";
import Input from "../../Shared/UI/Input/Input";
import Add from "../../Shared/UI/Buttons/Add";
import Pagination from "../../Shared/UI/Pagination/Pagination";
import SortList from "../../Shared/UI/SortList/SortList";
const Api = () => {
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
    const res = await getApiData();
    setApiData(res.data.items);
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

  const searchApiTitleHandler = async (event) => {
    setSearchApiTitle(event.target.value);
    const response = await searchApi(searchApiTitle);
    setApiData(response.data.items);
  };

  const deleteApiHandler = async (apiId) => {
    const confirm = window.confirm("Are you sure you wish to delete this api?");
    if (confirm === true) {
      const data = await deleteApi(apiId);
      loadApiData();
    }
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
  const handleSort = async (event) => {
    const sortBy = event.target.value;
    if (sortBy == "title ASC") {
      const res = await sort("title");
      setApiData(res.data.items);
    } else if (sortBy == "title DESC") {
      const res = await sort("-title");
      setApiData(res.data.items);
    } else if (sortBy == "description ASC") {
      const res = await sort("description");
      setApiData(res.data.items);
    } else if (sortBy == "description DESC") {
      const res = await sort("-description");
      setApiData(res.data.items);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center"> APIs</h1>
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
