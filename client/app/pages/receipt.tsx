import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";


const Receipt = () => {
    return (
        <>
            <Header isFixedColor={true}></Header>
            <div className="other_pages_container">
                <h1 className="title text-center">Receipt</h1>
                <div className="container receipt_details" >
                    <div className="receipt_info">
                        Thank you. Your order has been received.
                    </div>
                    <div className="row order_details_row">
                        <div className="col">
                            <label>Order No.</label>
                            <div className="receipt_data">0214</div>
                        </div>
                        <div className="col">
                            <label>Date</label>
                            <div className="receipt_data">Apr 02,2020</div>
                        </div>
                        <div className="col">
                            <label>Email</label>
                            <div className="receipt_data">steve@gmail.com</div>
                        </div>
                        <div className="col">
                            <label>Total</label>
                            <div className="receipt_data">$0.00</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col receipt_heading">
                            Order Details
                        </div>
                    </div>
                    <div className="row order_checkout_details">
                        <div className="col-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        <th>total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>mpartial</td>
                                        <td>$250</td>
                                    </tr>

                                    <tr>
                                        <td>Subtotal</td>
                                        <td>$250</td>
                                    </tr>

                                    <tr>
                                        <td>Total</td>
                                        <td>$250</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <button className="btn">My Orders</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default withRouter(Receipt);
