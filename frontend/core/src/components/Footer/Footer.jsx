import React from 'react';
import "../../assets/css/footer.css"


const Footer = () => {

    const getYear = () => {
        return new Date().getFullYear()
    }
    return (
        <>
            <footer>
                <div className="row news-letter">
                        <div className="col-md-6">
                            <p className="sub"><strong>SUBSCRIBE TO OUR NEWSLETTER</strong> Get Last Updates</p>
                        </div>
                        <div className="col-md-6">
                            <form action="" method="POST">
                                <input type="email" name="email" id="email" placeholder="Your email address"/>
                                <button>SUBSCRIBE</button>
                            </form>
                        </div>
                </div>
                <div className="row bottom-footer">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="row first">
                                    <div className="col-md-3 card-item">
                                        <ul>
                                            <li><h5>About Us</h5></li>
                                            <li>OUR story</li>
                                            <li>Careers</li>
                                            <li>Collaboration</li>
                                            <li>Blog</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-3 card-item">
                                        <ul>
                                            <li><h5>Start Shopping</h5></li>
                                            <li>New Arrivals</li>
                                            <li>Clothing</li>
                                            <li>Accessories</li>
                                            <li>Sale</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-3 card-item">
                                        <ul>
                                            <li><h5>Connect</h5></li>
                                            <li>Facebook</li>
                                            <li>Instagram</li>
                                            <li>Pinterest</li>
                                            <li>Twitter</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-3 card-item">
                                        <ul>
                                            <li><h5>Links</h5></li>
                                            <li>FAQs</li>
                                            <li>Shipping + Returns</li>
                                            <li>Contact Us</li>
                                            <li>Privacy Policy</li>
                                        </ul>
                                    </div>
                            </div>
                            <div className="row second">
                                <div className="col-md-4">
                                    <h3>Sindbad.com</h3>
                                </div>
                                <div className="col-md-4">
                                    <div className="pages">
                                        <ul className="list">
                                            <li className='list-item'>Paypal</li>
                                            <li className='list-item slash'>Visa </li>
                                            <li className='list-item'> MasterCard </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    
                                    <div className="copy_right">
                                        <p>Copyright &copy; <span id="year"></span>  sindybad.com | {getYear()} All right reserved</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;