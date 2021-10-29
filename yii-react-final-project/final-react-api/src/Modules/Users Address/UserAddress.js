// import React, { useState, useEffect } from "react";
// import UserAddressForm from "./UserAddressForm";
// import UserAddressService from "./UserAddressService";
// import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
// import Input from "../../Shared/UI/Input/Input";
// import Td from "../../Shared/UI/Table/Td";
// import axios from "axios";
// import UserAddressList from "./UserAddressList";
// import Pagination from '../../Shared/UI/Pagination/Pagination';


// const UserAddress = (props) => {
//   const [buttonPopup, setButtonPopup] = useState(false);
  
  
// const [address, setData] = useState([]);
//  //Pagination Variables 
// const [currentPage, setCurrentPage] = useState(1);
//     const [addressPerPage] = useState(4);
// const [searchCity, setSearchCity] = useState("");

//  const [editAddressData, setEditAddressData] = useState({isEdit:false,add_id:''});



// useEffect(() => {
// getList();
// }, []);


// async function getList(){
//  await axios.get(
//       "http://localhost/yii/yii/yii/yii-backend/web/useraddress/read"
//      ).then((result) => {
//        setData(result.data.items);
//      });
// }



//  async function submitAddressHandler(addressline1,addressline2,city,state,zipcode,country)
//  {
    
//     console.log("DATA COMING!!",addressline1,addressline2,city,state,zipcode,country);
//     if( addressline1 !=="" && addressline2!=="" && city!=="" 
//     && state!=="" && zipcode!=="" && country!=="" )
//     {
//             setButtonPopup(false);
//           await axios.post("http://localhost/yii/yii/yii/yii-backend/web/useraddress/create",
//           {
//               addressline1 : addressline1,
//               addressline2 :addressline2,
//               city: city,
//               state :state,
//               zipcode : zipcode,
//               country : country,
//             },
            
//             );//.then(()=>{})//.then(() => {
//               getList();
          
//           }
//     else{
//       alert("Please enter all Address Data");
//     }
   
   
//   }



// const addDeleteHandler = async (address_id) => 
// {
//   const c = window.confirm("Data will be Deleted!!");
//     if(c===true)
//     {
//           await axios.put(`http://localhost/yii/yii/yii/yii-backend/web/useraddress/update?id=${address_id}`,
//           {'is_deleted':1});//.then(()=>{getList();});
//           getList();
//     }
// }



// const editAddressHandler = (address_id) =>{
//   console.log("ID aa rahi hai",address_id);

//   setEditAddressData({isEdit:true,add_id:address_id});
//   console.log("id dikhade bhai",editAddressData);
//   setButtonPopup(true);

// }







// const searchCityHandler = async (e) =>{
//   setSearchCity(e.target.value);
  
//   await axios.get(`http://localhost/yii/yii/yii/yii-backend/web/useraddress?filter[city][like]=${searchCity}`).
  
//   then((result)=>{setData(result.data.items);console.log("search wala data=",address);});
  
  
// }


// //Pagination Logic
// const indexOfLastAddress = currentPage * addressPerPage;
// const indexOfFirstAddress = indexOfLastAddress - addressPerPage;
// const currentAddress = address.slice(
//     indexOfFirstAddress,
//     indexOfLastAddress
// );
// const paginate = (pageNumber) => setCurrentPage(pageNumber);


//   return (
//     <>
//       <div className="container">
//         <h1 className="text-center">User Address</h1>
       
//         <Input
//           label="Search User Address"
//           input={{
//             id: "search_address",
//             type: "search",
//             placeholder: "Enter City to Search",
//             name: "searchUserAddress",
//           }}
//           value={searchCity}
//           onChange={searchCityHandler}
//         />

//         <br />
//         <br />
//         <button
//           type="button"
//           className="btn btn-outline-secondary"
//           onClick={() => {setButtonPopup(true) ;}}
//         >
//           Add New User Address
//         </button>

       
//         <table className="table table-success table-striped">
//         <thead>
//             <th>Address ID</th>
//             <th>Address Line One</th>
//             <th>Address Line Two</th>
//             <th>City</th>
//             <th>State</th>
//             <th>Pincode</th>
//             <th>Country</th>
//             <th>Actions</th>
//             <th></th>
//           </thead>
//           {<UserAddressList
//           database={currentAddress}
//           onEdit={editAddressHandler} 
//             onDelete={addDeleteHandler}
//             >
//               </UserAddressList>}
//     </table>
 
        
//         <PopupModal trigger={buttonPopup} settrigger={setButtonPopup} title="Add Address">
//           <UserAddressForm addAddress={submitAddressHandler}  />
//         </PopupModal>
//       </div>
//       <Pagination
//                 dataPerPage={addressPerPage}
//                 totalData={address.length}
//                 paginate={paginate}
//             />
//     </>
//   );
//       }
// export default UserAddress;



import React, { useState, useEffect } from "react";
import PopupModal from "../../Shared/UI/PopupModal/PopupModal";
import UserAddressList from "./UserAddressList";
import {
  deleteAddress,
  getAddressData,
  addAddress,
  addressSearch,
  editAddress,
  sort
} from "../../Shared/Services/Address-Service";
import UserAddressForm from "./UserAddressForm";
import Input from "../../Shared/UI/Input/Input";
import Add from "../../Shared/UI/Buttons/Add";
import axios from "axios";
import Pagination from "../../Shared/UI/Pagination/Pagination";
import SortList from "../../Shared/UI/SortList/SortList";

const UserAddress = () => {
  const sortType = [
        {
            value:"city ASC",
            text:"City Ascending"
        },
        {
            value:"city DESC",
            text:"City Descending"
        },
        {
            value:"state ASC",
            text:"State Ascending"
        },
        {
            value:"state DESC",
            text:"State Decending"
        }
    ];
  // Set State for Module Data
  const [addressData, setAddressData] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);

  // Set Set State for Search Module Title Variable
  const [searchAddressCity, setSearchAddressCity] = useState("");

  // Set State for Pagination Variables
  const [currentPage, setCurrentPage] = useState(1);
  const [addressPerPage] = useState(2);

  // Set State for Edit Module Variable
  const [editAddressData, setEditAddressData] = useState({
    isEdit: false,
    address_id: "",
  });

  // Set State for Sort Module Variable
  const [sortStatus, setSortStatus] = useState(true);

  // Load Module Data
  useEffect(() => {
    loadAddressData();
  }, []);
  const loadAddressData = async () => {
    const res = await getAddressData();
    setAddressData(res.data.items);
  };

  // Pagination
  const indexOfLastAddress = currentPage * addressPerPage;
  const indexOfFirstAddress = indexOfLastAddress - addressPerPage;
  const currentAddress = addressData.slice(
    indexOfFirstAddress,
    indexOfLastAddress
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sort Modules
  // const handleSort = () => {
  //   const data = addressData;
  //   if (sortStatus == true) {
  //     let sorted = data.sort((a, b) => a.city.localeCompare(b.city));
  //     setAddressData(sorted);

  //     setSortStatus(!sortStatus);
  //   } else {
  //     let sorted = data.sort((a, b) => b.city.localeCompare(a.city));
  //     console.log("rev - sorted-----", sorted);
  //     setAddressData(sorted);

  //     setSortStatus(!sortStatus);
  //   }
  // };

  // Submit Handler
  const submitAddressHandler = async (addressline1, addressline2, city, state, zipcode, country,user_id ) => {
    if (user_id !== "" && addressline1 !== "" && addressline2 !== "" && city !== "" && state !== "" && zipcode !== "" && country !== "") {
      setButtonPopup(false);
      const data = await addAddress(addressline1, addressline2, city, state, zipcode, country, user_id);
      loadAddressData();
    } else {
      alert("Please Fill All Fields");
    }
  };

  // Search Module by Title
  const searchAddressCityHandler = async (event) => {
    setSearchAddressCity(event.target.value);
    const response = await addressSearch(searchAddressCity);
    setAddressData(response.data.items);
  };

  // Delete Module
  const deleteAddressHandler = async (address_id) => {
    const confirm = window.confirm(
      "Are you sure you wish to delete this Address?"
    );
    if (confirm === true) {
      const data = await deleteAddress(address_id);
      loadAddressData();
    }
  };

  // Edit Module
  const editAddressHandler = async (address_id) => {
    setEditAddressData({ isEdit: true, address_id: address_id });
    setButtonPopup(true);
  };
  const updateAddressHandler = async (address_id,user_id,addressline1, addressline2, city, state, zipcode, country ) => {
    setButtonPopup(false);
    const data = await editAddress(address_id,user_id,addressline1, addressline2, city, state, zipcode, country);
    loadAddressData();
  };

  const handleSort = async(event) => {
    const sortBy = event.target.value;
    if (sortBy == "city ASC") {
      const res = await sort("city");  
      setAddressData(res.data.items);
    } else if(sortBy == "city DESC") {
        const res = await sort("-city");  
        setAddressData(res.data.items);
    }
    else if (sortBy == "state ASC") {
        const res = await sort("state");  
        setAddressData(res.data.items);
    } else if(sortBy == "state DESC") {
        const res = await sort("-state");  
        setAddressData(res.data.items);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center"> User Address</h1>
      <Input
        label="Search"
        input={{
          id: "search_address",
          type: "search",
          placeholder: "Enter Address City to search",
          name: "searchAddress",
        }}
        value={searchAddressCity}
        onChange={searchAddressCityHandler}
      ></Input>

      <div className="form-group mt-5">
        <b><label>Sort By</label></b>
        <select className="form-control" onChange={handleSort} name="sortList">
          <option>Select Sort By</option>
            {
              sortType.map((currentValue, index)=>{
                return(<SortList key={index} value={currentValue.value}>{currentValue.text}</SortList>);
              })
            }
        </select>
      </div>

      <Add
        other={{
          onClick: () => {
            setButtonPopup(true);
            setEditAddressData(false);
          },
        }}
        buttonName="Add New Address"
      />
      <table className="table table-secondary table-striped">
        <thead>
          <th>Address Id</th>
          <th>User First Name</th>
          <th>User Last Name</th>
          <th>Address Line 1</th>
          <th>Address Line 2</th>
          <th>City</th>
          <th>State</th>
          <th>Zip</th>
          <th>Country</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        {
          <UserAddressList
            database={currentAddress}
            onAddressDelete={deleteAddressHandler}
            onAddressEdit={editAddressHandler}
          ></UserAddressList>
        }
      </table>
      <PopupModal
        trigger={buttonPopup}
        settrigger={setButtonPopup}
        title="Add Address"
      >
        <UserAddressForm
          addAddress={submitAddressHandler}
          updateAddress={updateAddressHandler}
          onEdit={editAddressData}
        ></UserAddressForm>
      </PopupModal>
      <Pagination
        dataPerPage={addressPerPage}
        totalData={addressData.length}
        paginate={paginate}
      />
    </div>
  );
};

export default UserAddress;