import React from 'react';
import top2 from "../../assets/images/top2.jpg"
import top2_1 from "../../assets/images/top2_1.jpg"

const TopTwoCats = () => {
    return (
        <div className='top-two-cats'>
            <div className="row">
                <div className="col-md-6">
                    <div className="row row-image">
                        <a href="">
                            <img src={top2} alt="" />
                            <div className="overlay"></div>
                        </a>
                    </div>
                    <div className="row disc">
                        <p className="cat-name">Category</p>
                        <a href="">learn more</a>

                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row row-image">
                        <a href="">
                            <img src={top2_1} alt="" />
                            <div className="overlay"></div>
                        </a>
                    </div>
                    <div className="row disc">
                        <p className="cat-name">Category</p>
                        <a href="">learn more</a>
                    </div>
                </div>
            </div>            
        </div>
    );
};

export default TopTwoCats;