import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helper/displayCurrency'
import { MdDelete } from "react-icons/md";

const Cart = () => {

    const[data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async() =>{
       
        const response = await fetch(SummaryApi.addToCartProductView.url,{
            method:SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers :{
                "content-type" : "application/json"
            }
        })
       

        const responseData = await response.json()

     // Add this to ensure data is fetched


        if(responseData.success){
            setData(responseData.data)
        }

    }

    const handleLoading = async() =>{
        await fetchData()
    }

    useEffect(() =>{
        setLoading(true)
        handleLoading()
        setLoading(false)

    }, [])

    const increaseQty = async(id, qty) =>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers :{
                "content-type" : "application/json"
            },
            body : JSON.stringify(
                {
                    _id : id,
                    quantity : qty + 1
                }
            )
        })

        const responseData = await response.json()
        if(responseData.success){
            fetchData()
            
        }

        
    console.log("cartdata", responseData)
    }


    const decreaseQty = async(id, qty) =>{
       if(qty >= 2){
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers :{
                "content-type" : "application/json"
            },
            body : JSON.stringify(
                {
                    _id : id,
                    quantity : qty - 1
                }
            )
        })

        const responseData = await response.json()
        if(responseData.success){
            fetchData()
            
        }
    }
  }

  const deleteCartProduct = async(id)=>{

    const response = await fetch(SummaryApi.deleteCartProduct.url,{
        method: SummaryApi.deleteCartProduct.method,
        credentials: 'include',
        headers :{
            "content-type" : "application/json"
        },
        body : JSON.stringify(
            {
                _id : id,
                
            }
        )
    })

    const responseData = await response.json()
    if(responseData.success){
        fetchData()
        context.fetchUserAddToCart();
    }
 }


    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)

  return (
   <div className='container mx-auto'>
         <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-[#c8d7ee] py-5'>No data</p>
                )
            }
         </div>

         <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
            {/**view product */}
            <div className='w-full max-w-3xl'>
                {
                    loading ? (
                        loadingCart.map((el, index) =>{
                            return(
                                <div key={el+"Add To Cart Loading"+ index} className='w-full bg-white my-2 h-32 border border-slate-300 animate-pulse rounded'>

                                </div>

                            )
                        })
                        

                    ):(
                        data.map((product, index) =>{
                            return(
                                <div key={product?._id+"Add To Cart Loading"} className='w-full bg-[#c8d7ee] my-2 h-32 border border-[#091f3f]  rounded grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 bg-slate-200'>
                                        <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                    </div>
                                    <div className='px-4 py-2 relative'>
                                        {/**delete product */}
                                        <div className='absolute right-0 text-[#091f3f] hover:bg-[#091f3f] hover:text-white rounded-full p-2 cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                                <MdDelete />

                                        </div>
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='text-[#6B6E6B] capitalize'>{product?.productId.category}</p>
                                        <div  className='flex items-center justify-between'>
                                            <p className='text-[#091f3f] font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-[#091f3f] font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>

                                        </div>
                                        <div className='flex items-center gap-3 mt-1'>
                                            <button className='border border-[#091f3f] hover:bg-[#091f3f] hover:text-white text-[#091f3f] w-6 h-6 flex justify-center items-center rounded'  onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                            <span>{product?.quantity}</span>
                                            <button  className='border border-[#091f3f] hover:bg-[#091f3f] hover:text-white text-[#091f3f] w-6 h-6 flex justify-center items-center rounded' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                        </div>
                                    </div>

                                </div>
                            )
                            

                        })
                    )
                }

            </div>

            {/**summary */}
            <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                {
                    loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>

                        </div>

                    ):(
                        <div className='h-36 bg-[#c8d7ee] border border-[#091f3f]'>
                            <h2 className='text-white bg-[#091f3f] px-4 py-1'>Summary</h2>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-black'>
                                <p>Quantity</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-black'>
                                <p>Total Price</p>
                                <p>{displayINRCurrency(totalPrice)}</p>
                            </div>

                            <button className='bg-[#eeb934] border border-black p-2 text-black w-full mt-2'>Payment</button>

                            
                        </div>
                    )
                }
            </div>
            
         </div>
   </div>

   
  )
}

export default Cart