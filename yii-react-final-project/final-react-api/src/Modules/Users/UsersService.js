import React from "react";
import Delete from "../../Shared/UI/Buttons/Delete";
import Edit from "../../Shared/UI/Buttons/Edit";
import Td from "../../Shared/UI/Table/Td";
//import Users from "./Userpop";
//user Listing
const UsersService = (props) => {
  if (props.database !== null) {
    return (
      <tbody>
        {props.database.map((value, index) => {
          if (value.is_deleted === 0) {
            return (
              <tr key={index}>
                <Td data={value.firstname}></Td>
                <Td data={value.lastname}></Td>
                <Td data={value.gender}></Td>
                <Td data={value.email_id}></Td>
                <Td data={value.pro_pic}></Td>

                <Td>
                  <Edit
                    other={{
                      onClick: () => {
                        props.onEdit(value.id);
                      },
                    }}
                    buttonName="Edit"
                  ></Edit>
                </Td>
                <Td>
                  <Delete
                    other={{
                      onClick: () => {
                        props.onDelete(value.id);
                      },
                    }}
                    buttonName="Delete"
                  ></Delete>
                </Td>
              </tr>
            );
          }
        })}
      </tbody>
    );
  } else {
    return <tbody></tbody>;
  }
};

export default UsersService;
