import React, {useRef, useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import axiosInstance from '../../axios';
const PopUpCart = (props) => {
    const closeCart = () => {
        props.cartRef.current.className = "pop-up-cart transform"
    }
    const itemDivRef = useRef();
    const [cart, setCart] = useState([]);
    const [load, setLoad] = useState(true);
    const removeFromCart = (item_id) => {
        axiosInstance.get(`products/remove-from-cart/${item_id}/`).then(
            res => {
                console.log(res.data);
                if (itemDivRef.current.id == item_id){
                    itemDivRef.current.style.display = "none";
                    console.log(true);
                    console.log(itemDivRef.current);
                };
                console.log(false);
                console.log(itemDivRef.current.id);
                console.log(item_id);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    };
    
    useEffect(()=> {
        axiosInstance.get('products/cart/').then(
            res => {
                res.data.items.forEach(item => {
                    const id = item[0];
                    const qt = item[1];
                    const total_price = item[2];

                    axiosInstance.get(`products/single/${id}`).then(
                        subRes => {
                            const product = subRes.data;
                            const new_product = {'item_id':id,'item_name':product.name,'item_img':product.main_image, 'item_qt':qt, 'item_total_price':total_price };
                            setCart(prev => [...prev, new_product])
                        }
                    )
                });
                setLoad(false)
            }
        ).catch(
            err => {
                console.log(err);
                setLoad(false)

            }
        );
    }, [])

    if (load) {
        return (
            <h1></h1>
        )
    };

    
     
    return (
        
        <div className="pop-up-cart transform" ref={props.cartRef}>
            <span class="cart-close" aria-hidden="true" onClick={closeCart}>Close</span>

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
                                            <p className="title">{item.item_name.substring(0,30)} ...</p>
                                            <p className="price">${(parseInt(item.item_total_price) / parseInt(item.item_qt)).toString().substring(0,6)}</p>
                                        </div>
                                        <div className="col-md-4 qts-func">
                                            <p className="qts"> 
                                                {item.item_qt}
                                            </p>
                                            <p className="remove" onClick={() => removeFromCart(item.item_id)}>remove</p>
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