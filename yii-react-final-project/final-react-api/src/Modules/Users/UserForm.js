import React, { useState, useEffect } from "react";
import Input from "../../Shared/UI/Input/Input";
import axios from "axios";

const UserForm = (props) => {
  const [userId, setUserId] = useState("");
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
  useEffect(async () => {
    if (props.isEdit.isEdit) {
      await axios
        .get(
          `http://localhost/Yii/api_final/web/users/view?id=${props.isEdit.id}`
        )
        .then((res) => {
          setUserId(res.data.id);
          setFirstName(res.data.firstname);
          setLastName(res.data.lastname);
          setGender(res.data.gender);
          setUserEmail(res.data.email_id);
          setuserProfile(res.data.pro_pic);
        });
    }
  }, []);

  let button;
  let heading;
  if (props.isEdit) {
    heading = <h1 className="text-center">Update User</h1>;
    button = (
      <button
        className="btn btn-success mt-5"
        onClick={() => {
          props.updateUser(
            userId,
            firstName,
            lastName,
            gender,
            userEmail,
            userProfile
          );
        }}
      >
        Update User
      </button>
    );
  } else {
    heading = <h1 className="text-center">Add New User</h1>;
    button = (
      <button
        className="btn btn-success mt-5"
        onClick={() => {
          props.addUser(firstName, lastName, gender, userEmail, userProfile);
        }}
      >
        Add User
      </button>
    );
  }
  return (
    <>
      {heading}
      <div className="container">
        <form className="form-horizontal" id="UserForm">
          <Input
            label="First Name*"
            input={{
              id: "First_Name",
              type: "text",
              placeholder: "Enter First Name(required)",
              name: "firstName",
            }}
            value={firstName}
            onChange={firstNameHandler}
          ></Input>
          <Input
            label="Last Name*"
            input={{
              id: "last_name",
              type: "text",
              placeholder: "Enter Last Name(required)",
              name: "lastName",
            }}
            value={lastName}
            onChange={lastNameHandler}
          ></Input>

          <label>Gender :*</label>
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
            label="Email ID*"
            input={{
              id: "email_id",
              type: "email",
              placeholder: "Enter Email ID(required) ",
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
          {button}
        </form>
      </div>
    </>
  );
};

export default UserForm;


