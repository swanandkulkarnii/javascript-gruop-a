import React, { useState, useEffect } from "react";
import Input from "../../Shared/UI/Input/Input";

const UserForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userProfile, setuserProfile] = useState("");

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
  const userprofileHandler = (event) => {
    setuserProfile(event.target.value);
  };

  return (
    <div className="popup-box">
      <div className="box">
        <h1 className="text-center"> Add New User</h1>
        <div className="container">
          <form className="form-horizontal" id="UserForm">
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
                type: "email",
                placeholder: "Enter Email ID ",
                name: "userEmail",
              }}
              value={userEmail}
              onChange={userEmailHandler}
            ></Input>
            <Input
              label="Profile Picture"
              input={{
                id: "pro_pic",
                type: "text",
                placeholder: "Profile picture url ",
                name: "userProfile",
              }}
              value={userProfile}
              onChange={userprofileHandler}
            ></Input>
            <button
              className="btn btn-success mt-5"
              onClick={() => {
                props.addUser(
                  firstName,
                  lastName,
                  gender,
                  userEmail,
                  userProfile
                );
              }}
            >
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
    </div>
  );
};

export default UserForm;

