import React from "react";
import Delete from "../../Shared/UI/Buttons/Delete";
import Edit from "../../Shared/UI/Buttons/Edit";
import Td from "../../Shared/UI/Table/Td";

const UserAddressService = (props) => {
  const db = JSON.parse(localStorage.getItem("UserAddress"));

  if (db !== null) {
    return (
      <tbody>
        {db.map((value, index) => {
          if (value.isDeleted === false) {
            return (
              <tr key={index}>
                <Td data={value.addressOne} />
                <Td data={value.addressTwo} />
                <Td data={value.city} />
                <Td data={value.state} />
                <Td data={value.pincode} />
                <Td data={value.country} />
                <Td>
                  <Edit
                    other={{
                      onClick: () => {
                        props.onEdit(value.uid);
                      },
                    }}
                    buttonName="Edit"
                  />
                  {/* onClick={editHandler(value.uid)} */}
                </Td>
                <Td>
                  <Delete
                    other={{
                      onClick: () => {
                        props.onDelete(value.uid);
                      },
                    }}
                    //onClick={(event) => onDeleteItem(value.uid)(event)}
                    // onClick={onDeleteItem(value.uid)}
                    buttonName="Delete"
                  />
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

export default UserAddressService;
