import React, { useState, useEffect } from "react";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import ApiService from "./ApiService";
import ApiForm from "./ApiForm";
import Input from "../../Shared/UI/Input/Input";
import Td from "../../Shared/UI/Table/Td";
import axios from "axios";

const Api = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [searchApiTitle, setSearchApiTitle] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api?expand=module,project")
      .then((res) => setApiData(res.data.items));
  }, []);

  const searchApiTitleHandler = (event) => {
    setSearchApiTitle(event.target.value);
    //const apiData = JSON.parse(localStorage.getItem("Apis"));
    for (var i = 0; i < apiData.length; i++) {
      if (
        apiData[i].title.toUpperCase().includes(searchApiTitle.toUpperCase())
      ) {
        setSearchResult(
          <tr>
            <Td data={`${JSON.stringify(apiData[i].url)}`}></Td>
            <Td data={`${JSON.stringify(apiData[i].title)}`}></Td>
            <Td data={`${JSON.stringify(apiData[i].description)}`}></Td>
            <Td data={`${JSON.stringify(apiData[i].project.title)}`}></Td>
            <Td data={`${JSON.stringify(apiData[i].module.title)}`}></Td>
            <Td data={`${JSON.stringify(apiData[i].method)}`}></Td>
            <Td data={`${JSON.stringify(apiData[i].response)}`}></Td>
            <Td data={`${JSON.stringify(apiData[i].request)}`}></Td>
          </tr>
        );
        console.log(`${JSON.stringify(apiData[i].title)}`);
      }
    }
  };

  const deleteApiHandler = async (apiId) => {
    await axios
      .delete(`http://localhost:8080/api/delete?id=${apiId}`)
      .then(() => {
        console.log("DELETE Successfully");
      });
    window.location.reload(true);
  };

  const editApiHandler = (apiId) => {
    console.log(apiId);
  };

  return (
    <div className="container">
      <h1 className="text-center"> Add New API</h1>
      <table className="table">
        <thead>
          <th>API URL</th>
          <th>API Title</th>
          <th>API Description</th>
          <th>Project</th>
          <th>Module</th>
          <th>Method</th>
          <th>Request</th>
          <th>Response</th>
        </thead>
        {searchResult}
      </table>
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
            apiData={apiData}
          ></ApiService>
        }
      </table>
      <PopupModal
        trigger={buttonPopup}
        settrigger={setButtonPopup}
        title="Add Api"
      >
        <ApiForm></ApiForm>
      </PopupModal>
    </div>
  );
};

export default Api;
