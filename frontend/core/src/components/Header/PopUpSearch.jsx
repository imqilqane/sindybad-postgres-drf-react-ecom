import React from 'react';

const PopUpSearch = (props) => {
    return (
        <div className="pop-up-search" ref={props.apearRef}>
            <div className="row">
                <div className="col-md-8">
                <form action="" method="POST">
                    <input type="text" name="search" id="search" placeholder="Key Word"/>
                    <button>Search</button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default PopUpSearch;