import React from 'react';
import one from "../../assets/images/one.jfif"
import "../../assets/css/single-product.css"
import SecondeSlider from '../Home/SecondeSlider';

const SingleProduct = () => {
    window.scrollTo(0, 0);
    return (
        <>
        <div className="single-product mb-1 ">
            <p className='category '>HOME / ACCESSORIES  / Wood Headphone Stand </p>
            <div className="container">
                <div className="row product">
                    <div className="gallery col-md-6">
                        <div className="main-img">
                            <img src={one} alt="" />
                        </div>
                    </div>
                    <div className="description col-md-6">
                        <h3 className="title">Wood Headphone Stand</h3>
                        <p className="price">$150.00</p>
                        <div className="row shipping-cart">
                            <div className="col-md-5 add-cart">
                                <button className="btn add-to-cart">Add to cart</button>
                                <button className="btn add-to-wish">Add to wish list</button>
                            </div>
                            <div className="col-md-6 shipping">
                                <p className="shipping-type">  
                                <i class="fa fa-truck mr-1" aria-hidden="true"></i>

                                Standar shipping
                                </p>
                                <p className="shipping-desc">
                                <i class="fa fa-check-circle mr-1 text-success" aria-hidden="true"></i>
                                Available for standar shipping
                                </p>
                            </div>
                        </div>
                        <div className="row product-desc">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit impedit placeat 
                                maxime sed minima culpa quam nihil molestiae nostrum tempora repellat, soluta 
                                accusamus perspiciatis? Harum reprehenderit dolorem deserunt corrupti soluta!</p>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit impedit placeat 
                                maxime sed minima culpa quam nihil molestiae nostrum tempora repellat, soluta 
                                accusamus perspiciatis? Harum reprehenderit dolorem deserunt corrupti soluta!</p>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit impedit placeat 
                                maxime sed minima culpa quam nihil molestiae nostrum tempora repellat, soluta 
                                accusamus perspiciatis? Harum reprehenderit dolorem deserunt corrupti soluta!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SecondeSlider />
        </>
    );
};

export default SingleProduct;