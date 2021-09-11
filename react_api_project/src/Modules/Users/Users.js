import React, { useState } from "react";
import Userpop from "./Userpop";
import UsersService from "./UsersService";

const User = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <>
      <h1 className="text-center"> USER</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setButtonPopup(true)}
      >
        Add User
      </button>
      <table className="table">
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Email ID</th>
        </thead>
        {<UsersService></UsersService>}
      </table>
      <Userpop trigger={buttonPopup} settrigger={setButtonPopup}></Userpop>
    </>
  );
};

export default User;
