import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Delete from '../../Shared/UI/Buttons/Delete';
import Edit from '../../Shared/UI/Buttons/Edit';
import Td from '../../Shared/UI/Table/Td';
import Pagination from './Pagination';


function UserAddressList(props) {

  
if(props.database!=null){
    return (
        <>
       { console.log("Inside UserAddress list= ",props.database)}
           
          <tbody>
          {props.database.map((value, index) => {
              if(value.is_deleted===0){
                
                  return(
                   
          <tr key={index}>
            <Td data= {value.address_id } />
            <Td data= {value.addressline1} />
            <Td data= {value.addressline2} />
            <Td data= {value.city} />
            <Td data= {value.state} />
            <Td data= {value.zipcode} />
            <Td data= {value.country} />
            <Td>
            <Edit
                    other={{
                      onClick: () => {
                        props.onEdit(value.address_id,value.addressline1,value.addressline2,value.city);
                      },
                    }}
                    buttonName="Edit"
                  />   
                
        </Td>
        <Td>
        <Delete other={{
                      onClick: () => {
                        props.onDelete(value.address_id);
                      },
                    }}
                   
                    buttonName="Delete"
                  />
        
        </Td>
          </tr>
                  )}
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

