import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";


const MyOrderDetails = () => {
    return (
        <>
            <Header isFixedColor={true}></Header>
            <div className="other_pages_container">
                <h1 className="title text-center">Order Details</h1>
                <div className="container">
                    <div className="order_details"></div>
                </div>
            </div>
        </>
    );
}


export default withRouter(MyOrderDetails);
