import React, { useEffect, useState } from 'react'
import UploadProduct from '../Components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../Components/AdminProductCard'

const AllProducts = () => {

  const[openUploadProduct, setOpenUploadProduct] = useState(false)
  const[allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async() => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json()

    

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()

  }, [])
  return (
    <div>

      <div className='bg-[#103a75] py-2 px-4 flex justify-between items-center'>
          <h2 className='font-bold text-white text-lg'>All Product</h2>
          <button className='border-2 border-[#eeb934] text-[#eeb934] hover:bg-[#f0c65c] hover:text-black transition-all py-1 px-3 rounded-full' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/**all product  */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-170px)] overflow-y-scroll'>
        {
          allProduct.map((product, index) =>{
            return(
              <AdminProductCard data={product} key={index+"allProduct"} fetchdata ={fetchAllProduct}/>
              
            )
          })
        }
      </div>
      
      {
        openUploadProduct && (
          <UploadProduct onClose= {()=> setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }
    </div>
  )
}

export default AllProducts