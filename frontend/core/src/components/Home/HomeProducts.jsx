import React from 'react';
import { Link } from 'react-router-dom';

import one from "../../assets/images/one.jfif"
import two from "../../assets/images/two.jfif"
import three from "../../assets/images/three.jfif"
import fore from "../../assets/images/fore.jfif"
import one1 from "../../assets/images/one1.jfif"
import two2 from "../../assets/images/two2.jfif"
import three3 from "../../assets/images/three3.jfif"
import fore4 from "../../assets/images/fore4.jfif"

const HomeProducts = () => {
    return (
        <div className="home-products">
            <h3>Featured Products</h3>
            <p>See What’s Trending Right Now</p>
            <div className="row">
                
                <div className="col-md-3 product-card">
                    <Link to="product/ss">
                        <div className="row product-img">
                            <img src={one} alt="" />
                        </div>
                        <div className="row product-info">
                            <div className="product-title">
                                <p>Wood Headphone Stand</p>
                            </div>
                            <div className="product-price">
                                <p>$150</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-3 product-card">
                    <a href="">
                        <div className="row product-img">
                            <img src={two} alt="" />
                        </div>
                        <div className="row product-info">
                            <div className="product-title">
                                <p>Wool Felt Desk Pad</p>
                            </div>
                            <div className="product-price">
                                <p>$160</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-md-3 product-card">
                    <a href="">
                    <div className="row product-img">
                        <img src={three} alt="" />
                    </div>
                    <div className="row product-info">
                         <div className="product-title">
                            <p>Wood Planter</p>
                        </div>
                        <div className="product-price">
                            <p>$30</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div className="col-md-3 product-card">
                    <a href="">
                    <div className="row product-img">
                        <img src={fore} alt="" />
                    </div>
                    <div className="row product-info">
                         <div className="product-title">
                            <p>Wood Apple Keyboard Tray</p>
                        </div>
                        <div className="product-price">
                            <p>$40</p>
                        </div>
                    </div>
                    </a>
                </div>
            </div>

            <div className="row">
                
                <div className="col-md-3 product-card">
                    <a href="">
                    <div className="row product-img">
                        <img src={one1} alt="" />
                    </div>
                    <div className="row product-info">
                        <div className="product-title">
                            <p>Desk Tray</p>
                        </div>
                        <div className="product-price">
                            <p>$120</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div className="col-md-3 product-card">
                    <a href="">
                    <div className="row product-img">
                        <img src={two2} alt="" />
                    </div>
                    <div className="row product-info">
                        <div className="product-title">
                            <p>Leather Mouse Pad</p>
                        </div>
                        <div className="product-price">
                            <p>$120</p>
                        </div>
                    </div>
                    </a>
                </div>
                
                <div className="col-md-3 product-card">
                    <a href="">
                    <div className="row product-img">
                        <img src={three3} alt="" />
                    </div>
                    <div className="row product-info">
                        <div className="product-title">
                            <p>Black Pen</p>
                        </div>
                        <div className="product-price">
                            <p>$60</p>
                        </div>
                    </div>
                    </a>
                </div>

                <div className="col-md-3 product-card">
                    <a href="">
                    <div className="row product-img">
                        <img src={fore4} alt="" />
                    </div>
                    <div className="row product-info">
                        <div className="product-title">
                            <p>Wood iPad Stand</p>
                        </div>
                        <div className="product-price">
                            <p>$80</p>
                        </div>
                    </div>
                    </a>           
                </div>
            </div>
        </div>
    );
};

export default HomeProducts;