import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../Components/ChangeUserRole';



const AllUsers = () => { 

  const[allUser, setAllUsers] = useState([])
  const fetchAllUsers = async() =>{

    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include'
    })

    const dataResponse = await fetchData.json()

    console.log("User data - ", dataResponse)

    if( dataResponse.success){
      setAllUsers(dataResponse.data)
    }

    if(dataResponse.error){
      toast.error(dataResponse.message)
    }

    console.log(dataResponse)
  }

  useEffect(() =>{
    fetchAllUsers();
  },[])
  return (
   <div className='pb-4 bg-white'>
      <table className='w-full userTable'>
          <thead>
              <tr>
                  <th>Sr.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
          </thead>
          <tbody className=''>
            {
                allUser.map((el, index) => {
                  return(
                  <tr>
                      <td> {index+1}</td>
                      <td>{el?.name}</td>
                      <td>{el?.email}</td>
                      <td>{el?.role}</td>
                      <td>{moment(el?.createdAt).format('ll')}</td>
                      <td>
                          <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:text-white  hover: bg-green-500'>
                              <MdEdit />
                          </button>
                      </td>
                  </tr>
                  )

                })
            }
          </tbody>
      </table>
        <ChangeUserRole/>

   </div>
  )
}

export default AllUsers