import React, { useState, useEffect } from "react";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import ApiService from "./ApiService";
import ApiForm from "./ApiForm";
import Input from "../../Shared/UI/Input/Input";
import Td from "../../Shared/UI/Table/Td";

const Api = () => {
  useEffect(() => {
    if (localStorage.getItem("Apis") == null) {
      localStorage.setItem("Apis", JSON.stringify([]));
    }
  }, []);

  const [buttonPopup, setButtonPopup] = useState(false);

  const [searchApiTitle, setSearchApiTitle] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const searchApiTitleHandler = (event) => {
    setSearchApiTitle(event.target.value);
    const apiData = JSON.parse(localStorage.getItem("Apis"));
    for (var i = 0; i < apiData.length; i++) {
      if (
        apiData[i].apiTitle.toUpperCase().includes(searchApiTitle.toUpperCase())
      ) {
        setSearchResult(
          <tr>
            <Td data={`${JSON.stringify(apiData[i].apiUrl)}`}></Td>
            <Td data={`${JSON.stringify(apiData[i].apiTitle)}`}></Td>
            <Td data={`${JSON.stringify(apiData[i].apiDesc)}`}></Td>
            <Td data={`${JSON.stringify(apiData[i].apiProject)}`}></Td>
            <Td data={`${JSON.stringify(apiData[i].apiModule)}`}></Td>
            <Td data={`${JSON.stringify(apiData[i].apiMethod)}`}></Td>
            <Td data={`${JSON.stringify(apiData[i].apiResponse)}`}></Td>
            <Td data={`${JSON.stringify(apiData[i].apiRequest)}`}></Td>
          </tr>
        );
        console.log(`${JSON.stringify(apiData[i].apiTitle)}`);
      }
    }
  };

  var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  const deleteApiHandler = (apiId) => {
    console.log(apiId);
    var apiData = JSON.parse(localStorage.getItem("Apis"));
    apiData = removeByAttr(apiData, "apiId", apiId);
    localStorage.setItem("Apis", JSON.stringify(apiData));
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
