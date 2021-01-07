import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";
import { AppContext } from "contexts/appContext";
import OrderDetails from "app/components/OrderDetails";

const MyOrderDetails = (props) => {
  const { getOrderById, singleOrderDetails } = useContext(AppContext);

  const orderid = props.match.params.orderid;
  const [order, setOrder] = useState(false);

  useEffect(() => {
    getOrderById(orderid);
  }, []);

  useEffect(() => {
    if (singleOrderDetails) {
      setOrder(singleOrderDetails);
    }
  }, [singleOrderDetails]);

  console.log("Order", order);

  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="other_pages_container">
        <h1 className="title text-center">Order Details</h1>
        <div className="container">
          <OrderDetails order={order} />
        </div>
      </div>
    </>
  );
};

export default withRouter(MyOrderDetails);
