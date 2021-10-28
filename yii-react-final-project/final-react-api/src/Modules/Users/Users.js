import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UsersService from "./UsersService";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
//import Td from "../../Shared/UI/Table/Td";
import Input from "../../Shared/UI/Input/Input";
import axios from "axios";
import Pagination from "../../Shared/UI/Pagination/Pagination";
import Add from "../../Shared/UI/Buttons/Add";

const User = () => {
  const [usersdata, setusersdata] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [searchFirstName, setSearchFirstName] = useState("");
  const [editUserData, setEditUserData] = useState(false);
  //pagination variable
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2);

  //Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUser = usersdata.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const headers = {
    "Content-Type": "application/json",
    //"Access-Control-Allow-Origin": "*",
  };
  useEffect(() => {
    loadUserData();
  }, []);
  const loadUserData = async () => {
    await axios
      .get("http://localhost/Yii/api_final/web/users/read")
      .then((res) => setusersdata(res.data.items));
  };
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
      await axios.post(
        "http://localhost/Yii/api_final/web/users/create",
        {
          firstname: firstName,
          lastname: lastName,
          gender: gender,
          email_id: userEmail,
          pro_pic: userProfile,
        },
        { headers: headers }
      );
      loadUserData();
    } else {
      alert("Please Fill All Fields");
    }
  }

  const searchUserHandler = async (event) => {
    setSearchFirstName(event.target.value);
    const response = await axios.get(
      `http://localhost/Yii/api_final/web/users?filter[firstname][like]=${searchFirstName}`
    );

    setusersdata(response.data.items);
    //console.log(response.data.items);
  };

  const deleteHandler = async (id) => {
    const confirm = window.confirm(
      "Are you sure you wish to delete this user?"
    );
    if (confirm === true) {
      axios
        .put(
          `http://localhost/Yii/api_final/web/users/update?id=${id}`,
          { is_deleted: 1 },
          { headers: headers }
        )
        .then(() => {
          loadUserData();
        });
      // axios
      //   .delete(`http://localhost/Yii/api_final/web/users/delete?id=${id}`)
      //   .then((res) => {
      //     console.log(res);
      //     console.log(res.data);
      //   });
    }
  };

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
    await axios
      .put(`http://localhost/Yii/api_final/web/users/update?id=${id}`, {
        firstname: firstName,
        lastname: lastName,
        gender: gender,
        email_id: userEmail,
        pro_pic: userProfile,
      })
      .then(() => {
        console.log("Updated Successfully");
      });
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
