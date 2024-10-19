import React from 'react'
import { IoMdClose } from "react-icons/io";

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
   <div className='fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-2'> 
            <div className='w-fit ml-auto text-2xl  cursor-pointer ' onClick={onClose}>
               <IoMdClose />
            </div>
            <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh] '>
                <img src ={imgUrl} className='w-80 h-80'/>
            </div>
        </div>
         
   </div>
  )
}

export default DisplayImage