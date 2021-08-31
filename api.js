// API Class: Represents API
class API {
  constructor(
    url,
    title,
    description,
    project,
    module,
    method,
    request,
    response
  ) {
    this.url = url;
    this.title = title;
    this.description = description;
    this.project = project;
    this.module = module;
    this.method = method;
    this.request = request;
    this.response = response;
    this.isDelete = false;
  }
}

// UI Class: Hnadle UI Tasks
class UI {
  // Display APIs
  static displayApis() {
    const apis = Store.getApis();

    apis.forEach(UI.addApiToList);
  }

  // Add Api to List
  static addApiToList(api, index) {
    if (api.isDelete === false) {
      const list = document.querySelector("#api-list");

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${api.url}</td>
        <td>${api.title}</td>
        <td>${api.description}</td>
        <td>${api.project}</td>
        <td>${api.module}</td>
        <td>${api.method}</td>
        <td>${api.request}</td>
        <td>${api.response}</td>
        <td><a href="#" class="btn btn-save btn-md update" onclick="UI.updateApi(${index})">Update</a></td>
        <td><a href="#" class="btn btn-danger btn-md delete" onclick="UI.deleteApi(${index})">Delete</a></td>
        `;
      list.appendChild(row);
    }
  }
  // Delete Api
  static deleteApi(el) {
    const apis = Store.getApis();
    // console.log(apis);
    // console.log(apis[el]);
    apis[el].isDelete = true;
    //apis.splice(el, 1);
    document.querySelector("#api-list").addEventListener("click", (event) => {
      if (event.target.classList.contains("delete")) {
        confirm("Do you want to delete?");
        event.preventDefault();
        removeItem(event.target);
      }
    });

    function removeItem(button) {
      var item = getItem(button),
        confirmMessage;

      if (item) {
        confirmMessage = item.getAttribute("data-confirm");

        if (!confirmMessage || window.confirm(confirmMessage)) {
          item.parentNode.removeChild(item);
        }
      } else {
        throw new Error("No item found");
      }
    }

    function getItem(button) {
      var element = button.parentNode,
        item = null;

      while (element) {
        if (element.nodeName === "LI" || element.nodeName === "TR") {
          item = element;
          break;
        }

        element = element.parentNode;
      }

      return item;
    }
    localStorage.setItem("apis", JSON.stringify(apis));
  }

  // static showAlert(message, className) {
  //   const div = document.createElement("div");
  //   div.className = `alert alert-${className}`;
  //   div.appendChild(document.createTextNode(message));
  //   const container = document.querySelector(".content");
  //   const form = document.querySelector("#api-form");
  //   container.insertBefore(div, form);

  //   //Vanish in 3 Seconds
  //   setTimeout(() => document.querySelector(".alert").remove(), 3000);
  // }

  static clearFields() {
    document.querySelector("#apiUrl").value = "";
    document.querySelector("#apiTitle").value = "";
    document.querySelector("#apiDescription").value = "";
    document.querySelector("#apiProject").value = "";
    document.querySelector("#apiModule").value = "";
    document.querySelector("#apiMethod").value = "";
    document.querySelector("#apiRequest").value = "";
    document.querySelector("#apiResponse").value = "";
  }

  static updateApi(index) {
    //console.log("index", index);
    const apis = Store.getApis();
    document.querySelector("#apiUpdateUrl").value = `${apis[index].url}`;
    document.querySelector("#apiUpdateTitle").value = `${apis[index].title}`;
    document.querySelector(
      "#apiUpdateDescription"
    ).value = `${apis[index].description}`;
    document.querySelector(
      "#apiUpdateProject"
    ).value = `${apis[index].project}`;
    document.querySelector("#apiUpdateModule").value = `${apis[index].module}`;
    document.querySelector("#apiUpdateMethod").value = `${apis[index].method}`;
    document.querySelector(
      "#apiUpdateRequest"
    ).value = `${apis[index].request}`;
    document.querySelector(
      "#apiUpdateResponse"
    ).value = `${apis[index].response}`;
    //let saveButton = (document.querySelector("#save").value = "Update");
    apiUpdateForm();
    document.querySelector("#update").addEventListener("click", function () {
      apis[index].url = document.querySelector("#apiUpdateUrl").value;
      apis[index].title = document.querySelector("#apiUpdateTitle").value;
      apis[index].description = document.querySelector(
        "#apiUpdateDescription"
      ).value;
      apis[index].project = document.querySelector("#apiUpdateProject").value;
      apis[index].module = document.querySelector("#apiUpdateModule").value;
      apis[index].method = document.querySelector("#apiUpdateMethod").value;
      apis[index].request = document.querySelector("#apiUpdateRequest").value;
      apis[index].response = document.querySelector("#apiUpdateResponse").value;

      localStorage.setItem("apis", JSON.stringify(apis));
    });
  }
}

// Store Class: Handles Storage
class Store {
  static getApis() {
    let apis;
    if (localStorage.getItem("apis") === null) {
      apis = [];
    } else {
      apis = JSON.parse(localStorage.getItem("apis"));
    }

    return apis;
  }

  static addApis(api) {
    const apis = Store.getApis();

    apis.push(api);

    localStorage.setItem("apis", JSON.stringify(apis));
  }

  static removeApis() {
    const apis = Store.getApis();

    apis.forEach((api, index) => {});
  }
}

// Event: Display APIs
const load = document.getElementById("api-load");
load.addEventListener("click", UI.displayApis);

// Event: Open Form
const openApiForm = () =>
  (document.querySelector("#api-form").style.display = "block");

// Event: Close Form
const closeApiForm = () =>
  (document.querySelector("#api-form").style.display = "none");

// Event: Update Form
const apiUpdateForm = () => {
  document.querySelector("#api-update-form").style.display = "block";
};

// Event: Close Form
const closeUpdateApiForm = () =>
  (document.querySelector("#api-update-form").style.display = "none");

// Event: Add a API
document.querySelector("#api-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get Form Values
  const url = document.querySelector("#apiUrl").value;
  const title = document.querySelector("#apiTitle").value;
  const description = document.querySelector("#apiDescription").value;
  const project = document.querySelector("#apiProject").value;
  const module = document.querySelector("#apiModule").value;
  const method = document.querySelector("#apiMethod").value;
  const request = document.querySelector("#apiRequest").value;
  const response = document.querySelector("#apiResponse").value;

  // Validate
  if (
    url === "" ||
    title === "" ||
    description === "" ||
    project === "" ||
    module === "" ||
    method === "" ||
    request === "" ||
    response === ""
  ) {
    UI.showAlert("Please fill the fields", "danger");
  } else {
    // Instantiate api
    const api = new API(
      url,
      title,
      description,
      project,
      module,
      method,
      request,
      response
    );

    // Add Api to UI
    UI.addApiToList(api);

    // Add Api to Store
    Store.addApis(api);

    // //Show success message
    // UI.showAlert("API Added", "success");

    // Clear Fields
    UI.clearFields();
  }
});

// // Event: Remove a API
// document.querySelector("#api-list").addEventListener("click", (e) => {
//   UI.deleteApi(e.target);
// });

// Event: Search API

const searchApi = (searchByName) => {
  console.log(searchByName);
  document.getElementById("api-list").innerHTML = "";
  var apiData = JSON.parse(localStorage.getItem("apis"));
  for (var i = 0; i < apiData.length; i++) {
    if (apiData[i].title.toUpperCase().includes(searchByName.toUpperCase())) {
      document.getElementById("api-list").innerHTML += `<tr>
      <td>${apiData[i].url}</td>
      <td>${apiData[i].title}</td>
      <td>${apiData[i].description}</td>
      <td>${apiData[i].project}</td>
      <td>${apiData[i].module}</td>
      <td>${apiData[i].method}</td>
      <td>${apiData[i].request}</td>
      <td>${apiData[i].response}</td>
      <td><a href="#" class="btn btn-save btn-md update" onclick="UI.updateApi(${apiData[i]})">Update</a></td>
      <td><a href="#" class="btn btn-danger btn-md delete" onclick="UI.deleteApi(${apiData[i]})">Delete</a></td>
			</tr>`;
    }
  }
};

// // Get input element
// let filterInput = document.getElementById("search-api");

// // Add Event Listener
// filterInput.addEventListener("keyup", filterNames);

// function filterNames() {
//   // Get value of input
//   let filterValue = document.getElementById("search-api").value.toUpperCase();
//   console.log("filter", filterValue);
//   // Get names ul
//   let ul = document.getElementById("listApi");
//   console.log("ul", ul);
//   // Get lis from ul
//   let li = ul.querySelectorAll(".api-search");
//   console.log("li", li);
//   // Loop through collection item lis
//   for (let i = 0; i < li.length; i++) {
//     let a = li[i].getElementsByTagName("td")[0];
//     console.log("a", a);
//     // if matched
//     if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// }
