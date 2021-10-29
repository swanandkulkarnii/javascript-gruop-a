// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import Input from "../../Shared/UI/Input/Input";

// const UserAddressForm = (props) => {
  

//   const url = "http://localhost/yii/yii/yii/yii-backend/web/useraddress/create";

//   const [data,setData] = useState({
//     addressline1: "",
//       addressline2: "",
//         city: "",
//         state: "",
//         zipcode: "",
//         country: ""
//   });
  
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: "JWT fefege...",
//   };

  

//   function handle(e){
//     const newdata = {...data};
//     newdata[e.target.id] = e.target.value;
//     setData(newdata);
//     // console.log(newdata);
//   }
//   return (
// <>
// <div>
  
//     <label> New User Address Form </label>
//     <Input 
//            label="Address Line One"
//           onChange={(e) => handle(e)}

//          input = {{id:"addressline1",
//           type:"text",
//           placeholder:"Address line 1"}}

//           value={data.addressline1}
          
//            />

//     <Input   
//      label="Address Line Two"
//           onChange={(e) => handle(e)}
//         input = {{ id:"addressline2",
//           type:"text",
//           placeholder:"Address line 2"}}
//           value={data.addressline2} 
//           />

// <Input 
//          label="City"
//           onChange={(e) => handle(e)}
//          input = {{id:"city",
//           type:"text",
//           placeholder:"City"}}
//           value={data.city}
//            />

// <Input 
//            label="State"
//           onChange={(e) => handle(e)}
//          input = {{id:"state",
          
//           type:"text",
//           placeholder:"State"}}
          
//           value={data.state}   />

// <Input 
//            label="Zip code"
//           onChange={(e) => handle(e)}
//         input =  {{id:"zipcode",
          
//           type:"text",
//           placeholder:"Zip Code"}}
//           value={data.zipcode}  />

// <Input 
//           label="Country"
//           onChange={(e) => handle(e)}
//         input = {{ id:"country",
          
//           type:"text",
//           placeholder:"Country" }}
//           value={data.country} />
 

  
// </div>
// </>

   
//   );
// };

// export default UserAddressForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../../Shared/UI/Input/Input';
import { AiOutlinePlus, AiTwotoneEdit } from "react-icons/ai";
const UserAddressForm = (props) => {
    const [database, setUsersData] = useState([]);
    const [userId, setUserId] = useState();

    const [addressline1, setAddressline1] = useState('');
    const [addressline1Touched,setAddressline1Touched] = useState(false);
    const enteredAddressLine1IsValid = addressline1.trim() !=="";
    const addressline1IsInvalid = !enteredAddressLine1IsValid && addressline1Touched;

    const [addressline2, setAddressline2] = useState('');
    const [addressline2Touched,setAddressline2Touched] = useState(false);
    const enteredAddressLine2IsValid = addressline2.trim() !=="";
    const addressline2IsInvalid = !enteredAddressLine2IsValid && addressline2Touched;

    const [city,setCity] = useState('');
    const [cityTouched,setCityTouched] = useState(false);
    const enteredCityIsValid = city.trim() !=="";
    const cityIsInvalid = !enteredCityIsValid && cityTouched;

    const [state, setState] = useState('');
    const [stateTouched,setStateTouched] = useState(false);
    const enteredStateIsValid = state.trim() !=="";
    const stateIsInvalid = !enteredStateIsValid && stateTouched;

    const [zipcode, setZipcode] = useState('');
    const [zipcodeTouched,setZipcodeTouched] = useState(false);
    const enteredZipcodeIsValid = zipcode !=="";
    const zipcodeIsInvalid = !enteredZipcodeIsValid && zipcodeTouched;

    const [country, setCountry] = useState('');
    const [countryTouched,setCountryTouched] = useState(false);
    const enteredCountryIsValid = country.trim() !=="";
    const countryIsInvalid = !enteredCountryIsValid && countryTouched;

    const [address_id, setAddressId] = useState();

    useEffect(() => {
        axios.get("http://localhost/yii/yii/yii/yii-backend/web/users/").then(res => setUsersData(res.data.items));
    });
    useEffect(async () => {
        if(props.onEdit.isEdit)
        {
            await axios.get(`http://localhost/yii/yii/yii/yii-backend/web/useraddress/view?id=${props.onEdit.address_id}`)
            .then(res =>{
              setAddressId(res.data.address_id);
              setAddressline1(res.data.addressline1);
              setAddressline2(res.data.addressline2);
              setCity(res.data.city);
              setState(res.data.state);
              setZipcode(res.data.zipcode);
              setCountry(res.data.country);
              setUserId(res.data.user_id);    
            });
        }
    }, []);
    let button;
    if(props.onEdit.isEdit)
    {
        button = <button className="btn btn-success my-5" onClick={()=>{props.updateAddress(address_id,userId,addressline1,addressline2,
                                                                        city,state,zipcode,country)}}><AiTwotoneEdit/>Update Address</button>;
    }
    else
    {
        button = <button className="btn btn-success my-5" onClick={()=>{props.addAddress(addressline1,addressline2,city,state,zipcode,country,userId)}}> <AiOutlinePlus /> &nbsp; Add Address</button>
    }
   
    const userVal = (event) => {
      setUserId(event.target.value)
    }
    const addressLine1Handler=(event)=>{
      setAddressline1(event.target.value);
    }
    const addressLine1BlurHandler = (event) => {
    setAddressline1Touched(true);
    };

    const addressLine2Handler = (event) =>{
      setAddressline2(event.target.value);
    }
    const addressLine2BlurHandler = (event) => {
    setAddressline2Touched(true);
    };

    const cityHandler = (event) =>{
      setCity(event.target.value)
    }
    const cityBlurHandler = (event) => {
    setCityTouched(true);
    };

    const stateHandler = (event) =>{
      setState(event.target.value)
    }
    const stateBlurHandler = (event) => {
    setStateTouched(true);
    };

    const zipcodeHandler = (event) =>{
      setZipcode(event.target.value)
    }
    const zipcodeBlurHandler = (event) => {
    setZipcodeTouched(true);
    };

    const countryHandler = (event) =>{
      setCountry(event.target.value)
    }
    const countryBlurHandler = (event) => {
    setCountryTouched(true);
    };

    return (
        <>
                <div className="form-group">
                    <select className="form-control" onChange={userVal} value={userId}>
                        <option>Select User</option>
                        {
                            database.map((value, index)=>(
                                    <option value={value.id}>{value.firstname} {value.lastname}</option>
                            ))
                        }
                    </select>    
                </div>
                <Input 
                    label="Address Line 1" 
                    input={{
                        id : 'address_line1',
                        type : 'text',
                        placeholder:'Enter Address Line 1',
                        name:"addressline1"
                    }}
                    value = {addressline1}
                    onChange={addressLine1Handler}
                    onBlur={addressLine1BlurHandler}
                >
                </Input>
                {addressline1IsInvalid && (<p className="text-danger">Address Line 1 must not be empty.</p>)}
 
               <Input 
                    label="Address Line 2" 
                    input={{
                        id : 'address_line2',
                        type : 'text',
                        placeholder:'Enter Address Line 2',
                        name:"addressline2"
                    }}
                    value = {addressline2}
                    onChange={addressLine2Handler}
                    onBlur={addressLine2BlurHandler}
                >
                </Input>
                 {addressline2IsInvalid && (<p className="text-danger">Address Line 2 must not be empty.</p>)}

                <Input 
                    label="City" 
                    input={{
                        id : 'city',
                        type : 'text',
                        placeholder:'Enter City',
                        name:"city"
                    }}
                    value = {city}
                    onChange={cityHandler}
                    onBlur={cityBlurHandler}
                >
                </Input>
                 {cityIsInvalid && (<p className="text-danger">City must not be empty.</p>)}

                <Input 
                    label="State" 
                    input={{
                        id : 'state',
                        type : 'text',
                        placeholder:'Enter State',
                        name:"state"
                    }}
                    value = {state}
                    onChange={stateHandler}
                    onBlur={stateBlurHandler}
                >
                </Input>
                {stateIsInvalid && (<p className="text-danger">State must not be empty.</p>)}

                <Input 
                    label="Zip Code" 
                    input={{
                        id : 'zipcode',
                        type : 'text',
                        placeholder:'Enter Zipcode',
                        name:"zipcode"
                    }}
                    value = {zipcode}
                    onChange={zipcodeHandler}
                    onBlur={zipcodeBlurHandler}
                >
                </Input>
                {zipcodeIsInvalid && (<p className="text-danger">Zipcode must not be empty.</p>)}
                <Input 
                    label="Country" 
                    input={{
                        id : 'country',
                        type : 'text',
                        placeholder:'Enter Country',
                        name:"country"
                    }}
                    value = {country}
                    onChange={countryHandler}
                    onBlur={countryBlurHandler}
                >
                </Input>
                {countryIsInvalid && (<p className="text-danger">Country must not be empty.</p>)}
                
                {button}
            </>
    )
}
export default UserAddressForm