import React from "react";
import Delete from "../../Shared/UI/Buttons/Delete";
import Edit from "../../Shared/UI/Buttons/Edit";
import Td from "../../Shared/UI/Table/Td";
const ProjectService = (props) => {
  if (props.database !== null) {
    return (
      <tbody>
        {props.database.map((value, index) => {
          return (
            <tr key={index}>
              <Td data={value.title}></Td>
              <Td data={value.description}></Td>
              <Td>
                <Edit
                  other={{
                    onClick: () => {
                      props.onEdit(value.project_id);
                    },
                  }}
                  buttonName="Edit"
                ></Edit>
              </Td>
              <Td>
                <Delete
                  other={{
                    onClick: () => {
                      props.onDelete(value.project_id);
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

export default ProjectService;
