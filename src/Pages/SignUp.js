import React, { useState } from 'react'
import LoginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helper/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';



const SignUp = () => {

  const[Showpassword , setShowpassword] = useState(false); 
  const[Confirmpassword , setConfirmpassword] = useState(false);
  const[data, setData] = useState({
    email : "",
    password : "",
    name: "",
    confirmPassword : "",
    profilePic : "",
  })

  const navigate = useNavigate();


  const handleOnChange = (e)=>{

    const{name, value} = e.target

    setData((prev) =>{

      return{
        ...prev,
        [name]: value
      }

      
    })

  }

  const handleUploadpic = async(e)=> {
    const file = e.target.files[0]

    const imagePic = await imageTobase64(file)
    setData( (prev) =>{

      return{
        ...prev,
        profilePic : imagePic

        
      }
    })

    

  }

  const  handleSumbit = async (e) =>{
    e.preventDefault();

    if(data.password === data.confirmPassword){
      console.log("SummaryApi.signUP.url", SummaryApi.signUP.url)

      const dataResponse = await fetch(SummaryApi.signUP.url,{
        method: SummaryApi.signUP.method,
        headers: {
              "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/login'); 
        

      }

      if(dataApi.error){
        toast.error(dataApi.message)

      }
      
      console.log("data", dataApi)
    }
    else{
      toast.error("Please check password and confirm password")
      
    }

  }

  return (
    <section id='login'>
        <div className=' mx-auto container p-4'>
        
            <div className='bg-white w-full p-4 py-5 max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto rounded-full overflow-hidden relative'>
                       <div>
                            <img src= { data.profilePic || LoginIcons} alt='login icons'></img>
                       </div>
                      <form>
                           <label>
                                 <div className=' bg-slate-200 text-xs  bg-opacity-80 pb-4 pt-2  cursor-pointer py-4 bottom-0 w-full text-center absolute'> 
                                      Upload Photo
                                  </div>
                                  <input type='file' className='hidden' onChange={handleUploadpic}></input>
                           </label>
                      </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSumbit}>
                          <div>
                            <label>Name : </label>
                            <div className='bg-slate-100 p-2'> 
                                  <input type='text'
                                  name='name'
                                  value={data.name}
                                  onChange={handleOnChange}
                                 // required
                                   placeholder='enter name' 
                                   className='w-full h-full outline-none bg-transparent '></input>
                            </div>
                            
                          </div>

                          <div>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'> 
                                  <input type='text'
                                  name='email'
                                  value={data.email}
                                  onChange={handleOnChange}
                                  required
                                   placeholder='enter email' 
                                   className='w-full h-full outline-none bg-transparent '></input>
                            </div>
                            
                          </div>

                          <div >
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex '>
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
                           
                            

                          </div>

                          <div >
                            <label>Confirm Password : </label>
                            <div className='bg-slate-100 p-2 flex '>
                                  <input type={Confirmpassword ? "text" : "password"}
                                  name='confirmPassword'
                                  value={data.confirmPassword}
                                  onChange={handleOnChange}
                                  required
                                  placeholder='enter confirm password' 
                                  className='w-full h-full outline-none bg-transparent'></input>
                                  <div className='cursor-pointer ' onClick={()=> setConfirmpassword((prev)=> !prev)}>
                                      <span>
                                        {

                                          Confirmpassword ?(
                                            
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
                            
                            

                          </div>


                         <button className=' bg-red-600 px-5 py-2 hover:bg-red-700 text-white w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Sign Up</button>

                    </form>
                    <p className='py-7'>Already have account ? <Link to={'/login'} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
              </div>

           
        </div>

    </section>
  )
}

export default SignUp