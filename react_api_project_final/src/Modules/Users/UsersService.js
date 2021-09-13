import React from "react";
import Delete from "../../Shared/UI/Buttons/Delete";
import Edit from "../../Shared/UI/Buttons/Edit";
import Td from "../../Shared/UI/Table/Td";
//import Users from "./Userpop";
const UsersService = (props) => {
  const database = JSON.parse(localStorage.getItem("Users"));

  if (database !== null) {
    return (
      <tbody>
        {database.map((value, index) => {
          return (
            <tr key={index}>
              <Td data={value.firstName}></Td>
              <Td data={value.lastName}></Td>
              <Td data={value.gender}></Td>
              <Td data={value.userEmail}></Td>

              <Td>
                <Edit
                  other={{
                    onClick: () => {
                      props.onEdit(value.uid);
                    },
                  }}
                  buttonName="Edit"
                ></Edit>
              </Td>
              <Td>
                <Delete
                  other={{
                    onClick: () => {
                      props.onDelete(value.uid);
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

export default UsersService;
