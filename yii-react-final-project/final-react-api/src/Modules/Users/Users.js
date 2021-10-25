import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UsersService from "./UsersService";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
//import Td from "../../Shared/UI/Table/Td";
import Input from "../../Shared/UI/Input/Input";
import axios from "axios";
import Pagination from "../../Shared/UI/Pagination/Pagination";

const User = () => {
  const [usersdata, setusersdata] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchResult, setSearchResult] = useState("");
  //const [delete1, setDelete1] = useState(false);
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
      .get("http://localhost/Yii/api_final/web/users")
      .then((res) => setusersdata(res.data.items));
  };

  // const searchFirtsNameHandler = (event) => {
  //   setSearchFirstName(event.target.value);
  //   var user_data = JSON.parse(localStorage.getItem("Users"));
  //   for (var i = 0; i < user_data.length; i++) {
  //     if (
  //       user_data[i].firstName
  //         .toUpperCase()
  //         .includes(searchFirstName.toUpperCase())
  //     ) {
  //       setSearchResult(
  //         <tr>
  //           <Td data={`${JSON.stringify(user_data[i].firstName)}`}></Td>
  //           <Td data={`${JSON.stringify(user_data[i].lastName)}`}></Td>
  //           <Td data={`${JSON.stringify(user_data[i].gender)}`}></Td>
  //           <Td data={`${JSON.stringify(user_data[i].userEmail)}`}></Td>
  //         </tr>
  //       );
  //     }
  //   }
  // };

  // var removeByAttr = function (arr, attr, value) {
  //   var i = arr.length;
  //   while (i--) {
  //     if (
  //       arr[i] &&
  //       arr[i].hasOwnProperty(attr) &&
  //       arguments.length > 2 &&
  //       arr[i][attr] === value
  //     ) {
  //       arr.splice(i, 1);
  //     }
  //   }
  //   return arr;
  // };

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
        .then((res) => {
          loadUserData();
        });
      // axios
      //   .delete(`http://localhost/Yii/api_final/web/users/delete?id=${id}`)
      //   .then((res) => {
      //     console.log(res);
      //     console.log(res.data);
      //   });
    }

    //window.location.reload(true);
  };
  const editHandler = (uid) => {};

  return (
    <>
      {/* <h1 className="text-center"> USER</h1> */}
      <div className="container">
        {/* <table className="table table-success table-striped">
          <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Email ID</th>
          </thead>
          {searchResult}
        </table> */}
        <Input
          label="Search"
          input={{
            id: "search_User",
            type: "search",
            placeholder: "Enter First Name",
            name: "searchFirstName",
          }}
          value={searchFirstName}
          //onChange={searchFirtsNameHandler}
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
        <UserForm addUser={submitUserHandler}></UserForm>
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
