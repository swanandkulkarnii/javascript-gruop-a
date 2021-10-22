import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UsersService from "./UsersService";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import Td from "../../Shared/UI/Table/Td";
import Input from "../../Shared/UI/Input/Input";

const User = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchResult, setSearchResult] = useState("");

  useEffect(() => {
    if (localStorage.getItem("Users") == null) {
      localStorage.setItem("Users", JSON.stringify([]));
    }
  }, []);

  const searchFirtsNameHandler = (event) => {
    setSearchFirstName(event.target.value);
    var user_data = JSON.parse(localStorage.getItem("Users"));
    for (var i = 0; i < user_data.length; i++) {
      if (
        user_data[i].firstName
          .toUpperCase()
          .includes(searchFirstName.toUpperCase())
      ) {
        setSearchResult(
          <tr>
            <Td data={`${JSON.stringify(user_data[i].firstName)}`}></Td>
            <Td data={`${JSON.stringify(user_data[i].lastName)}`}></Td>
            <Td data={`${JSON.stringify(user_data[i].gender)}`}></Td>
            <Td data={`${JSON.stringify(user_data[i].userEmail)}`}></Td>
          </tr>
        );
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

  const deleteHandler = (uid) => {
    var user_data = JSON.parse(localStorage.getItem("Users"));
    user_data = removeByAttr(user_data, "uid", uid);
    localStorage.setItem("Users", JSON.stringify(user_data));
    window.location.reload(true);
  };
  const editHandler = (uid) => {};

  return (
    <>
      <h1 className="text-center"> USER</h1>
      <div className="container">
        <table className="table table-success table-striped">
          <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Email ID</th>
          </thead>
          {searchResult}
        </table>
        <Input
          label="Search"
          input={{
            id: "search_User",
            type: "search",
            placeholder: "Enter First Name",
            name: "searchFirstName",
          }}
          value={searchFirstName}
          onChange={searchFirtsNameHandler}
        ></Input>
        <button
          type="button"
          className=" btn btn-outline-secondary"
          onClick={() => setButtonPopup(true)}
        >
          Add User
        </button>

        <table className="table table-success table-striped">
          <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Email ID</th>
          </thead>
          {
            <UsersService
              onEdit={editHandler}
              onDelete={deleteHandler}
            ></UsersService>
          }
        </table>
      </div>
      <PopupModal trigger={buttonPopup} settrigger={setButtonPopup}>
        <UserForm></UserForm>
      </PopupModal>
    </>
  );
};

export default User;
