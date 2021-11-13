import React from 'react';
import {Link} from "react-router-dom"
import one from "../../assets/images/one.jfif"
import "../../assets/css/checkout.css"

const Address = () => {
    return (
        <div class="add-address">
            <p className='category '>HOME / chipping info</p>
                <div className="container checkout-address">
                    <div className="row">
                        <div className="col-md-7 address">
                            <form action="">
                                <div className="row contact-info">
                                    <div className="col-md-12">
                                        <div className="row contact-lebal">
                                            <div className="text">
                                                <p>Contact information</p>
                                            </div>
                                            <div className="login">
                                                <p>Already have an account? <strong>Log in</strong></p>
                                            </div>
                                        </div>
                                        <div className="row contact-input">
                                            <input type="email" placeholder="enter your email"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row shipping-info">
                                    <p>Shipping address</p>
                                    <div className="col-md-12 shipping-info-container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" placeholder="First name" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" placeholder="Last name" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <input type="text" placeholder="compant (optional)"/>
                                        </div>
                                        <div className="row">
                                            <input type="text" placeholder="address"/>
                                        </div>
                                        <div className="row">
                                            <input type="text" placeholder="Apartement, suite, etc. (optional)"/>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" placeholder="Postal code" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" placeholder="City" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <input type="text" placeholder="Country"/>
                                        </div>
                                        <div className="row">
                                            <input type="text" placeholder="Phone  (optional)"/>
                                        </div>
                                        <div className="row btns">
                                            <div className="col-md-6">
                                                <button className="btn btn-dark">Continue to payment</button>
                                            </div>
                                            <div className="col-md-6">
                                                <Link to="/cart" className="back-to-cart">Back to cart</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-5 cart-summary">
                            <div className="col-container ">
                                <div className="row item">
                                    <div className="col-md-3 item-pop-cart-img">
                                        <img src={one} alt="" />
                                    </div>
                                    <div className="col-md-9 item-pop-cart-info">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p className="title">title og this item is bla</p>
                                                <p className="price">$60.00</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>

                                <div className="row calc">
                                    <div className="col-md-12">
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
                                       

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Address;