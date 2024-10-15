import React, { useContext, useState } from 'react'
import LoginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';



const Login = () => {

  const[Showpassword , setShowpassword] = useState(false); 
  const[data, setData] = useState({
    email : "",
    password : ""
  })

  const navigate = useNavigate();
  const {fetchUserDetails, fetchUserAddToCart} = useContext(Context)


  const handleOnChange = (e)=>{

    const{name, value} = e.target

    setData((prev) =>{

      return{
        ...prev,
        [name]: value
      }

      
    })

  }

  const handleSubmit = async(e) => {

    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url,{
      method: SummaryApi.signIn.method,
      credentials: 'include', 
      headers: {
            "content-type" : "application/json",
      },
      body : JSON.stringify(data)
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      toast.success(dataApi.message)
      navigate('/')
      fetchUserDetails()
      fetchUserAddToCart()
    }

    if(dataApi.error){
      toast.error(dataApi.message)
    }

  }

  console.log("data login", data)
  return (
    <section id='login'  className='bg-[#F2EAD3]'>
        <div className=' mx-auto container p-4 bg-[#F2EAD3]'>
        
            <div className='bg-[#F2EAD3] w-full p-4 py-5 max-w-md  mx-auto rounded h-full '>
                    <div className='w-20 h-20 mx-auto'>
                        <img src= {LoginIcons} alt='login icons'></img>
                    </div>

                    <form className='pt-6 flex flex-col gap-2 ' onSubmit={handleSubmit}  >
                          <div>
                            <label>Email : </label>
                            <div className='bg-[#F2EAD3] border border-black p-2 rounded-lg'> 
                                  <input type='text'
                                  name='email'
                                  value={data.email}
                                  onChange={handleOnChange}
                                  required
                                   placeholder='enter email' 
                                   className='w-full h-full outline-none bg-transparent '></input>
                            </div>
                            
                          </div>

                          <div className='grid'>
                            <label>Password : </label>
                            <div className='flex bg-[#F2EAD3] border border-black p-2 rounded-lg placeholder-[#6F4E37] '>
                                  <input type={Showpassword ? "text" : "password"}
                                  name='password'
                                  value={data.password}
                                  onChange={handleOnChange}
                                  required 
                                  placeholder='enter password' 
                                  className='w-full h-full outline-none bg-transparent'></input>
                                  <div className='cursor-pointer ' onClick={()=> setShowpassword((prev)=> !prev)}>
                                      <span>
                                        {

                                          Showpassword ?(
                                            
                                            <FaEye />
                                          ) 
                                          :
                                          (
                                            <FaEyeSlash />

                                          )
                                        }
                                      </span>
                                  </div>
                            </div>
                            <Link to={'/forgot-password'} className='w-fit ml-auto block hover:text-[#3F2305] hover:underline'>
                              Forgot Password
                            </Link>
                            

                          </div>

                         <button className=' bg-[#6F4E37] border-2 border-black px-5 py-2 hover:bg-[#3F2305] text-white w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Login</button>

                    </form>
                    <p className='py-7'>Don't have account ? <Link to={'/signup'} className=' text-black hover:text-[#3F2305] hover:underline'>Sign up</Link></p>
              </div>

           
        </div>

    </section>
  )
}

export default Login