import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import ADHeader from "app/components/ADHeader";
import DataTable from "react-data-table-component";
import viewicon from "../../../assets/view.svg";
import editicon from "../../../assets/profile_edit.svg";
import { AppContext } from "contexts/appContext";
import AdminSearch from "./_components/AdminSearch";

import AdminSidebar from "./_components/AdminSidebar";
const AllSubscriptions = () => {
  const { getallADOrders, AllOrders } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: "Company Name",
      selector: "id",
      sortable: true,
      className: "header-col",
    },
    {
      name: "First Name",
      selector: "emailForDeliveryOfResults",
      sortable: true,
      className: "header-col",
    },
    {
      name: "Last Name",
      selector: "createdAt",
      sortable: true,
      className: "header-col",
    },
    {
      name: "Status",
      selector: "paymentStatus",
      sortable: true,
      className: "header-col",
      format: (d) => {
        // console.log(d)
        return (
          <>
            {d.paymentStatus}
            {/* <img  src={editicon} className="admin-order-edit" alt="" /> */}
          </>
        );
      },
    },
    {
      name: "Start Date",
      selector: "amountInCents",
      sortable: false,
      className: "header-col",
      format: (d) => `$${d.amountInCents / 100}`,
    },
    {
      name: "Next Payment Date",
      selector: "amountInCents",
      sortable: false,
      className: "header-col",
      format: (d) => `$${d.amountInCents / 100}`,
    },
    {
      name: "Action",
      selector: "action",
      sortable: false,
      className: "header-col",
      format: (d) => (
        <Link to={`/details/${d.id}`}>
          <img src={viewicon} alt="" />
        </Link>
      ),
    },
  ];

  useEffect(() => {
    getallADOrders();
  }, []);

  //Running loader for 2 secs
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (AllOrders.length) {
      setOrders(AllOrders);
    }
  }, [AllOrders]);
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
              <div className={"section-head search-text align-items-center"}>
                <div>
                  <h2>All Subscriptions</h2>
                </div>
                <div className="statuses d-flex justify-content-space align-items-center">
                  <div>
                    <p>All</p>
                  </div>
                  <div>
                    <p>Active</p>
                  </div>
                  <div>
                    <p>Paused</p>
                  </div>
                  <div>
                    <p>Cancelled</p>
                  </div>
                  <div style={{ width: "250px", maxWidth: "300px" }}>
                    <AdminSearch />
                  </div>
                </div>
              </div>
              <DataTable
                columns={columns}
                data={orders}
                responsive={true}
                pagination={true}
                noDataComponent
              />
              {/* <div className={"table-pagination"}>
              <div className={"pagination"}>
                <ul>
                  <li className={"first"}>
                    <a href="#">
                      <img className="input_icon" src={First} alt="" />
                    </a>
                  </li>
                  <li className={"previous"}>
                    <a href="#">
                      <img className="input_icon" src={Previous} alt="" />
                    </a>
                  </li>
                  <li className={"active"}>
                    <a href="#"> 1</a>
                  </li>
                  <li>
                    <a href="#"> 2</a>
                  </li>
                  <li className={"next"}>
                    <a href="#">
                      <img className="input_icon" src={Next} alt="" />
                    </a>{" "}
                  </li>
                  <li className={"last"}>
                    <a href="#">
                      <img className="input_icon" src={Last} alt="" />
                    </a>{" "}
                  </li>
                </ul>
              </div>
              <div className={"pages"}>
                <div></div>
                <div className={"info"}>
                  Showing <span>1</span> - <span>9</span> of <span>40</span>
                </div>
              </div>
            </div>
           */}
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default withRouter(AllSubscriptions);
