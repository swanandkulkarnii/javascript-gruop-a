import React from 'react'
import Delete from '../../Shared/UI/Buttons/Delete';
import Edit from '../../Shared/UI/Buttons/Edit';
import Td from '../../Shared/UI/Table/Td';

function UserAddressList(props) {

  if(props.database!=null){
    return (
        <>
       { console.log("Inside UserAddress list= ",props.database)}
           
          <tbody>
          {props.database.map((value, index) => {
              // if(value.is_deleted===0){
                
                  return(
                   
          <tr key={index}>
            <Td data= {value.address_id } />
           <Td data={value.user.firstname} />
           <Td data={value.user.lastname} />
            <Td data= {value.addressline1} />
            <Td data= {value.addressline2} />
            <Td data= {value.city} />
            <Td data= {value.state} />
            <Td data= {value.zipcode} />
            <Td data= {value.country} />
            <Td>
            <Edit other={{onClick:() => {props.onAddressEdit(value.address_id)}}} buttonName="Edit" />      
             </Td>
             <Td>
             <Delete other={{onClick: () => {props.onAddressDelete(value.address_id);},}} buttonName="Delete" />
            </Td>
          </tr>
          )
          // }
        }
        )}
</tbody>   
        </>
    )
  }
  else
    {
        return(<tbody></tbody>)
    }
}

export default UserAddressList

