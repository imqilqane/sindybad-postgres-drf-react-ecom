import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';


import one from "../../assets/images/one.jfif"
import two from "../../assets/images/two.jfif"
import three from "../../assets/images/three.jfif"
import fore from "../../assets/images/fore.jfif"
import one1 from "../../assets/images/one1.jfif"
import two2 from "../../assets/images/two2.jfif"
import three3 from "../../assets/images/three3.jfif"
import fore4 from "../../assets/images/fore4.jfif"



const HomeProducts = () => {

    const [load , setLoad] = useState(true)
    const [items, setItems] = useState([])

    useEffect(()=> {
        axiosInstance.get('products/all/').then(res => {
            setItems(res.data);
            console.log(res.data);
            setLoad(false)
        }).catch(err => {
            console.log(err);
        })
    },[])

    if (load) {
        return (
            <h1>Is loading</h1>
        )
    }

    

    return (
        <div className="home-products">
            <h3>Featured Products</h3>
            <p>See What’s Trending Right Now</p>
            <div className="row">
                {
                    items.map((product, key) => {
                        return (<div className="col-md-3 product-card">
                            <Link to={`product/${product.slug}`}>
                                <div className="row product-img">
                                    <img src={product.main_image} alt="" />
                                </div>
                                <div className="row product-info">
                                    <div className="product-title">
                                        <p>{product.name.substring(0,50)} ... </p>
                                    </div>
                                    <div className="product-price">
                                        <p>${product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>)
                    })
                }
                
             
            </div>

            {/* <div className="row">
                
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
            </div> */}
        </div>
    );
};

export default HomeProducts;