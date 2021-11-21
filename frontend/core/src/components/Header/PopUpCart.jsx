import React, {useRef, useEffect, useState} from 'react';
import {Link} from 'react-router-dom'



const PopUpCart = ({cart, removeFromCartFn, cartRef, itemDivRef}) => {
    const closeCart = () => {
        cartRef.current.className = "pop-up-cart transform"
    }

    console.log('rerender popupcart');
    
     
    return (
        
        <div className="pop-up-cart transform" ref={cartRef}>
            <span className="cart-close" aria-hidden="true" onClick={closeCart}>Close</span>

            <div className="col-container ">
                <div className="go-cart-row">
                    <Link to="cart"><button className="btn go-cart" onClick={closeCart}>Go To Cart</button></Link>
                </div>
                {
                    cart.map((item, key) => {
                        return (
                            <div className="row item" ref={itemDivRef} key={key} id={item.item_id}>
                                <div className="col-md-3 item-pop-cart-img">
                                    <img src={`http://localhost:8000${item.item_img}`} alt="" />
                                </div>
                                <div className="col-md-9 item-pop-cart-info">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <p className="title">{item.item_name.substring(0,50)}...</p>
                                            <p className="price">${(parseInt(item.item_total_price) / parseInt(item.item_qt)).toString().substring(0,6)}</p>
                                        </div>
                                        <div className="col-md-4 qts-func">
                                            <p className="qts"> 
                                                {item.item_qt}
                                            </p>
                                            <p className="remove" onClick={() => removeFromCartFn(item.item_id)}>remove</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    }) 
                }
                
            </div>
        </div>
    );
};

export default PopUpCart;