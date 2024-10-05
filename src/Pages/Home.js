import React from 'react'
import CategoryList from '../Components/CategoryList';
import BannerProduct from '../Components/BannerProduct';
import HorizontalCardProduct from '../Components/HorizontalCardProduct';
import VerticalCardProduct from '../Components/VerticalCardProduct';

const Home = () => {
  return (
    <div>
        <CategoryList />
        <BannerProduct />

        <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
        <HorizontalCardProduct category={"speakers"} heading={"Popular's Speakers"}/>

        <VerticalCardProduct  category={"mobiles"} heading={"Popular's Mobiles"}/ >
        <VerticalCardProduct  category={"camera"} heading={"Popular's Camera"}/>
        <VerticalCardProduct  category={"earphones"} heading={"Popular's Earphones"}/>
        <VerticalCardProduct  category={"refrigerator"} heading={"Popular's Refrigerator"}/>
        <VerticalCardProduct  category={"televisions"} heading={"Popular's Televisions"}/>
        <VerticalCardProduct  category={"watches"} heading={"Popular's Watches"}/>
        <VerticalCardProduct  category={"trimmers"} heading={"Popular's Trimmers"}/>
        <VerticalCardProduct  category={"printers"} heading={"Popular's Printers"}/>




    </div>
    
  )
}

export default Home;