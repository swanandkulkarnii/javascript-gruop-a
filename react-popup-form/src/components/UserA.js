import React, { useState } from "react";
import UserAddressForm from "./UserAddressForm";

const User = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <>
      <h1>This is team assignment 1</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setButtonPopup(true)}
      >
        Add New User Address Data
      </button>

      <UserAddressForm
        trigger={buttonPopup}
        settrigger={setButtonPopup}
      ></UserAddressForm>
    </>
  );
};

export default User;
