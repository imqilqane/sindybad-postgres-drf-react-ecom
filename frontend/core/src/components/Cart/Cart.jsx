import React from 'react';
import {Link} from "react-router-dom"
import one from "../../assets/images/one.jfif"
import '../../assets/css/cart.css'
const Cart = () => {
    return (
        <div className="cart">
            <p className='category '>HOME / your cart</p>
            <div className="container">
                <div className="row header">
                    <div className="col-md-5">
                        Item
                    </div>
                    <div className="col-md-2">
                        Price
                    </div>
                    <div className="col-md-3">
                        Quantuty
                    </div>
                    <div className="col-md-2">
                        Total
                    </div>
                </div>
                <div className="row cart-item">
                    <div className="col-md-5 cart-image-info">
                        <div className="row">
                            <div className="col-md-4 cart-image">
                                <img src={one} alt="" />
                            </div>
                            <div className="col-md-6 cart-info">
                                <p><strong>In Stock | </strong>sindybad</p>
                                <p>Wood Headphone Stand</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 price">
                        $120.00
                    </div>
                    <div className="col-md-3 item-qts">
                        <div className="row">
                            <div className="col-md-1 add">+</div>
                            <div className="col-md-2 qts"> 1 </div>
                            <div className="col-md-1 mines">-</div>
                        </div>
                    </div>
                    <div className="col-md-2 total">
                        <div className="row">
                            <div className="col-md-6">
                                $120.00
                            </div>
                            <div className="col-md-6">
                                 X
                            </div>
                        </div>
                       
                    </div>
                </div>
                <div className="row calc">
                    <div className="col-md-7"></div>
                    <div className="col-md-5">
                        <div className="row total-qts">
                            <div className="col-md-9 text">
                                <p>Total Quantity</p>
                            </div>
                            <div className="col-md-3 num">
                                <p>2</p>
                            </div>
                        </div>
                        <div className="row total-qts">
                            <div className="col-md-9 text">
                                <p>Total Price</p>
                            </div>
                            <div className="col-md-3 num">
                                <p>$240.00</p>
                            </div>
                        </div>
                        <div className="row go-to-checkout">
                            <div className="col-md-12">
                                <Link to="/checkout/add-shipping-info"><button className="btn">Go To CheckOut</button></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;