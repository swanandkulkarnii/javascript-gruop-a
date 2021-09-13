import React from "react";
import Delete from "../../Shared/UI/Buttons/Delete";
import Edit from "../../Shared/UI/Buttons/Edit";
import Td from "../../Shared/UI/Table/Td";
const ApiService = (props) => {
  const apiData = JSON.parse(localStorage.getItem("Apis"));
  if (apiData !== null) {
    return (
      <tbody>
        {apiData.map((value, index) => {
          return (
            <tr key={index}>
              <Td data={value.apiUrl}></Td>
              <Td data={value.apiTitle}></Td>
              <Td data={value.apiDesc}></Td>
              <Td data={value.apiProject}></Td>
              <Td data={value.apiModule}></Td>
              <Td data={value.apiMethod}></Td>
              <Td data={value.apiRequest}></Td>
              <Td data={value.apiResponse}></Td>

              <Td>
                <Edit
                  other={{
                    onClick: () => {
                      props.onApiEdit(value.apiId);
                    },
                  }}
                  buttonName="Edit"
                ></Edit>
              </Td>
              <Td>
                <Delete
                  other={{
                    onClick: () => {
                      props.onApiDelete(value.apiId);
                    },
                  }}
                  buttonName="Delete"
                ></Delete>
              </Td>
            </tr>
          );
        })}
      </tbody>
    );
  } else {
    return <tbody></tbody>;
  }
};

export default ApiService;
