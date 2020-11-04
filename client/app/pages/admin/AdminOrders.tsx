import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import ADHeader from "app/components/ADHeader";
import DataTable from "react-data-table-component";
import Search from "../../../assets/search.svg";
import First from "../../../assets/first.svg";
import Last from "../../../assets/last.svg";
import Next from "../../../assets/next.svg";
import Previous from "../../../assets/previous.svg";
import viewicon from "../../../assets/view.svg";
import editicon from "../../../assets/profile_edit.svg";
import { AppContext } from "contexts/appContext";
import AdminSidebar from "./_components/AdminSidebar";
const AdminOrders = () => {
  const { getallADOrders, AllOrders } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: "Order No",
      selector: "id",
      sortable: false,
      className: "header-col",
    },
    {
      name: "Email",
      selector: "emailForDeliveryOfResults",
      sortable: false,
      className: "header-col",
    },
    {
      name: "Order Date",
      selector: "createdAt",
      sortable: false,
      className: "header-col",
    },
    {
      name: "Status",
      selector: "paymentStatus",
      sortable: false,
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
      name: "Total",
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
              <div className={"section-head"}>
                <div>
                  <h2>Orders</h2>
                </div>
                <div>
                  {/* <div className="form-group">
                  <div className="input-group">
                    <img className="input_icon" src={Search} alt="" />
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Search"
                      required
                    />
                  </div>
                </div> */}
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

export default withRouter(AdminOrders);
