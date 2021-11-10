import React, {useRef} from 'react';
import { NavLink, Link } from 'react-router-dom';
import "../../assets/css/header.css"
import PopUpSearch from './PopUpSearch';
const Header = () => {
    const apearRef = useRef();
    const apear = (e) => {
        const display = apearRef.current.style.display;
        {}
        apearRef.current.style.display = "block";
        
    }
    return (
        <>
            <nav>
                <div className="top-nav">
                    <p>FREE SHIPPING FOR ALL AUSTRALIAN ORDERS OVER $200</p>
                </div>
                <div className="container">
                    <div className="content">
                        <div className="pages">
                            <ul className="list">
                                <li className='list-item'><NavLink to="#" >Sing in </NavLink></li>
                                <li className='list-item slash'><NavLink to="#" >Register </NavLink></li>
                                <li className='list-item' onClick={apear}><i className="fa fa-search" aria-hidden="true"></i>
   search </li>
                            </ul>
                        </div>
                        <div className="logo">
                            <Link to="/"><h1>sindybad</h1></Link>
                        </div>
                        <div className="pages2">
                        <ul className="list">
                               
                                <li className='cart-i list-item'><NavLink to="#" ><i className="cart fa fa-shopping-cart" aria-hidden="true"></i>
                                </NavLink></li>
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
                <PopUpSearch apearRef={apearRef} />
            </nav>
        </>
    );
};

export default Header;