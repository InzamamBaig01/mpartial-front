import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";

import viewicon from "../../../assets/view.svg";
import { AppContext } from "contexts/appContext";
const ManageUsers = () => {
  const { getMyOrders, myOrders } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState({
    active: true,
    pending: false,
    deleted: false,
  });

  useEffect(() => {
    getMyOrders();
  }, []);

  useEffect(() => {
    if (myOrders) {
      // const allOrders = myOrders.sort((a, b) => {
      //   return Number(a.id) - Number(b.id);
      // });
      //setOrders(myOrders);
    }
  }, [myOrders]);
  console.log(activeTab.active, "heellele");
  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="other_pages_container">
        <h1 className="title text-center">Manage Users</h1>
        <div className="container ">
          <div className="row mt-5">
            <div
              className={
                activeTab.active ? "col-lg-2 active_section" : "col-lg-2 faded"
              }
              onClick={() =>
                setActiveTab({
                  active: true,
                  pending: false,
                  deleted: false,
                })
              }
            >
              <p>Active</p>
            </div>
            <div
              className={
                activeTab.pending ? "col-lg-2 active_section" : "col-lg-2 faded"
              }
              onClick={() =>
                setActiveTab({
                  active: false,
                  pending: true,
                  deleted: false,
                })
              }
            >
              <p> Pending</p>
            </div>
            <div
              className={
                activeTab.deleted ? "col-lg-2 active_section" : "col-lg-2 faded"
              }
              onClick={() =>
                setActiveTab({
                  active: false,
                  pending: false,
                  deleted: true,
                })
              }
            >
              <p>Deleted</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-8"></div>
            <div className="col-lg-4">
              {" "}
              <div className="payment_section pl-2 pr-2">
                <div className="payment_section_header ">
                  <div className="row ">
                    <div className="col text-left ">
                      <div className="payment_header_title">Invite Users</div>
                    </div>
                  </div>
                </div>
                <div className="payment_section_body cards subscription_cards">
                  <form>
                    <div className="row mt-5 pl-2 pr-2">
                      <div className="col-lg-12">
                        <div className="text-left mb-1 label-text">Email</div>
                        <input className="form-control" type="email" required />
                      </div>
                      <div className="col-lg-12 mt-4">
                        <div className="text-left mb-1 label-text">
                          Invitation Message
                        </div>
                        <textarea className="form-control" type="text" />
                      </div>
                      <div className="col-lg-12 mt-4">
                        <button className="btn">Send Invitation</button>
                      </div>
                    </div>
                  </form>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ManageUsers);
