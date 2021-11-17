import React, {useRef, useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import one from "../../assets/images/one.jfif"
import axiosInstance from '../../axios';
const PopUpCart = (props) => {
    const closeCart = () => {
        props.cartRef.current.className = "pop-up-cart transform"
    }

    const [cart, setCart] = useState([])
    const [load, setLoad] = useState(true)
    

    useEffect(()=> {
        axiosInstance.get('products/cart/').then(
            res => {
                res.data.items.forEach(item => {
                    const id = item[0];
                    const qt = item[1];
                    const total_price = item[2];

                    axiosInstance.get(`products/single/${id}`).then(
                        subRes => {
                            const item = subRes.data
                            setCart([...cart,{'item_name':item.name,'item_img':item.main_image, 'item_qt':qt, 'item_total_price':total_price }])
                        }
                    )
                });
                setLoad(false)
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    }, [])

    if (load) {
        return (
            <h1>loading</h1>
        )
    }
     
    return (
        
        <div className="pop-up-cart transform" ref={props.cartRef}>
            {console.log(cart)}
            <span class="cart-close" aria-hidden="true" onClick={closeCart}>Close</span>

            <div className="col-container ">
                <div className="go-cart-row">
                    <Link to="cart"><button className="btn go-cart">Go To Cart</button></Link>
                </div>
                {
                    cart.map((item, key) => {
                        return (
                            <div className="row item">
                                <div className="col-md-3 item-pop-cart-img">
                                    <img src={`http://localhost:8000${item.item_img}`} alt="" />
                                </div>
                                <div className="col-md-9 item-pop-cart-info">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <p className="title">{item.item_name.substring(0,30)} ...</p>
                                            <p className="price">${(parseInt(item.item_total_price) / parseInt(item.item_qt)).toString().substring(0,6)}</p>
                                        </div>
                                        <div className="col-md-4 qts-func">
                                            <p className="qts"> 
                                                {item.item_qt}
                                            </p>
                                            <p className="remove">remove</p>
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