import React from "react";

import loader from '../../assets/loader.gif';
const Loader = () => {

    return (
        <>
        <div className="site_loader">
            <img src={loader} alt="" />
        </div>
        </>
    );
}

export default Loader;