import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";


const ChangeUserRole = ({
  name,
  email,
  role,
  OnClose,
}) => {

  const[userRole, setUserRole] = useState(role)

  const handleOnChangeSelect = (e) =>{
    setUserRole(e.target.value)

    console.log(e.target.value)

  }

  const updateUserRole = async()=> {

  }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-10 w-full h-full flex justify-between items-center '>

        <div className='mx-auto bg-white shadow-md p-4 w-full  max-w-sm'>
            <button className='block ml-auto' onClick={OnClose}>
            <IoMdClose />

            </button>
          <h1 className='pb-4 text-lg font-medium '>Change User Role</h1>
            <p>Name : {name} </p>
            <p>Email : {email}</p>

           <div className='flex justify-between items-center my-4'>
              <p>Role : </p>
           <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
           
              {
                Object.values(ROLE).map(el =>{
                  return(
                    <option value={el} key={el}>{el}</option>

                  )
                })
              }
            
            
            </select>
           </div>
           <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onChange={updateUserRole}>Change Role </button>
        </div>
    </div>
  )
}

export default ChangeUserRole