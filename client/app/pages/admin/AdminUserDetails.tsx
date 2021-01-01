import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import ADHeader from "app/components/ADHeader";
import DataTable from "react-data-table-component";
import viewicon from "../../../assets/view.svg";

import { AppContext } from "contexts/appContext";
import AdminSidebar from "./_components/AdminSidebar";
import OrderDetails from "app/components/OrderDetails";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { updateStatus } from "utils/api-routes/api-routes.util";
import TransactionHistoryAD from "./_components/TranscationHistoryAD";
import SubscriptionDetails from "./_components/subscriptionDetails";
import BankCard from "app/components/BankCard";
import BankCardAD from "./_components/BankCardAD";

const fields = [
  {
    name: "First Name",
    id: "firstName",
    type: "text",
  },
  {
    name: "Last Name",
    id: "lastName",
    type: "text",
  },
  {
    name: "Total Orders",
    id: "noOfOrders",
    type: "text",
  },
  {
    name: "Cell",
    id: "phone",
    type: "text",
  },
  {
    name: "Profile Status",
    id: "profilestatus",
    type: "text",
  },
  {
    name: "Role",
    id: "role",
    type: "text",
  },
  {
    name: "Member Since",
    id: "joinedOn",
    type: "text",
  },
  {
    name: "Account Type",
    id: "subscriptionstatus",
    type: "text",
  },
];

const AdminUserDetails = (props) => {
  const { getADUserById, singleUserDetails, setSingleUserDetails } = useContext(
    AppContext
  );
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState({
    all: true,
    sub: false,
    pay: false,
  });

  const userid = props.match.params.userid
    ? window.atob(props.match.params.userid)
    : false;
  const [user, setUser] = useState(false);
  useEffect(() => {
    setUser(false);
    setSingleUserDetails(false);
    getADUserById(userid);
  }, []);

  useEffect(() => {
    if (singleUserDetails) {
      // console.log(singleUserDetails);
      setUser(singleUserDetails);
      setLoading(false);
    }
    setSingleUserDetails(false);
  }, [singleUserDetails]);

  console.log(singleUserDetails);

  const columns = [
    {
      name: "Name",
      selector: function (a) {
        return a.firstName + " " + a.lastName;
      },
      sortable: false,
      className: "header-col",
    },
    {
      name: "Email",
      selector: "emailAddress",
      sortable: false,
      className: "header-col",
    },
    {
      name: "No. of Orders",
      selector: "noOfOrders",
      sortable: false,
      className: "header-col",
    },
    {
      name: "Action",
      selector: "action",
      sortable: false,
      className: "header-col",
      format: (d) => (
        <a href={`/usersdetails/${window.btoa(d.emailAddress)}`}>
          <img src={viewicon} alt="" />
        </a>
      ),
    },
  ];

  console.log(singleUserDetails.childs);

  return (
    <>
      <ADHeader isFixedColor={true} widthType={"full"}></ADHeader>
      <div className="other_pages_container">
        <div className={"admin-order-wrap"}>
          <AdminSidebar></AdminSidebar>

          {loading ? (
            <img
              src={require("../../../assets/loader.gif")}
              alt="loading..."
              style={{
                position: "absolute",
                height: "100px",
                width: "100px",
                top: "50%",
                left: "50%",
                marginLeft: "-50px",
                marginTop: "-50px",
              }}
            />
          ) : (
            <section>
              <div className={"section-head"}>
                <div>
                  <h2>Customer Details</h2>
                </div>
                <div>
                  <div className="text-right"></div>
                </div>
              </div>
              {user ? (
                activeTab.all ? (
                  <div className="order_details">
                    <div className="order_details_header">
                      <div className="row">
                        <div className="col-8">Email: {user.emailAddress}</div>
                        {user.ischildaccount ? (
                          ""
                        ) : user.subscriptionstatus === "NotActive" ? (
                          <button
                            className="btn ml-4"
                            onClick={() => {
                              setActiveTab({
                                all: false,
                                sub: false,
                                pay: true,
                              });
                            }}
                          >
                            View Payments
                          </button>
                        ) : (
                          <div className="col-4">
                            <button
                              className="btn mr-3"
                              onClick={() => {
                                setActiveTab({
                                  all: false,
                                  sub: true,
                                  pay: false,
                                });
                              }}
                            >
                              View Subscription
                            </button>
                            <button
                              className="btn"
                              onClick={() => {
                                setActiveTab({
                                  all: false,
                                  sub: false,
                                  pay: true,
                                });
                              }}
                            >
                              View Payments
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row order_details_info">
                      <div className="col-md-4 col-sm-6 col-xs-6 label-text">
                        <label>First Name</label>
                        <div className="order_details_value">
                          {user.firstName}
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-6 label-text">
                        <label>Last Name</label>
                        <div className="order_details_value">
                          {user.lastName}
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-6 label-text">
                        <label>Total Orders</label>
                        <div className="order_details_value">
                          {user.noOfOrders}
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-6 label-text">
                        <label>Total Orders</label>
                        <div className="order_details_value">
                          {user.noOfOrders}
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-6 label-text">
                        <label>Profile Status</label>
                        <div className="order_details_value">
                          {user.profilestatus}
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-6 label-text">
                        <label>Role</label>
                        <div className="order_details_value">{user.role}</div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-6 label-text">
                        <label>Member Since</label>
                        <div className="order_details_value">
                          {user.joinedOn}
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-6 label-text">
                        <label>Account Type</label>
                        <div className="order_details_value">
                          {user.ischildaccount
                            ? "Child"
                            : user.subscriptionstatus === "NotActive"
                            ? "Orphan"
                            : "Enterprise"}
                        </div>
                      </div>
                      {user.subscriptionstatus === "NotActive" ? (
                        ""
                      ) : (
                        <div className="col-md-4 col-sm-6 col-xs-6 label-text">
                          <label>Company</label>
                          <div className="order_details_value">
                            {user.companyname ? user.companyname : "NA"}
                          </div>
                        </div>
                      )}
                      {user.subscriptionstatus === "NotActive" ? (
                        ""
                      ) : (
                        <div className="col-md-4 col-sm-6 col-xs-6 label-text">
                          <label>Subscription Status</label>
                          <div className="order_details_value">
                            {user.subscriptionstatus}
                          </div>
                        </div>
                      )}
                      {user.subscriptionstatus === "NotActive" ||
                      user.ischildaccount ? (
                        ""
                      ) : (
                        <div className="col-md-4 col-sm-6 col-xs-6 label-text">
                          <label>Sub-Accounts</label>
                          <div className="order_details_value">
                            {user.childs.length}
                          </div>
                        </div>
                      )}
                    </div>
                    {user.subscriptionstatus === "NotActive" ||
                    user.ischildaccount ? (
                      ""
                    ) : (
                      <div>
                        <hr />
                        <div className="order_details_header">
                          Sub-accounts Information
                        </div>
                        <div>
                          <DataTable
                            columns={columns}
                            data={user.childs}
                            responsive={true}
                            pagination={true}
                          />
                        </div>
                      </div>
                    )}

                    <div className="order_details_footer">
                      <Link to={`/user-management`}>
                        <button className="btn">Back</button>
                      </Link>
                    </div>
                  </div>
                ) : activeTab.sub ? (
                  <div className="order_details">
                    <div className="order_details_header ">
                      <div className="row">
                        <div className="col-10">Email: {user.emailAddress}</div>
                        <div className="col-2">
                          <button
                            className="btn mr-3"
                            onClick={() => {
                              setActiveTab({
                                all: true,
                                sub: false,
                                pay: false,
                              });
                            }}
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: "0 20px" }}>
                      <SubscriptionDetails
                        email={user.emailAddress}
                        subscriptionstatus={user.subscriptionstatus}
                      />
                    </div>
                    <div style={{ padding: "0 20px" }}>
                      <div className="row mt-4">
                        <div className="col-lg-6">
                          <div className="payment_section">
                            <div className="payment_section_header">
                              <div className="row">
                                <div className="col text-left">
                                  <div className="payment_header_title">
                                    Subscription Transaction History
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <TransactionHistoryAD
                                email={user.emailAddress}
                                subscriptionstatus={user.subscriptionstatus}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="payment_section">
                            <div className="payment_section_header">
                              <div className="row">
                                <div className="col text-left">
                                  <div className="payment_header_title">
                                    Payment Method
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="payment_section_body cards subscription_cards">
                              {user &&
                                user.stripeCustomerCard.map((card) => {
                                  if (card.isDefault) {
                                    return <BankCardAD card={card} />;
                                  }
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="order_details">
                    <div className="order_details_header ">
                      <div className="row">
                        <div className="col-10">Email: {user.emailAddress}</div>
                        <div className="col-2">
                          <button
                            className="btn mr-3"
                            onClick={() => {
                              setActiveTab({
                                all: true,
                                sub: false,
                                pay: false,
                              });
                            }}
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="cards text-left">
                      {user && user.stripeCustomerCard.length > 0 ? (
                        user.stripeCustomerCard.map((card, index) => {
                          return <BankCardAD card={card} />;
                        })
                      ) : (
                        <div className="text-left">
                          <b>No Payment method found! </b>
                        </div>
                      )}
                    </div>
                  </div>
                )
              ) : (
                <></>
              )}
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default withRouter(AdminUserDetails);
