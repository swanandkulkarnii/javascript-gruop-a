import React from "react";

export const ApiSearch = () => {
  var apiData = JSON.parse(localStorage.getItem("Apis"));
  var searchByName = "a";
  return (
    <>
      {/* {
        apiData.map( api => (api.apiTitle.toUpperCase().includes(searchByName.toUpperCase())) ? {
            += `<tr>
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
                  </tr>`
          } : "<td>No Match Found</td>")
             
          } */}
    </>
  );
};
