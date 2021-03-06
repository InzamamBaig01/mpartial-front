import React, { useEffect, useContext, useState } from "react";
import moment from "moment";
import history from "utils/history";

import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";
import { AuthContext } from "contexts/authContext";
import { AppContext } from "contexts/appContext";

const SubscriptionReceipt = (props) => {
  const orderid = props.match.params.orderid;
  const { userDetails } = useContext(AuthContext);
  const { getOrderById, singleOrderDetails, price } = useContext(AppContext);

  const [order, setOrder] = useState(false);

  console.log("PROPS", props);

  useEffect(() => {}, []);
  if (!props.location.state) {
    history.push(`/profile`);
  }
  useEffect(() => {
    if (singleOrderDetails) {
      setOrder(singleOrderDetails);
    }
  }, [singleOrderDetails]);

  useEffect(() => {
    localStorage.removeItem("checkout");
  }, []);
  return (
    <>
      <Header isFixedColor={true}></Header>

      {props.location.state ? (
        <div className="other_pages_container">
          <h1 className="title text-center">Receipt</h1>
          <br />
          <div className="container receipt_details">
            <div className="receipt_info">
              Thank you for your payment. A receipt has been issued to your
              verified email which is associated with your account.
            </div>

            <div className="row">
              <div className="col receipt_heading">Order Details</div>
            </div>
            <div className="row order_checkout_details">
              <div className="col-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{props.location.state.data.planname}</td>
                      <td>
                        ${props.location.state.data.orignalpriceincents / 100}
                      </td>
                    </tr>
                    {props.location.state.data.couponcode ? (
                      <tr>
                        <td>
                          Coupon Code ({props.location.state.data.couponcode})
                        </td>
                        <td>
                          -${props.location.state.data.amountreduced / 100}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    <>
                      <tr>
                        <td>Payment Method</td>
                        <td>Credit Card</td>
                      </tr>

                      <tr>
                        <td>Total</td>
                        <td>
                          $
                          {props.location.state.data.chargedamountincents / 100}
                        </td>
                      </tr>
                    </>
                    {/*  } */}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col receipt_heading">
                Subscription Information
              </div>
            </div>
            <div className="row order_checkout_details">
              <div className="col-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Start Date</th>
                      <th>Next Billing Date</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {moment(props.location.state.data.createdAt).format(
                          "LL"
                        )}{" "}
                      </td>
                      <td>
                        {" "}
                        {moment(
                          props.location.state.data.nextbillingdate
                        ).format("LL")}
                      </td>
                      <td>
                        ${props.location.state.data.chargedamountincents / 100}
                        /month
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="row">
              <div className="col receipt_heading">Billing Details</div>
            </div>
            <div className="row mb-5">
              <div className="col-12">
                {props.location.state.data.billingaddress}
              </div>
            </div> */}
            <div className="row">
              <div className="col text-center">
                <button
                  onClick={() => {
                    history.push({
                      pathname: "/profile",
                      state: {
                        flag: true,
                      },
                    });
                  }}
                  className="btn"
                >
                  My Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default withRouter(SubscriptionReceipt);
