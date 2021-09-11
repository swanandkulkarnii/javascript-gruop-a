import React, { useState, useEffect } from "react";
import Input from "../../Shared/UI/Input/Input";
import "./Userpop.css";
//import UsersService from "./UsersService";

const Users = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (localStorage.getItem("Users") == null) {
      localStorage.setItem("Users", JSON.stringify([]));
    }
  }, []);

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };
  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };
  const genderHandler = (event) => {
    setGender(event.target.value);
  };
  const userEmailHandler = (event) => {
    setUserEmail(event.target.value);
  };
  const submitUserHandler = (event) => {
    event.preventDefault();
    if (
      firstName !== "" &&
      lastName !== "" &&
      gender !== "" &&
      userEmail !== ""
    ) {
      const users = {
        uid: Math.floor(Math.random() * 100000 + 1),
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        userEmail: userEmail,
      };
      const database = JSON.parse(localStorage.getItem("Users"));
      database.push(users);
      localStorage.setItem("Users", JSON.stringify(database));
      setFirstName("");
      setLastName("");
      setGender("");
      setUserEmail("");
    } else {
      alert("Please Fill All Fields");
    }
  };

  return props.trigger ? (
    <div className="popup-box">
      <div className="box">
        <h1 className="text-center"> Add New User</h1>
        <form className="form-horizontal form-popup" id="Userpop">
          <Input
            label="First Name"
            input={{
              id: "First_Name",
              type: "text",
              placeholder: "Enter First Name",
              name: "firstName",
            }}
            value={firstName}
            onChange={firstNameHandler}
          ></Input>
          <Input
            label="Last Name"
            input={{
              id: "last_name",
              type: "text",
              placeholder: "Enter Last Name",
              name: "lastName",
            }}
            value={lastName}
            onChange={lastNameHandler}
          ></Input>

          <label>Gender :</label>
          <div>
            <select
              className="form-control"
              value={gender}
              onChange={genderHandler}
            >
              <option>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <Input
            label="Email ID"
            input={{
              id: "email_id",
              type: "text",
              placeholder: "Enter Email ID ",
              name: "userEmail",
            }}
            value={userEmail}
            onChange={userEmailHandler}
          ></Input>
          <button className="btn btn-success mt-5" onClick={submitUserHandler}>
            Add User
          </button>
          <button
            className="btn btn-danger mt-5"
            onClick={() => props.settrigger(false)}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Users;
