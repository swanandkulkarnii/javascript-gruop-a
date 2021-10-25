import React, { useState, useEffect } from "react";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import ApiService from "./ApiService";
import ApiForm from "./ApiForm";
import Input from "../../Shared/UI/Input/Input";
import axios from "axios";
import Pagination from '../../Shared/UI/Pagination/Pagination';
const Api = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [searchApiTitle, setSearchApiTitle] = useState("");
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [apisPerPage] = useState(2);
  useEffect(() => {
    loadApiData();
  }, []);
  const loadApiData = async () =>{
    await axios
    .get("http://localhost:8888/api?expand=module,project")
    .then((res) => setApiData(res.data.items));
  }
  const indexOfLastApis = currentPage * apisPerPage;
    const indexOfFirstApis = indexOfLastApis - apisPerPage;
    const currentApis = apiData.slice(
        indexOfFirstApis,
        indexOfLastApis
    );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const submitApiHandler = async (apiUrl, apiTitle, apiDesc, apiProjectId, apiModuleId, apiMethod, apiRequest, apiResponse) =>{
    if(apiUrl !== "" && apiTitle !== "" && apiDesc !== "" && apiProjectId !== "" && apiModuleId !== "" && apiMethod !== "" && apiRequest !== "" && apiResponse !== "")
    {
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
    }
    else{
        alert("Please Fill All Fields");
    }
  }

  const  searchApiTitleHandler = async(event) =>{
    setSearchApiTitle(event.target.value);
    const response = await axios.get(`http://localhost:8888/api?filter[title][like]=${searchApiTitle}&expand=project,module`);
    setApiData(response.data.items);
  };

  const deleteApiHandler = async (apiId) => {
    await axios
      .delete(`http://localhost:8888/api/delete?id=${apiId}`)
      .then(() => {
        console.log("DELETE Successfully");
      });
    loadApiData();
  };

  const editApiHandler = (apiId) => {
    console.log(apiId);
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
        <ApiForm addApi = {submitApiHandler}></ApiForm>
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
