import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UsersService from "./UsersService";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import Input from "../../Shared/UI/Input/Input";
import SortList from "../../Shared/UI/SortList/SortList";

import {
  getUserData,
  deleteUser,
  addUser,
  userSearch,
  editUser,
  sort,
} from "../../Shared/Services/User-Services";
import Pagination from "../../Shared/UI/Pagination/Pagination";
import Add from "../../Shared/UI/Buttons/Add";

const User = () => {
  // Set State for User Data
  const [usersdata, setusersdata] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  // Set  State for Search User Variable
  const [searchFirstName, setSearchFirstName] = useState("");

  const [editUserData, setEditUserData] = useState({ isEdit: false, id: "" });
  // Set State for Sort USer Variable
  const [sortStatus, setSortStatus] = useState("");

  const sortType = [
    {
      value: "firstname ASC",
      text: "firstName Ascending",
    },
    {
      value: "firstname DESC",
      text: "firstname Descending",
    },
    {
      value: "lastname ASC",
      text: "lastName Ascending",
    },
    {
      value: "lastname DESC",
      text: "lastName Decending",
    },
  ];
  //load User Data
  useEffect(() => {
    loadUserData();
  }, []);
  const loadUserData = async () => {
    const res = await getUserData();
    setusersdata(res.data.items);
  };

  //pagination variable
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2);

  //Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUser = usersdata.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sort User
  const handleSort = async (event) => {
    const sortBy = event.target.value;
    if (sortBy == "firstname ASC") {
      const res = await sort("firstname");
      setusersdata(res.data.items);
    } else if (sortBy == "firstname DESC") {
      const res = await sort("-firstname");
      setusersdata(res.data.items);
    } else if (sortBy == "lastname ASC") {
      const res = await sort("lastname");
      setusersdata(res.data.items);
    } else if (sortBy == "lastname DESC") {
      const res = await sort("-lastname");
      setusersdata(res.data.items);
    }
  };
  //Create new User Logic
  async function submitUserHandler(
    firstName,
    lastName,
    gender,
    userEmail,
    userProfile
  ) {
    if (
      firstName !== "" &&
      lastName !== "" &&
      gender !== "" &&
      userEmail !== ""
    ) {
      setButtonPopup(false);
      const data = await addUser(
        firstName,
        lastName,
        gender,
        userEmail,
        userProfile
      );
      loadUserData();
    } else {
      alert("Please Fill All Fields");
    }
  }

  //User Search Logic
  const searchUserHandler = async (event) => {
    setSearchFirstName(event.target.value);
    const response = await userSearch(searchFirstName);
    setusersdata(response.data.items);
    console.log("helo", usersdata);

    //console.log(response.data.items);
  };
  //Delete User Logic
  const deleteHandler = async (id) => {
    const confirm = window.confirm(
      "Are you sure you wish to delete this user?"
    );
    if (confirm === true) {
      const data = await deleteUser(id);
      loadUserData();
    }
  };
  //Edit User Logic
  const editHandler = async (id) => {
    setEditUserData({ isEdit: true, id: id });
    setButtonPopup(true);
  };
  const updateUserHandler = async (
    id,
    firstName,
    lastName,
    gender,
    userEmail,
    userProfile
  ) => {
    setButtonPopup(false);
    const data = await editUser(
      id,
      firstName,
      lastName,
      gender,
      userEmail,
      userProfile
    );
    loadUserData();
  };

  return (
    <>
      {<h1 className="text-center"> USER</h1>}
      <div className="container">
        <Input
          label="Search"
          input={{
            id: "search_User",
            type: "search",
            placeholder: "Enter First Name",
            name: "searchFirstName",
            size: "20",
          }}
          value={searchFirstName}
          onChange={searchUserHandler}
        ></Input>
        <div className="form-group mt-5">
          <b>
            <label>Sort By</label>
          </b>
          <select
            className="form-control"
            onChange={handleSort}
            name="sortList"
          >
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
              setEditUserData(false);
            },
          }}
          buttonName="Add User"
        />
        <table className="table table-success table-striped">
          <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Email ID</th>
            <th>Profile Picture</th>
          </thead>
          {
            <UsersService
              database={currentUser}
              onEdit={editHandler}
              onDelete={deleteHandler}
            ></UsersService>
          }
        </table>
      </div>
      <PopupModal trigger={buttonPopup} settrigger={setButtonPopup}>
        <UserForm
          addUser={submitUserHandler}
          updateUser={updateUserHandler}
          isEdit={editUserData}
        ></UserForm>
      </PopupModal>
      <Pagination
        dataPerPage={usersPerPage}
        totalData={usersdata.length}
        paginate={paginate}
      />
    </>
  );
};

export default User;
