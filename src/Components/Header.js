import React from 'react'
import Logo from '../Components/Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';




const Header = () => {
  return (
   <header className='h-16 shadow-md bg-white'>
        <div className=' h-full container mx-auto flex items-center  justify-between px-10'>
            <div className=''>
              <Link to={"/"}>
                  <Logo w={90} h= {50} />

              </Link>
                
            </div>

            <div className=' hidden lg:flex justify-between w-full items-center max-w-sm border rounded-full focus-within:shadow-md pl-4'>
              <input type='text' placeholder='search product here...' className='w-full outline-none rounded-l-full '></input>
              <div className='min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white text-lg'>
                <GrSearch />
              </div>
            </div>

            <div className='flex items-center cursor-pointer gap-6'>
              <div className='text-3xl '>
                <FaRegUserCircle />
              </div>
              
            <div className='text-2xl relative '>

                <span><FaShoppingCart/></span>

                <div className='bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>0</p>
                </div>
            </div>

            <div >
              <Link to={"/Login"} className='bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-700'>
                  Login
              </Link>
            </div>
              
        </div>

            
        </div>

   </header>
  )
}
 
export default Header