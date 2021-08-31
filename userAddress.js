let editvalue;
let address1, address2, city, state, pincode, country;

function openFormAddress() {
    document.getElementById("userFormAddress").style.display = "block";

}

function closeFormAddress() {
    document.getElementById("userFormAddress").style.display = "none";
    document.getElementById("updateformAddress").style.display = "none";
}
function updateformAddress() {
    document.getElementById("updateformAddress").style.display = "block";
}

function saveDataAddress() {
    address1 = document.getElementById("address1").value;
    address2 = document.getElementById("address2").value;
    city = document.getElementById("city").value;
    state = document.getElementById("state").value;
    pincode = document.getElementById("pincode").value;
    country = document.getElementById("country").value;

    let user_records = new Array();

    user_records = JSON.parse(localStorage.getItem("userAddress")) ? JSON.parse(localStorage.getItem("userAddress")) : []
    user_records.push({
        "address1": address1,
        "address2": address2,
        "city": city,
        "state": state,
        "pincode": pincode,
        "country": country,
        "isDeleted": false
    })
    localStorage.setItem("userAddress", JSON.stringify(user_records));
    document.getElementById("userFormAddress").reset();
    document.getElementById("userFormAddress").style.display = "none";
    showuserAddress();
    alert("New Data Added Successfully!!");

}
// Search User Address 
function searchUserAddress() {
    let data = document.getElementById("searchUserAddress").value;
    //console.log(data);
    searchAdd(data);
}
function searchAdd(data) {
    let u1 = localStorage.getItem("userAddress");
    if (u1 == null) {
        user_records = [];
    }
    else {
        user_records = JSON.parse(u1);
    }
    let h1 = '';
    let userAddresslist = document.getElementById("userAddresslist"); //style="padding-left: 5px; style="padding-left: 45px;style="padding-left: 50px;style="padding-left: 60px;style="padding-left: 80px;style="padding-left: 100px;style="padding-left: 150px;"
    user_records.forEach((item, index) => {
        if (item.isDeleted === false) {
            let tempData = data.toUpperCase(); let tempAddress1 = item.address1.toUpperCase();
            let tempAddress2 = item.address2.toUpperCase(); let tempCity = item.city.toUpperCase();
            let tempState = item.state.toUpperCase(); let tempCountry = item.country.toUpperCase();
            //console.log(tempData, tempAddress1, tempAddress2, tempCity, tempState, item.pincode, tempCountry);
            if (tempAddress1 == tempData || tempAddress2 == tempData || tempCity == tempData || tempState == tempData ||
                item.pincode == tempData || tempCountry == tempData) {
                h1 += `
            <tbody>
                <tr> 
                    <td >${item.address1}</td>
                    <td style="padding-left:45px">${item.address2}</td>
                    <td style="padding-left:30px">${item.city}</td>
                    <td >${item.state}</td>
                    <td >${item.pincode}</td>
                    <td >${item.country}</td>
                    <td ><button type="button" class="btn btn-primary"onclick="edituserAddress(${index}),updateformAddress()">Update</button></td>
                    <td><button type="button" class="btn btn-danger" onclick="confirmdeleteUserAddress(${index})" >Delete</button></td> 
                </tr>
            </tbody>
            `
            }
        }
    });
    userAddresslist.innerHTML = h1;
    //document.getElementById("searchUserAddress").reset();
    //document.getElementById("searchUserAddress").style.display = "none";

}
// search user ends

//display non deleted data 
function showuserAddress() {
    let u1 = localStorage.getItem("userAddress");
    if (u1 == null) {
        user_records = [];
    }
    else {
        user_records = JSON.parse(u1);
    }
    let h1 = '';
    let userAddresslist = document.getElementById("userAddresslist"); //style="padding-left: 5px; style="padding-left: 45px;style="padding-left: 50px;style="padding-left: 60px;style="padding-left: 80px;style="padding-left: 100px;style="padding-left: 150px;"
    user_records.forEach((item, index) => {
        if (item.isDeleted === false) {
            h1 += `
            <tbody>
                <tr> 
                    <td >${item.address1}</td>
                    <td style="padding-left:45px">${item.address2}</td>
                    <td style="padding-left:30px">${item.city}</td>
                    <td >${item.state}</td>
                    <td >${item.pincode}</td>
                    <td >${item.country}</td>
                    <td ><button type="button" class="btn btn-primary"onclick="edituserAddress(${index}),updateformAddress()">Update</button></td>
                    <td><button type="button" class="btn btn-danger" onclick="confirmdeleteUserAddress(${index})" >Delete</button></td> 
                </tr>
            </tbody>
            `
        }
        // else {
        //     h1 += `
        //     <tbody>
        //         <tr> 
        //             <td ></td>
        //             <td style="padding-left:45px"></td>
        //             <td style="padding-left:30px"></td>
        //             <td ></td>
        //             <td ></td>
        //             <td ></td>
        //         </tr>
        //     </tbody>
        //     `

        // }
    });
    userAddresslist.innerHTML = h1;
}

function edituserAddress(index) {
    let saveIndex = document.getElementById("userindex");
    saveIndex.value = index;
    let e1 = localStorage.getItem("userAddress");
    let user_records = JSON.parse(e1);
    editvalue = user_records[index];
    address1_u.value = editvalue.address1;
    address2_u.value = editvalue.address2;
    city_u.value = editvalue.city;
    state_u.value = editvalue.state;
    pincode_u.value = editvalue.pincode;
    country_u.value = editvalue.country;

}

function UpdateAddress() {
    address1 = document.getElementById("address1_u").value;
    address2 = document.getElementById("address2_u").value;
    city = document.getElementById("city_u").value;
    state = document.getElementById("state_u").value;
    pincode = document.getElementById("pincode_u").value;
    country = document.getElementById("country_u").value;

    let e1 = localStorage.getItem("userAddress");
    let user_records = JSON.parse(e1);
    let saveIndex = document.getElementById("userindex").value;
    user_records[saveIndex].address1 = address1;
    user_records[saveIndex].address2 = address2;
    user_records[saveIndex].city = city;
    user_records[saveIndex].state = state;
    user_records[saveIndex].pincode = pincode;
    user_records[saveIndex].country = country;
    localStorage.setItem("userAddress", JSON.stringify(user_records));
    document.getElementById("updateformAddress").style.display = "none";
    showuserAddress();
    alert("Data Updated");
}

function confirmdeleteUserAddress(index) {
    let i = index;
    let confirmDelete = confirm("Are you sure you want to delete the data?");
    if (confirmDelete) {
        deleteUserAddress(i);
    }
    else {
        alert("Deletion Cancelled!")
    }
}
//isDeleted is set to true, data will not be deleted from localStorage, true isDeleted values will not be displayed
function deleteUserAddress(index) {
    let d1 = localStorage.getItem("userAddress");
    let user_records = JSON.parse(d1);
    user_records[index].isDeleted = true;
    localStorage.setItem("userAddress", JSON.stringify(user_records));
    showuserAddress();
    alert("Data deleted successfully!!");
}
//delete permanently from localStorage
// function deleteUserAddress(index) {
//     let d1 = localStorage.getItem("userAddress");
//     let user_records = JSON.parse(d1);
//     user_records.splice(index, 1);
//     localStorage.setItem("userAddress", JSON.stringify(user_records));
//     showuserAddress();
//     alert("Data deleted successfully!!");
// }

