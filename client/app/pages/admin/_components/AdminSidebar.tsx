import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSidebar = (props) => {
  console.log("Props", location.pathname);
  return (
    <>
      <aside>
        <ul>
          <li>
            <Link
              className={location.pathname === "/allorders" ? "active" : ""}
              to="/allorders"
            >
              <span></span>Orders
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/user-management" ? "active" : ""
              }
              to="/user-management"
            >
              <span></span> Customers
            </Link>
          </li>
          <li>
            <Link
              className={location.pathname === "/coupons" ? "active" : ""}
              to="/coupons"
            >
              <span></span>Coupons
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/subscription_coupons" ? "active" : ""
              }
              to="/subscription_coupons"
            >
              <span></span>Subscription Coupons
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/allsubscriptions" ? "active" : ""
              }
              to="/allsubscriptions"
            >
              <span></span> Subscriptions
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default AdminSidebar;
