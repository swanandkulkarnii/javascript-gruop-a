import React, { useState, useEffect } from "react";
import axios from "axios";

import Input from "../../Shared/UI/Input/Input";

const UserAddressForm = (props) => {
  

  const url = "http://localhost/yii/yii/yii/yii-backend/web/useraddress/create";

  const [data,setData] = useState({
    addressline1: "",
      addressline2: "",
        city: "",
        state: "",
        zipcode: "",
        country: ""
  });
  
  const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege...",
  };

  useEffect(async () => {
        if(props.isEdit.isEdit)
        {
            await axios.get(`http://localhost/yii/yii/yii/yii-backend/web/useraddress/view?id=${props.isEdit.address_id}`)
            .then(result =>{
               setData(result.data.items);
            });
        }
    }, []);

    let button;
    if(props.isEdit.isEdit){
        <button
        className="btn btn-success mt-5"
        onClick={()=>{props.updateAddress(data.address_id,data.addressline1,data.addressline2,data.city,data.state,data.zipcode,data.country)}}
      >Update Address
        </button>
    }
    else{
      button = <button className="btn btn-success mt-5"
        onClick={()=>{props.addAddress(data.addressline1,data.addressline2,data.city,data.state,data.zipcode,data.country)}}
      >Add User Address
        </button>
    }

  function handle(e){
    const newdata = {...data};
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    // console.log(newdata);
  }
  return (
<>
<div>
  
    <label> New User Address Form </label>
    <Input 
           label="Address Line One"
          onChange={(e) => handle(e)}

         input = {{id:"addressline1",
          type:"text",
          placeholder:"Address line 1"}}

          value={data.addressline1}
          
           />

    <Input   
     label="Address Line Two"
          onChange={(e) => handle(e)}
        input = {{ id:"addressline2",
          type:"text",
          placeholder:"Address line 2"}}
          value={data.addressline2} 
          />

<Input 
         label="City"
          onChange={(e) => handle(e)}
         input = {{id:"city",
          type:"text",
          placeholder:"City"}}
          value={data.city}
           />

<Input 
           label="State"
          onChange={(e) => handle(e)}
         input = {{id:"state",
          
          type:"text",
          placeholder:"State"}}
          
          value={data.state}   />

<Input 
           label="Zip code"
          onChange={(e) => handle(e)}
        input =  {{id:"zipcode",
          
          type:"text",
          placeholder:"Zip Code"}}
          value={data.zipcode}  />

<Input 
          label="Country"
          onChange={(e) => handle(e)}
        input = {{ id:"country",
          
          type:"text",
          placeholder:"Country" }}
          value={data.country} />
{button}

  
</div>
</>

   
  );
};

export default UserAddressForm;
