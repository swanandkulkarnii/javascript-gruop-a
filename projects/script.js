function saveData() {
    let title, description;
    title = document.getElementById("title").value;
    description = document.getElementById("description").value;


    let projects_records = new Array();

    projects_records = JSON.parse(localStorage.getItem("projects")) ? JSON.parse(localStorage.getItem("projects")) : []
    if (projects_records.some((v) => { return v.title == title })) {
        alert("duplicate data");
    }
    else {
        projects_records.push({
            "title": title,
            "description": description
        })
        localStorage.setItem("projects", JSON.stringify(projects_records));
    }

}

function showprojects() {
    let u1 = localStorage.getItem("projects");
    if (u1 == null) {
        projects_records = [];
    }
    else {
        projects_records = JSON.parse(u1);
    }
    let h1 = '';
    let projectslist = document.getElementById("projectslist");
    projects_records.forEach((item, index) => {

        h1 += `
            <tbody>
            <tr>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td style="padding-left: 0px;"><button type="button" class="btn-update btn btn-primary btn-margin" onclick="openFormupdate(), editprojects(${index}), myForm-update()"
                    >Update</button></td>
            <td><button type="button" class="btn btn-danger" onclick="deleteProjects(${index})" >Delete</button></td>
        </tr>

            </tbody>`;

    });

    projectslist.innerHTML = h1;


}


function deleteProjects(index) {
    let d1 = localStorage.getItem("projects");
    let projects_records = JSON.parse(d1);
    projects_records.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projects_records));
    showprojects();
    alert("Data deleted Sucessfully!")
}

function confirmdeleteProjectAddress(index) {
    let i = index;
    let confirmDelete = confirm("Are you sure you want to delete the data?");
    if (confirmDelete) {
        deleteProjects(i);
    }
    else {
        alert("Deletion Cancelled!")
    }
}



function search() {
    let title,searchQuery;
    title = document.getElementById("title").value;
    description = document.getElementById("description").value;
    searchQuery = document.getElementById("searchbar").value;
    projects_records = JSON.parse(localStorage.getItem("projects")) ? JSON.parse(localStorage.getItem("projects")) : []
    if (projects_records.some((v) => { return v.title == searchQuery })) {
        alert("Project found");
    }
    else {
        alert("Record Doesnot exist");
    //     localStorage.setItem("projects", JSON.stringify(projects_records));
    }

}



let editvalue;
let title1, description1;

function editprojects(index){
    let saveIndex = document.getElementById("projectsindex")
    saveIndex.value = index;
    let e1 = localStorage.getItem("projects");
    let projects_records = JSON.parse(e1);
    editvalue = projects_records[index];
    title_.value = editvalue.title;
    description_.value = editvalue.description;
}

function Update(){
    title1 = document.getElementById("title_").value;
    description1 = document.getElementById("description_").value;

    let e1 = localStorage.getItem("projects");
    let projects_records = JSON.parse(e1);
    let saveIndex = document.getElementById("projectsindex").value;
    projects_records[saveIndex].title = title1;
    projects_records[saveIndex].description = description1;
    localStorage.setItem("projects", JSON.stringify(projects_records));
    document.getElementById("myForm-update").style.display = "none";
}



