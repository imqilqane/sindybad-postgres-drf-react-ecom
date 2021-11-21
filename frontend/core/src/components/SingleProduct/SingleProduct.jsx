import React, {useEffect, useState} from 'react';
import one from "../../assets/images/one.jfif"
import "../../assets/css/single-product.css"
import SecondeSlider from '../Home/SecondeSlider';
import axiosInstance from '../../axios';
import { useParams } from 'react-router';


const SingleProduct = () => {
    window.scrollTo(0, 0);
    const [item, setItem] = useState([]);
    const [load, setLoad] = useState(true);
    const {slug} = useParams();

    useEffect(()=>{
        axiosInstance.get(`products/single/${slug}`).then(res => {
            setItem(res.data);
            setLoad(false);
        }).catch(err => {
            console.log(err);
        })
    },[])

    if (load) {
        return (
            <h1>loading ...</h1>
        )
    };

    const addToCart = () => {
        axiosInstance.get(`products/add-to-cart/${item.id}`).then(
            res => {
                window.location.reload();
                console.log(res);
            }
        ).catch(err => {
            console.log(err);
        })
    }



    return (
        <>
        <div className="single-product mb-1 ">
            <p className='category '>HOME / ACCESSORIES  / Wood Headphone Stand </p>
            <div className="container">
                
                        <div className="row product">
                            <div className="gallery col-md-6">
                                <div className="main-img">
                                    <img src={`http://localhost:8000${item.main_image}`} alt="" />
                                </div>
                            </div>
                            <div className="description col-md-6">
                                <h3 className="title">{item.name}</h3>
                                <p className="price">${item.price}</p>
                                <div className="row shipping-cart">
                                    <div className="col-md-5 add-cart">
                                        <button className="btn add-to-cart" onClick={addToCart}>Add to cart</button>
                                        <button className="btn add-to-wish">Add to wish list</button>
                                    </div>
                                    <div className="col-md-6 shipping">
                                        <p className="shipping-type">  
                                        <i className="fa fa-truck mr-1" aria-hidden="true"></i>

                                        Standar shipping
                                        </p>
                                        <p className="shipping-desc">
                                        <i className="fa fa-check-circle mr-1 text-success" aria-hidden="true"></i>
                                        Available for standar shipping
                                        </p>
                                    </div>
                                </div>
                                <div className="row product-desc">
                                    <p>{item.descrition}</p>
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