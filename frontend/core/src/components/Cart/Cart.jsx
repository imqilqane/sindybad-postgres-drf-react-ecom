import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import '../../assets/css/cart.css'
import axiosInstance from '../../axios';
import axios from 'axios';
const Cart = () => {
    const [load, setLoad] = useState(true);
    const [cart, setCart] = useState([]);
    const [totalQts, setTotalQts] = useState(0)
    const [totalPrice, settotalPrice] = useState(0)

    useEffect(() => {
        axios.all([
            axiosInstance.get('products/cart/'),
            axiosInstance.get('products/cart-items-qts/')
        ]).then(axios.spread((res1, res2)=>{
            res1.data.items.forEach(item => {
                const id = item[0];
                const qts = item[1];
                const total_price = item[2];
                axiosInstance.get(`products/single/${id}`).then(
                    subRes1 => {
                        const product =  {'item_id':id, 'item_name':subRes1.data.name, 'main_img':subRes1.data.main_image, 'item_qts':qts, 'item_price':total_price};
                        setCart(prev => [...prev, product]);
                    }
                )
                console.log(total_price);
                settotalPrice(price => price += total_price)
            });
            setTotalQts(res2.data.qts)
            setLoad(false);

        })).catch(
            axios.spread((err1, err2)=> {
                console.log(err1);
                console.log(err2);
                setLoad(false);
            })
        )
       
    }, []);


    if (load) {
        return <h1>Loading ...</h1>
    }


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
                {
                    cart.map((item, key)=> {

                        return (
                            <div className="row cart-item">
                                <div className="col-md-5 cart-image-info">
                                    <div className="row">
                                        <div className="col-md-4 cart-image">
                                            <img src={`http://127.0.0.1:8000${item.main_img}`} alt="" />
                                        </div>
                                        <div className="col-md-6 cart-info">
                                            <p><strong>In Stock | </strong>sindybad</p>
                                            <p>{item.item_name.substring(0,30)} ... </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 price">
                                    ${(parseInt(item.item_price) / parseInt(item.item_qts)).toString().substring(0,8)}
                                </div>
                                <div className="col-md-3 item-qts">
                                    <div className="row">
                                        <div className="col-md-1 add">+</div>
                                        <div className="col-md-2 qts"> {item.item_qts} </div>
                                        <div className="col-md-1 mines">-</div>
                                    </div>
                                </div>
                                <div className="col-md-2 total">
                                    <div className="row">
                                        <div className="col-md-6">
                                            ${(item.item_price).toString().substring(0,6)}
                                        </div>
                                        <div className="col-md-6">
                                            X
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        )
                    })
                }
                
                <div className="row calc">
                    <div className="col-md-7"></div>
                    <div className="col-md-5">
                        <div className="row total-qts">
                            <div className="col-md-9 text">
                                <p>Total Quantity</p>
                            </div>
                            <div className="col-md-3 num">
                                <p>{totalQts}</p>
                            </div>
                        </div>
                        <div className="row total-qts">
                            <div className="col-md-9 text">
                                <p>Total Price</p>
                            </div>
                            <div className="col-md-3 num">
                                <p>${totalPrice}</p>
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