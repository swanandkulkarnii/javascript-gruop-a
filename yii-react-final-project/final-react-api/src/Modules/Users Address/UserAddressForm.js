import React, { useState } from "react";
import Input from "../../Shared/UI/Input/Input";

const UserAddressForm = () => {
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");

  const addressOneHandler = (event) => {
    setAddressOne(event.target.value);
  };
  const addressTwoHandler = (event) => {
    setAddressTwo(event.target.value);
  };
  const cityHandler = (event) => {
    setCity(event.target.value);
  };
  const stateHandler = (event) => {
    setState(event.target.value);
  };
  const pincodeHandler = (event) => {
    setPincode(event.target.value);
  };
  const countryHandler = (event) => {
    setCountry(event.target.value);
  };

  const submitUserAddressHandler = (event) => {
    event.preventDefault();
    if (
      addressOne !== "" &&
      addressTwo !== "" &&
      city !== "" &&
      state !== "" &&
      pincode !== "" &&
      country !== ""
    ) {
      const useraddress = {
        uid: Math.floor(Math.random() * 100000 + 1),
        addressOne: addressOne,
        addressTwo: addressTwo,
        city: city,
        state: state,
        pincode: pincode,
        country: country,
        isDeleted: false,
      };
      const db = JSON.parse(localStorage.getItem("UserAddress"));
      db.push(useraddress);
      localStorage.setItem("UserAddress", JSON.stringify(db));
      setAddressOne("");
      setAddressTwo("");
      setCity("");
      setState("");
      setPincode("");
      setCountry("");
    } else {
      alert("Please enter all Address Data");
    }
  };

  return (
    <form className="form-horizontal form-popup" id="UserAddressForm">
      <Input
        label="Address Line One"
        input={{
          id: "address_line_one",
          type: "text",
          placeholder: "Enter User Address Line One",
          name: "useraddressone",
        }}
        value={addressOne}
        onChange={addressOneHandler}
      />
      <Input
        label="Address Line Two"
        input={{
          id: "address_Line_two",
          type: "text",
          placeholder: "Enter User Address Line Two",
          name: "useraddresstwo",
        }}
        value={addressTwo}
        onChange={addressTwoHandler}
      />
      <Input
        label="User City"
        input={{
          id: "user_city",
          type: "text",
          placeholder: "Enter User City",
          name: "usercity",
        }}
        value={city}
        onChange={cityHandler}
      />
      <Input
        label="User State"
        input={{
          id: "user_state",
          type: "text",
          placeholder: "Enter User State",
          name: "userstate",
        }}
        value={state}
        onChange={stateHandler}
      />
      <Input
        label="User Pincode"
        input={{
          id: "user_pincode",
          type: "number",
          placeholder: "Enter User Pincode",
          name: "userpincode",
        }}
        value={pincode}
        onChange={pincodeHandler}
      />
      <Input
        label="User Country"
        input={{
          id: "address_one",
          type: "text",
          placeholder: "Enter User Country",
          name: "usercountry",
        }}
        value={country}
        onChange={countryHandler}
      />
      <button
        className="btn btn-success mt-5"
        onClick={submitUserAddressHandler}
      >
        Add User Address
      </button>
    </form>
  );
};

export default UserAddressForm;
