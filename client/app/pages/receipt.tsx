import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";
import { AuthContext } from "contexts/authContext";
import { AppContext } from "contexts/appContext";

const Receipt = (props) => {
  const orderid = props.match.params.orderid;
  const { userDetails } = useContext(AuthContext);
  const { getOrderById, singleOrderDetails, price } = useContext(AppContext);

  const [order, setOrder] = useState(false);

  useEffect(() => {
    getOrderById(orderid);
  }, []);

  useEffect(() => {
    if (singleOrderDetails) {
      setOrder(singleOrderDetails);
    }
  }, [singleOrderDetails]);

  useEffect(() => {
    localStorage.removeItem("sessipn");
  }, []);
  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="other_pages_container">
        <h1 className="title text-center">Receipt</h1>
        <h3 className="text-center">{order.projectName}</h3>
        <br />
        <div className="container receipt_details">
          <div className="receipt_info">
          Thank you for your deposit. Your request is being processed. You can expect the deliverable to arrive in your inbox within the next 4 business days. A receipt for this transaction has been sent to the email associated with your account.
          </div>
          <div className="row order_details_row">
            <div className="col">
              <label>Order No.</label>
              <div className="receipt_data">{orderid}</div>
            </div>
            <div className="col">
              <label>Date</label>
              <div className="receipt_data">{order.createdAt}</div>
            </div>
            <div className="col">
              <label>Email</label>
              <div className="receipt_data">{userDetails().emailAddress}</div>
            </div>
            <div className="col">
              <label>Total</label>
              <div className="receipt_data">${price}.00</div>
            </div>
          </div>
          <div className="row">
            <div className="col receipt_heading">Order Details</div>
          </div>
          <div className="row order_checkout_details">
            <div className="col-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mpartial Deposit	</td>
                    <td>${price}</td>
                  </tr>

                  <tr>
                    <td>Subtotal</td>
                    <td>${price}</td>
                  </tr>

                  <tr>
                    <td>Total</td>
                    <td>${price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <Link to="/orders">
                <button className="btn">My Orders</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Receipt);
