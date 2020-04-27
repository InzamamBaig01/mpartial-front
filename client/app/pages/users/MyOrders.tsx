import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";

import viewicon from '../../../assets/view.svg';
import { AppContext } from "contexts/appContext";
const MyOrders = () => {

    const {
        getMyOrders,
        myOrders,
    } = useContext(AppContext);


    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getMyOrders();
    }, []);


    useEffect(() => {
        const allOrders = myOrders.sort((a, b) => {
            return Number(a.id) - Number(b.id);
        })
        setOrders(allOrders);
    }, [myOrders])

    return (
        <>
            <Header isFixedColor={true}></Header>
            <div className="other_pages_container">
                <h1 className="title text-center">My Orders</h1>
                <div className="container">
                    <table className="table mpartial_table">
                        <thead>
                            <tr>
                                <th>Order No.</th>
                                <th>Email</th>
                                <th>Order Date</th>
                                <th>Total</th>
                                <th>paymentStatus</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.length ? orders.map((order, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{order.id}</td>
                                            <td>{order.emailForDeliveryOfResults}</td>
                                            <td>Apr 02,2020</td>
                                            <td>${order.amountInCents / 100}</td>
                                            <td>{order.paymentStatus}</td>
                                            <td className="text-center order_view_icon"><img src={viewicon} alt="" /></td>
                                        </tr>
                                    )
                                }) : (
                                    <tr>
                                        <td colSpan="5">No Order Available.</td>
                                       
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}


export default withRouter(MyOrders);
