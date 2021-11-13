import React, {useRef} from 'react';
import {Link} from 'react-router-dom'
import one from "../../assets/images/one.jfif"

const PopUpCart = (props) => {
    const closeCart = () => {
        props.cartRef.current.className = "pop-up-cart transform"
    }
     
    return (
        <div className="pop-up-cart transform" ref={props.cartRef}>
            <span class="cart-close" aria-hidden="true" onClick={closeCart}>Close</span>

            <div className="col-container ">
                <div className="go-cart-row">
                    <Link to="cart"><button className="btn go-cart">Go To Cart</button></Link>
                </div>
                <div className="row item">
                    <div className="col-md-3 item-pop-cart-img">
                        <img src={one} alt="" />
                    </div>
                    <div className="col-md-9 item-pop-cart-info">
                        <div className="row">
                            <div className="col-md-8">
                                <p className="title">title og this item is bla</p>
                                <p className="price">$60.00</p>
                            </div>
                            <div className="col-md-4 qts-func">
                                <p className="qts"> 
                                    1
                                </p>
                                <p className="remove">remove</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUpCart;