let editvalue;
let fname1, lname1, gender1, email1;

function saveData() {
    fname1 = document.getElementById("fname").value;
    lname1 = document.getElementById("lname").value;
    gender1 = document.getElementById("gender").value;
    email1 = document.getElementById("email").value;

    let user_records = new Array();

    user_records = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []
    if (user_records.some((v) => { return v.email == email1 })) {
        alert("This email address is already being used");
    }
    else {
        user_records.push({
            "fname": fname1,
            "lname": lname1,
            "gender": gender1,
            "email": email1
        })
        localStorage.setItem("users", JSON.stringify(user_records));
        document.getElementById("userForm").reset();
        document.getElementById("userForm").style.display = "none";
    }

}

function showuser() {
    let showuser1 = localStorage.getItem("users");
    if (showuser1 == null) {
        user_records = [];
    }
    else {
        user_records = JSON.parse(showuser1);
    }
    let h1 = '';
    let userlist = document.getElementById("userlist");
    user_records.forEach((item, index) => {

        h1 += `
            <tbody>
            <tr>
            <td >${item.fname}</td>
            <td style="padding-left: 60px;">${item.lname}</td>
            <td style="padding-left: 60px;">${item.gender}</td>
            <td style="padding-left: 60px;">${item.email}</td>
            <td style="padding-left: 200px;"><button type="button" class="btn btn-primary"onclick="edituser(${index}),updateform()">Update</button></td>
            <td><button type="button" class="btn btn-danger" onclick="confirmdeleteUser(${index})" >Delete</button></td> 
        </tr>

            </tbody>`;

    });

    userlist.innerHTML = h1;
}
function edituser(index) {
    let saveIndex = document.getElementById("userindex")
    saveIndex.value = index;
    let e1 = localStorage.getItem("users");
    let user_records = JSON.parse(e1);
    editvalue = user_records[index];
    f_name.value = editvalue.fname;
    l_name.value = editvalue.lname;
    g_ender.value = editvalue.gender;
    e_mail.value = editvalue.email;
}
function Update() {
    fname1 = document.getElementById("f_name").value;
    lname1 = document.getElementById("l_name").value;
    gender1 = document.getElementById("g_ender").value;
    email1 = document.getElementById("e_mail").value;

    let e1 = localStorage.getItem("users");
    let user_records = JSON.parse(e1);
    let saveIndex = document.getElementById("userindex").value;
    user_records[saveIndex].fname = fname1;
    user_records[saveIndex].lname = lname1;
    user_records[saveIndex].gender = gender1;
    user_records[saveIndex].email = email1;
    localStorage.setItem("users", JSON.stringify(user_records));
    document.getElementById("updateform").style.display = "none";
}

function confirmdeleteUser(index) {
    let i = index;
    let confirmDelete = confirm("Are you sure you want to delete this user");
    if (confirmDelete) {
        deleteUser(i);
    }

}

function deleteUser(index) {
    let d1 = localStorage.getItem("users");
    let user_records = JSON.parse(d1);
    user_records.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(user_records));
    showuser();
}




