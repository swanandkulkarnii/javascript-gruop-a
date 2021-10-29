import React, { useState, useEffect } from "react";
import Input from "../../Shared/UI/Input/Input";
import axios from "axios";
import { AiOutlinePlus, AiTwotoneEdit } from "react-icons/ai";
import validator from "validator";

const UserForm = (props) => {
  const [userId, setUserId] = useState("");
  //FirstName
  const [firstName, setFirstName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const enteredNameIsValid = firstName.trim() !== "";
  const FnameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  //LastName
  const [lastName, setLastName] = useState("");
  const [enteredLNameTouched, setEnteredLNameTouched] = useState(false);
  const enteredLNameIsValid = lastName.trim() !== "";
  const LnameInputIsInvalid = !enteredLNameIsValid && enteredLNameTouched;
  //gender
  const [gender, setGender] = useState("");
  //email
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [enteredemailTouched, setEnteredemailTouched] = useState(false);
  const enteredemailIsValid = userEmail.trim() !== "";
  const emailInputIsInvalid = !enteredemailIsValid && enteredemailTouched;
  //profile pic
  const [userProfile, setuserProfile] = useState("");

  //Firstname Validation
  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };
  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };
  //LastName Validation
  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };
  const LnameInputBlurHandler = (event) => {
    setEnteredLNameTouched(true);
  };
  const genderHandler = (event) => {
    setGender(event.target.value);
  };
  const userEmailHandler = (event) => {
    setUserEmail(event.target.value);
  };

  const EmailInputBlurHandler = (event) => {
    setEnteredemailTouched(true);
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
  if (props.isEdit.isEdit) {
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
        <AiTwotoneEdit />
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
        <AiOutlinePlus />
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
            onChange={firstNameHandler}
            onBlur={nameInputBlurHandler}
            value={firstName}
          ></Input>
          {FnameInputIsInvalid && (
            <p className="text-danger">FirstName must not be empty.</p>
          )}
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
            onBlur={LnameInputBlurHandler}
          ></Input>
          {LnameInputIsInvalid && (
            <p className="text-danger">LastName must not be empty.</p>
          )}
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
            onBlur={EmailInputBlurHandler}
          ></Input>
          {emailError}
          {emailInputIsInvalid && (
            <p className="text-danger">Email must not be empty.</p>
          )}
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
