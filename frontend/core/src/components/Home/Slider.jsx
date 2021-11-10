import React from 'react';
import slider from "../../assets/images/slider.jpg"

const Slider = () => {
    return (
        <div className="slider">
            <div className="row">
                <div className="col-md-12 inner" >
                    <div className="slider-image">
                        <img src={slider} alt="" />
                    </div>
                </div>
                <div className="cover inner">
                    <div className="text">
                        <p className="title">Shopping From Anywhere</p>
                        <p>We are not the only but we promise to provide the best</p>
                        <button>Get Started</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Slider;