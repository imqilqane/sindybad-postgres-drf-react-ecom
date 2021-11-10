import React from 'react';
import slider2 from "../../assets/images/slider2.jpg"
import brand1 from "../../assets/images/brand1.png"
import brand2 from "../../assets/images/brand2.png"
import brand3 from "../../assets/images/brand3.png"
import brand4 from "../../assets/images/brand4.png"
import safty_1 from "../../assets/images/safty-1.png"
import safty_2 from "../../assets/images/safty-2.png"
import safty_3 from "../../assets/images/safty-3.png"
import safty_4 from "../../assets/images/safty-4.png"

const SecondeSlider = () => {
    return (
        <>
        <div className="second-slider slider">
            <div className="row">
                <div className="col-md-12 inner" >
                    <div className="slider-image">
                        <img src={slider2} alt="" />
                    </div>
                </div>
                <div className="cover inner">
                        <div className="col-md-12 brands-father">
                            <div className="row brands">
                                <div className="col-md-3">
                                    <a href="" >
                                    <img src={brand1} alt="" />
                                    </a>
                                </div>
                                <div className="col-md-3">
                                    <a href="" >
                                    <img src={brand2} alt="" />
                                    </a>
                                </div>
                                <div className="col-md-3">
                                    <a href="" >
                                    <img src={brand3} alt="" />
                                    </a>
                                </div>
                                <div className="col-md-3">
                                    <a href="" >
                                    <img src={brand4} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
         <div className="row safty">
            <div className="col-md-3">
                <div className="cms-img">
                    <img src={safty_1} alt="" />
                </div>
                <div className="cms-info">
                    <p className="bold">Text here to edit</p>
                    <p className="light">text here to edit</p>
                </div>
            </div>
            <div className="col-md-3">
                <div className="cms-img">
                    <img src={safty_2} alt="" />
                </div>
                <div className="cms-info">
                    <p className="bold">Text here to edit</p>
                    <p className="light">text here to edit</p>
                </div>
            </div>
            <div className="col-md-3">
                <div className="cms-img">
                    <img src={safty_3} alt="" />
                </div>
                <div className="cms-info">
                    <p className="bold">Text here to edit</p>
                    <p className="light">text here to edit</p>
                </div>
            </div>
            <div className="col-md-3">
                <div className="cms-img">
                    <img src={safty_4} alt="" />
                </div>
                <div className="cms-info">
                    <p className="bold">Text here to edit</p>
                    <p className="light">text here to edit</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default SecondeSlider;