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

import { AppContext } from "contexts/appContext";
import AdminSidebar from "./_components/AdminSidebar";
const AdminUserManagement = () => {
  const { getallADUsers, AllUsers } = useContext(AppContext);
  const [Users, setUsers] = useState([]);
  const columns = [
    {
      name: "Name",
      selector: "firstName",
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
      name: "Member Since",
      selector: "joinedOn",
      sortable: false,
      className: "header-col",
    },
    {
      name: "Action",
      selector: "action",
      sortable: false,
      className: "header-col",
      format: (d) => (
        <Link to={`/usersdetails/${window.btoa(d.emailAddress)}`}>
          <img src={viewicon} alt="" />
        </Link>
      ),
    },
  ];

  useEffect(() => {
    getallADUsers();
  }, []);

  useEffect(() => {
    if (AllUsers.length) {
      setUsers(AllUsers);
    }
  }, [AllUsers]);
  return (
    <>
      <ADHeader isFixedColor={true} widthType={"full"}></ADHeader>
      <div className="other_pages_container">
        <div className={"admin-order-wrap"}>
          <AdminSidebar></AdminSidebar>

          <section>
            <div className={"section-head"}>
              <div>
                <h2>Customers</h2>
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
              data={Users}
              responsive={true}
              pagination={true}
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
        </div>
      </div>
    </>
  );
};

export default withRouter(AdminUserManagement);
