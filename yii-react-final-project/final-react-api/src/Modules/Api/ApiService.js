import React from "react";
import Delete from "../../Shared/UI/Buttons/Delete";
import Edit from "../../Shared/UI/Buttons/Edit";
import Td from "../../Shared/UI/Table/Td";
const ApiService = (props) => {
  const apiData = JSON.parse(localStorage.getItem("Apis"));
  if (props.apiData !== null) {
    return (
      <tbody>
        {props.apiData.map((value, index) => {
          return (
            <tr key={index}>
              <Td data={value.url}></Td>
              <Td data={value.title}></Td>
              <Td data={value.description}></Td>
              <Td data={value.project.title}></Td>
              <Td data={value.module.title}></Td>
              <Td data={value.method}></Td>
              <Td data={value.request}></Td>
              <Td data={value.response}></Td>

              <Td>
                <Edit
                  other={{
                    onClick: () => {
                      props.onApiEdit(value.id);
                    },
                  }}
                  buttonName="Edit"
                ></Edit>
              </Td>
              <Td>
                <Delete
                  other={{
                    onClick: () => {
                      props.onApiDelete(value.id);
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
