import React, {useRef} from 'react';

const PopUpSearch = (props) => {
    const closeSreach = () => {
        props.searchRef.current.style.display = "none";
    }    
     
    return (
        <div className="pop-up-search" ref={props.searchRef}>
            <div className="row">
                <div className="col-md-8">
                    <form action="" method="POST" className="search-from">
                        <input type="text" name="search" id="search" placeholder="Key Word"/>
                        <button>Search</button>
                    </form>
                    <i class="fa fa-times-circle-o close" aria-hidden="true" onClick={closeSreach} ></i>
                </div>
               
            </div>
        </div>
    );
};

export default PopUpSearch;