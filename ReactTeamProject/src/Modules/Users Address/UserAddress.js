import React, { useState, useEffect } from "react";
import UserAddressForm from "./UserAddressForm";
import UserAddressService from "./UserAddressService";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import Input from "../../Shared/UI/Input/Input";
import Td from "../../Shared/UI/Table/Td";

const UserAddress = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");

  useEffect(() => {
    if (localStorage.getItem("UserAddress") == null) {
      localStorage.setItem("UserAddress", JSON.stringify([]));
    }
  }, []);

  const searchUserAddressHandler = (event) => {
    setSearchValue(event.target.value);
    var search_data = JSON.parse(localStorage.getItem("UserAddress"));
    for (var i = 0; i < search_data.length; i++) {
      if (
        search_data[i].city
          .toUpperCase()
          .includes(searchValue.toLocaleUpperCase())
      ) {
        setSearchResult(
          <tr>
            <Td data={`${JSON.stringify(search_data[i].addressOne)}`}></Td>
            <Td data={`${JSON.stringify(search_data[i].addressTwo)}`}></Td>
            <Td data={`${JSON.stringify(search_data[i].city)}`}></Td>
            <Td data={`${JSON.stringify(search_data[i].state)}`}></Td>
            <Td data={`${JSON.stringify(search_data[i].pincode)}`}></Td>
            <Td data={`${JSON.stringify(search_data[i].country)}`}></Td>
          </tr>
        );
      }
    }
  };

  var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      console.log(arr+attr+value);
      console.log("While Executed!!!");
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        (arguments.length > 2 && arr[i][attr] === value)
      ) {
        console.log("If Executed!!!");
        arr.splice(i, 1);
      }
    }
    return arr;
  };
  const deleteHandler = (uid) => {
    var address_data = JSON.parse(localStorage.getItem("UserAddress"));
    address_data = removeByAttr(address_data, "uid", uid);
    localStorage.setItem("UserAddress", JSON.stringify(address_data));
    console.log("Executed!!!");
    window.location.reload(true);
  };
  const editHandler = (uid) => {};

  return (
    <>
      <div className="container">
        <h1 className="text-center">Add New User Address</h1>
        <table className="table">
          <thead>
            <th>Address Line One</th>
            <th>Address Line Two</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Country</th>
          </thead>
          {searchResult}
        </table>
        <Input
          label="Search User Address"
          input={{
            id: "search_address",
            type: "search",
            placeholder: "Enter City to Search",
            name: "searchUserAddress",
          }}
          value={searchValue}
          onChange={searchUserAddressHandler}
        />

        <br />
        <br />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setButtonPopup(true)}
        >
          Add New User Address
        </button>
        <table className="table">
          <thead>
            <th>Address Line One</th>
            <th>Address Line Two</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Country</th>
          </thead>
          {
            <UserAddressService
              onEdit={editHandler}
              onDelete={deleteHandler}
            ></UserAddressService>
          }
        </table>
        <PopupModal trigger={buttonPopup} settrigger={setButtonPopup}>
          <UserAddressForm />
        </PopupModal>
      </div>
    </>
  );
};

export default UserAddress;
