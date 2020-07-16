import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";

import viewicon from "../../../assets/view.svg";
import { AppContext } from "contexts/appContext";
const MyOrders = () => {
  const { getMyOrders, myOrders } = useContext(AppContext);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders();
  }, []);

  useEffect(() => {
    if (myOrders) {
      // const allOrders = myOrders.sort((a, b) => {
      //   return Number(a.id) - Number(b.id);
      // });
      setOrders(myOrders);
    }

  }, [myOrders]);

  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="other_pages_container">
        <h1 className="title text-center">My Orders</h1>
        <div className="container my_order_container">
          <table className="table mpartial_table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Delivery Email</th>
                <th>Order Date</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length ? (
                orders.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td>{order.projectName}</td>
                      <td>{order.emailForDeliveryOfResults}</td>
                      <td>{order.createdAt}</td>
                      <td>${order.amountInCents / 100}</td>
                      <td className="orders_payment_status">{order.paymentStatus.toLowerCase()}</td>
                      <td className="text-center order_view_icon">
                        <Link to={`/ordersdetails/${order.id}`}>
                          <img src={viewicon} alt="" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                  <tr>
                    <td colSpan="5">No Order Available.</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default withRouter(MyOrders);
