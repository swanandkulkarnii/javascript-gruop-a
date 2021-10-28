import React, { useState, useEffect } from "react";
import UserAddressForm from "./UserAddressForm";
import UserAddressService from "./UserAddressService";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import Input from "../../Shared/UI/Input/Input";
import Td from "../../Shared/UI/Table/Td";
import axios from "axios";
import UserAddressList from "./UserAddressList";
import Pagination from '../../Shared/UI/Pagination/Pagination';


const UserAddress = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  
  
const [address, setData] = useState([]);
 //Pagination Variables 
const [currentPage, setCurrentPage] = useState(1);
    const [addressPerPage] = useState(4);

    //edit varibales
    const [addline1,setAddline1] = useState("");
    const [addline2,setAddline2] = useState("");
    const [addcity,setAddcity] = useState("");
    const [addid,setAddid] = useState(0);

 async function submitAddressHandler(addressline1,addressline2,city,state,zipcode,country){
    // event.preventDefault();
    console.log("DATA COMING!!",addressline1,addressline2,city,state,zipcode,country);
    if( addressline1 !=="" && addressline2!=="" && city!=="" 
    && state!=="" && zipcode!=="" && country!=="" ){
      setButtonPopup(false);
    await axios.post("http://localhost/yii/yii/yii/yii-backend/web/useraddress/create",{
        addressline1 : addressline1,
        addressline2 :addressline2,
        city: city,
        state :state,
        zipcode : zipcode,
        country : country,
      },
      // { headers: headers, mode: "no-cors" } 
      ).then(()=>{getList();})//.then(() => {
        // getList();
        // console.log("After Get list",res.data);
      //});
      // data.addressline1="";
    }
    else{
      alert("Please enter all Address Data");
    }
   
   
  }


const addDeleteHandler = async (address_id) => {
  // alert("address id is = "+ address_id);
  const c = window.confirm("Data will be Deleted!!");
    if(c===true){
   await axios.put(`http://localhost/yii/yii/yii/yii-backend/web/useraddress/update?id=${address_id}`,
    {'is_deleted':1}).then(()=>{getList();});
    
    }
}

function editAddress(address_id,addressline1,addressline2,city){
  //  alert("Edit ID="+address_id);
  // setButtonPopup(true);
  // console.log("EDIT  ADDRESSS",address.data.addressline1);
  console.log("EDIT  ADDRESSS",address_id,addressline1,addressline2,city);
setAddline1(addressline1);
setAddline2(addressline2); 
  setAddcity(city);
  setAddid(address_id);


}

async function getList(){
 await axios.get(
      "http://localhost/yii/yii/yii/yii-backend/web/useraddress/read"
     ).then((result) => {
       setData(result.data.items);
      // setAddline1(result.data.items[1].addressline1);
      // setAddline2(result.data.items[1].addressline2)
      // setAddcity(result.data.items[1].city)
     });
}
// console.log(" ADDRESS LINE 1 OF 0TH INDEX = ",addline1);
useEffect(() => {
getList();
}, []);
console.log("State Var=",address);

const [searchCity, setSearchCity] = useState("");
const searchCityHandler = async (e) =>{
  setSearchCity(e.target.value);
  // console.log(searchCity);
  await axios.get(`http://localhost/yii/yii/yii/yii-backend/web/useraddress?filter[city][like]=${searchCity}`).
  // setData(resp.data.items);
  then((result)=>{setData(result.data.items);console.log("search wala data=",address);});

  // getList();
  
  // console.log("search wala data=",resp);
}
//  getList();
// console.log("Add data = ",address);

//Pagination Logic
const indexOfLastAddress = currentPage * addressPerPage;
const indexOfFirstAddress = indexOfLastAddress - addressPerPage;
const currentAddress = address.slice(
    indexOfFirstAddress,
    indexOfLastAddress
);
const paginate = (pageNumber) => setCurrentPage(pageNumber);

async function updateAddress(){
  console.log("updateAddress DATA= ", addid,addline1, addline2,addcity);
  let items = {addid,addline1, addline2,addcity}
  await axios.put(`http://localhost/yii/yii/yii/yii-backend/web/useraddress/update?id=${addid}`,{'addressline1':addline1,
  'addressline2':addline2,'city':addcity}).then(()=>{getList();});
}

  return (
    <>
      <div className="container">
        <h1 className="text-center">User Address</h1>
       
        <Input
          label="Search User Address"
          input={{
            id: "search_address",
            type: "search",
            placeholder: "Enter City to Search",
            name: "searchUserAddress",
          }}
          value={searchCity}
          onChange={searchCityHandler}
        />

        <br />
        <br />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setButtonPopup(true)}
        >
          Add New User Address
        </button>

       
        <table className="table table-success table-striped">
        <thead>
            <th>Address ID</th>
            <th>Address Line One</th>
            <th>Address Line Two</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Country</th>
            <th>Actions</th>
            <th></th>
          </thead>
 {<UserAddressList
 database={currentAddress}
 onEdit={editAddress} 
  onDelete={addDeleteHandler}
  >
    </UserAddressList>}
    </table>

    <div>
     Address line 1 = <input type = "text" value={addline1} onChange={(e)=>setAddline1(e.target.value)} /> <br/><br/>
     Address line 2 = <input type = "text" value={addline2} onChange={(e)=>setAddline2(e.target.value)} /> <br/><br/>
     City = <input type = "text" value={addcity} onChange={(e)=>setAddcity(e.target.value)} /> <br/><br/>
      <button className="btn btn-primary" onClick={updateAddress}>Update</button>
    </div>
 
        
        <PopupModal trigger={buttonPopup} settrigger={setButtonPopup}>
          <UserAddressForm addAddress={submitAddressHandler} />
        </PopupModal>
      </div>
      <Pagination
                dataPerPage={addressPerPage}
                totalData={address.length}
                paginate={paginate}
            />
    </>
  );
      }
export default UserAddress;
