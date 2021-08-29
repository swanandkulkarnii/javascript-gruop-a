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
  }
}

// UI Class: Hnadle UI Tasks
class UI {
  static displayApis() {
    const apis = Store.getApis();

    apis.forEach((api) => UI.addApiToList(api));
  }

  static addApiToList(api) {
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
        <td><a href="#" class="btn btn-save btn-md delete">Update</a></td>
        <td><a href="#" class="btn btn-danger btn-md delete">Delete</a></td>
        `;
    list.appendChild(row);
  }

  static deleteApi(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".content");
    const form = document.querySelector("#api-form");
    container.insertBefore(div, form);

    //Vanish in 3 Seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

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

    //Show success message
    UI.showAlert("API Added", "success");

    // Clear Fields
    UI.clearFields();
  }
});

// Event: Remove a API
document.querySelector("#api-list").addEventListener("click", (e) => {
  UI.deleteApi(e.target);
});

// Event: Search API

// Get input element
let filterInput = document.getElementById("search-api");

// Add Event Listener
filterInput.addEventListener("keyup", filterNames);

function filterNames() {
  // Get value of input
  let filterValue = document.getElementById("search-api").value.toUpperCase();

  // Get names ul
  let ul = document.getElementById("listApi");

  // Get lis from ul
  let li = ul.querySelectorAll("tbody.api-search");

  // Loop through collection item lis
  for (let i = 0; i < li.length; i++) {
    let a = li[i].getElementsByTagName("td")[1];
    // if matched
    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
