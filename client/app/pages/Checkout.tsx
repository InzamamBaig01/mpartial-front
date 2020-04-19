import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";


const Checkout = () => {
    return (
        <>
            <Header isFixedColor={true}></Header>
            <div className="other_pages_container">
                <h1 className="title text-center">Checkout</h1>
                <div className="container">
                    <form className="order_form">
                        <div className="row">
                            <div className="col sub_titles">
                                Billing Details
                            </div>
                        </div>
                        <div className="row">
                            <div className={`form-group col-12`}>
                                <label>First Name</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className={`form-group col-12`}>
                                <label>Last Name</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className={`form-group col-12`}>
                                <label>Email Address</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className={`form-group col-12`}>
                                <label>ZipCode</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col sub_titles">
                                Payment Method
                            </div>
                        </div>

                        <div className="row">
                            <div className={`form-group col-12`}>
                                <input type="checkbox" /> Card Ending 7878
                            </div>

                            <div className={`form-group col-12`}>
                                <input type="checkbox" /> Card Ending 2345
                            </div>
                        </div>

                        <div className="row">
                            <div className="col sub_titles">
                                Your Order
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
                            <div className="col ">
                               <button className="btn">Checkout</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}


export default withRouter(Checkout);
