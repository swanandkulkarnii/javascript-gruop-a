import React, { useState, useEffect } from "react";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import ApiService from "./ApiService";
import ApiForm from "./ApiForm";
import Input from "../../Shared/UI/Input/Input";
import Td from "../../Shared/UI/Table/Td";
import axios from "axios";
import Pagination from "../../Shared/UI/Pagination/Pagination";
import SortButton from "./SortButton";

const Api = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [searchApiTitle, setSearchApiTitle] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [apiData, setApiData] = useState([]);
  const [editApiData, setEditApiData] = useState(false);

  //For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [apisPerPage] = useState(2);

  const loadApiData = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/read?expand=project,module"
    );
    setApiData(res.data.items);
    console.log(apiData);
  };

  useEffect(() => {
    loadApiData();
  }, []);

  // Get Current Apis
  const indexOfLastApi = currentPage * apisPerPage;
  const indexOfFirstApi = indexOfLastApi - apisPerPage;
  const currentApis = apiData.slice(indexOfFirstApi, indexOfLastApi);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  async function submitApiHandler(
    apiUrl,
    apiTitle,
    apiDesc,
    apiProjectId,
    apiModuleId,
    apiMethod,
    apiRequest,
    apiResponse
  ) {
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
      await axios.post("http://localhost:8080/api/create", {
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
  }

  const searchApiTitleHandler = async (event) => {
    //console.log("hiiiii", event.target.value);
    setSearchApiTitle(event.target.value);
    const response = await axios.get(
      `http://localhost:8080/api?filter[title][like]=${searchApiTitle}&expand=project,module`
    );
    setApiData(response.data.items);
  };

  const deleteApiHandler = async (pid) => {
    //let deleteApi = confirm("Do you want to delete record?");
    // if (deleteApi == true) {
    await axios
      .put(`http://localhost:8080/api/update?id=${pid}`, { is_delete: 1 })
      .then(() => {
        console.log("DELETE Successfully");
      });
    loadApiData();
    //}
  };

  const editApiHandler = async (apiId) => {
    const data = [];
    setEditApiData(true);
    await axios
      .get(`http://localhost:8080/api/view?id=${apiId}`)
      .then((res) => data.push(res.data.items));
    console.log(data);
    localStorage.setItem("api_data", JSON.stringify(data));
    setButtonPopup(true);
  };

  // const onSortHandler = () => {
  //   switch (value) {
  //     case url:
  //       break;

  //     default:
  //       break;
  //   }
  // };

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
        //onKeyUp={searchApiTitleHandler}
        //value={searchApiTitle}
        onChange={searchApiTitleHandler}
      ></Input>

      <button
        type="button"
        className="btn btn-outline-secondary "
        onClick={() => setButtonPopup(true)}
      >
        Add New API
      </button>
      <table className="table table-success table-striped">
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
        <ApiForm addApi={submitApiHandler}></ApiForm>
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
