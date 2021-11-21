import React, {useRef, useEffect, useState, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import "../../assets/css/header.css"
import PopUpSearch from './PopUpSearch';
import PopUpCart from './PopUpCart';
import axiosInstance from '../../axios';
import axios from 'axios';

const Header = () => {
    console.log('rerender header');

    const searchRef = useRef();
    const cartRef = useRef();
    const itemDivRef = useRef();
    const isInitialMount  = useRef(true);
    const [cart, setCart] = useState([]);
    const [updateQt, setUpdateQt] = useState([]);
    const [cartQt, setCartQt] = useState("0")
    const [load, setLoad] = useState(true);
    

    const apearSearch = (e) => {
        searchRef.current.className += " pop-up-search-active";
        setTimeout(()=> {
            searchRef.current.className += " add-search-showing-style";
        }, 30)
    }

    const showCart = () => {
        cartRef.current.className += ' pop-up-cart-active';
        setTimeout(()=>{
            cartRef.current.className += ' add-showing-style'
        }, 30);
    }

    const removeFromCart = (item_id) => {
        axiosInstance.get(`products/remove-from-cart/${item_id}/`).then(
            res => {
                console.log(res);
                document.getElementById(item_id).style.display = "none";
                setUpdateQt(prev => [...prev, {}])
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    };

    useEffect(() => {
        if (isInitialMount.current){
            isInitialMount.current = false
            axios.all([
                axiosInstance.get('products/cart-items-qts/'),
                axiosInstance.get('products/cart/')
            ]).then(
                axios.spread((res1, res2) => {
                    setCartQt('' + res1.data.qts);
                    res2.data.items.forEach(item => {
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
                    setLoad(false);
                    
                })
            ).catch(
                axios.spread((err1, err2) => {
                    console.log(err1);
                    console.log(err2);
                })
            )
        } else {
            axiosInstance.get('products/cart-items-qts/').then(
                res => {
                    setCartQt('' + res.data.qts);
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        }
        
    },[updateQt])


    return (
        <>
            <nav>
                {console.log('dome rerender')}
                <PopUpCart 
                cart = {cart}
                removeFromCartFn={removeFromCart}
                cartRef={cartRef} 
                itemDivRef = {itemDivRef}
                />
                <div className="top-nav">
                    <p>FREE SHIPPING FOR ALL AUSTRALIAN ORDERS OVER $200</p>
                </div>
                <div className="container">
                    <div className="content">
                        <div className="pages">
                            <ul className="list">
                                {   
                                    localStorage.getItem('access') 
                                    ?
                                    <li className='list-item' onClick={apearSearch}>
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    search </li>

                                    :
                                    

                                    <>
                                    <li className='list-item'><NavLink to="/sing-in" >Sing in </NavLink></li>
                                    <li className='list-item slash'><NavLink to="#" >Register </NavLink></li>
                                    <li className='list-item' onClick={apearSearch}>
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    search </li>
                                    </>
                                }
                                
                                
                            </ul>
                        </div>
                        <div className="logo">
                            <Link to="/"><h1>sindybad</h1></Link>
                        </div>
                        <div className="pages2">
                        <ul className="list">
                               
                                <li className='cart-i list-item' onClick={showCart}>
                                    <i className="cart-header fa fa-shopping-cart" aria-hidden="true" cart_qts={cartQt} ></i>
                                </li>
                                <li className="profile list-item">
                                    <div className="image">
                                        <img src="https://via.placeholder.com/50" alt="" />
                                    </div>
                                    <div className="info">
                                        <h6>Visit Your Profile</h6>
                                        <p>Check your history with us</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div> 
                </div>
                <div className="bottom-nav">
                    <div className="container">
                        <div className="catigories">
                            <ul className="list">
                                <li className='list-item nav-item'><NavLink to="/" >home</NavLink></li>
                                <li className='list-item nav-item'><NavLink to="#" >Category</NavLink></li>
                                <li className='list-item nav-item'><NavLink to="#" >Category</NavLink></li>
                                <li className='list-item nav-item'><NavLink to="#" >Category</NavLink></li>
                                <li className='list-item nav-item'><NavLink to="#" >Category</NavLink></li>
                                <li className="list-item nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <PopUpSearch searchRef={searchRef} />

        </>
    );
};

export default Header;