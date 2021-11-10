import React from 'react';
import "../../assets/css/home.css"
import Slider from './Slider';
import TopTwoCats from './TopTwoCats';
import HomeProducts from './HomeProducts';
import SecondeSlider from './SecondeSlider';
const Home = () => {
    return (
        <div className="home">
            <Slider />
            <div className="products-cats">
                <div className="container">
                    <TopTwoCats />
                    <HomeProducts />
                </div>
            </div>
            <SecondeSlider />

        </div>
    );
};

export default Home;