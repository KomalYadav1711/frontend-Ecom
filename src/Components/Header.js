import React, { useContext, useState } from 'react'
import Logo from '../Components/Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';



const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false);
    const context = useContext(Context)
    const navigate = useNavigate()
    const searchInput = useLocation()
    const URLSearch  = new URLSearchParams(searchInput?.search)
    const searchQuery = URLSearch.getAll("q")
    const [search, setSearch] = useState(searchInput?.search.split("=")[1])


    



    const handleLogout = async() => {
      const fetchData = await fetch(SummaryApi.logout_user.url,{
        method: SummaryApi.logout_user.method,
        credentials: 'include'
      })

     

      const data = await fetchData.json()
      if(data.success){
        toast.success(data.message)
        dispatch(setUserDetails(null))
        navigate("/")
        
        
      }

      if(data.error){
        toast.error(data.message)
      }
    }
const handleSearch =(e)=>{
  const {value} = e.target
  setSearch(value)

  if(value){
    navigate(`/search?q=${value}`)
  }else{
    navigate("/search")
  }

}
  return (
   <header className='h-16 shadow-md bg-[#0E1A57] fixed w-full z-40'>
        <div className=' h-full container mx-auto flex items-center  justify-between px-10'>
                <div className=''>
                  <Link to={"/"}>
                      <Logo w={100} h= {60} />

                  </Link>
                </div>

            <div className=' hidden lg:flex justify-between w-full items-center max-w-sm border rounded-full focus-within:shadow-md pl-2'>
              <input type='text' placeholder='search product here...' className='w-full px-4 outline-none rounded-l-full bg-[#0E1A57] text-white placeholder-white'onChange={handleSearch} value={search}></input>
              <div className='min-w-[50px] h-8 bg-[#eeb934] flex items-center justify-center rounded-r-full text-white text-lg '>
                <GrSearch className='text-black'/>
              </div>
            </div>

          <div className='flex items-center cursor-pointer gap-7'>
              <div className='relative group flex justify-center'>

                {
                  user?._id && (
                    <div className='text-3xl cursor-pointer flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                      {
                        user?.profilePic ? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt= {user?.name}/>
                      ) : (
                        <FaRegUserCircle className='text-white'/>
                      )
                      }
                    
                    </div>

                  )
                }
              
                {
                  menuDisplay && (
                    <div className='absolute bg-[#c8d7ee] bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                      <nav>
                      {
                        user?.role === ROLE.ADMIN && (
                          <Link to={"admin-panel/all-products"} className='whitespace-nowrap  md:block hover:bg-[#c8d7ee]' onClick={()=>setMenuDisplay(preve => !preve)} >Admin Panel</Link>
                        )
                      }
                        
                      </nav>
                    </div>
                    )
                }
                
              </div>

              {
                user?._id && (
                  <Link to={"/cart"} className='text-2xl relative '>

                        <span><FaShoppingCart className='text-white'/></span>


                        <div className='bg-[#eeb934] text-black rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-3'>
                          <p className='text-sm'>{context?.cartProductCount}</p>
                        </div>
                    </Link>
                )
              }
              
            

            <div >
            {
              user?._id ?(
                <button onClick={handleLogout} className='bg-[#eeb934] px-3 py-1 rounded-full text-black hover:bg-[#f0c65c]'>Logout</button>
              ) :(
                <Link to={"/Login"} className='bg-[#eeb934] px-3 py-1 rounded-full text-black  hover:bg-[#f0c65c]'>
                  Login
              </Link>
              )
            }
              
            </div>
              
          </div>

            
        </div>

   </header>
  )
}
 
export default Header