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

        <HorizontalCardProduct category={"tinyglass"} heading={"Glass Miniature"}/>
        <HorizontalCardProduct category={"tinyclay"} heading={"Clay Miniature"}/>
        
        <VerticalCardProduct  category={"earthenware"} heading={"Popular EarthenWare"}/ >
        <VerticalCardProduct  category={"stoneware"} heading={"Popular's StoneWare"}/>
        <VerticalCardProduct  category={"raku"} heading={"Popular's Raku"}/>
        <VerticalCardProduct  category={"bonechina"} heading={"Popular's BoneChina"}/>
        <VerticalCardProduct  category={"faience"} heading={"Popular's Faience"}/>
        <VerticalCardProduct  category={"delftware"} heading={"Popular's DelftWare"}/>
        <VerticalCardProduct  category={"sgraffito"} heading={"Popular's Sgraffito"}/>
        <VerticalCardProduct  category={"redware"} heading={"Popular's RedWare"}/>
        <VerticalCardProduct  category={"celtic"} heading={"Popular's Celtic"}/>




    </div>
    
  )
}

export default Home;