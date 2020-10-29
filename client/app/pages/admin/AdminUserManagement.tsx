import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import ADHeader from "app/components/ADHeader";
import DataTable from "react-data-table-component";
import First from "../../../assets/first.svg";
import Last from "../../../assets/last.svg";
import Next from "../../../assets/next.svg";
import Previous from "../../../assets/previous.svg";
import viewicon from "../../../assets/view.svg";

import { AppContext } from "contexts/appContext";
import AdminSidebar from "./_components/AdminSidebar";
import AdminSearch from "./_components/AdminSearch";

const AdminUserManagement = () => {
  const { getallADUsers, AllUsers } = useContext(AppContext);
  const [Users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: "Name",
      selector: "firstName",
      sortable: true,
      className: "header-col",
    },
    {
      name: "Email",
      selector: "emailAddress",
      sortable: true,
      className: "header-col",
    },
    {
      name: "No. of Orders",
      selector: "noOfOrders",
      sortable: true,
      className: "header-col",
    },
    {
      name: "Member Since",
      selector: "joinedOn",
      sortable: true,
      sortFunction: function (a, b) {
        return +new Date(a.joinedOn) - +new Date(b.joinedOn);
      },
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

  //Runing loader for 2 secs only
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (AllUsers) {
      setUsers(AllUsers);
    }
  }, [AllUsers]);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const newUsers = Users.filter(
    (users) =>
      users.emailAddress.toLowerCase().includes(search.toLowerCase()) ||
      users.firstName.toLowerCase().includes(search.toLowerCase()) ||
      users.lastName.toLowerCase().includes(search.toLowerCase()) ||
      users.joinedOn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <ADHeader isFixedColor={true} widthType={"full"}></ADHeader>
      <div className="other_pages_container">
        <div className={"admin-order-wrap"}>
          <AdminSidebar></AdminSidebar>

          <section>
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
              ""
            )}
            <div className={"section-head"}>
              <div>
                <h2>Customers</h2>
              </div>
              <div style={{ maxWidth: "200px" }}>
                <AdminSearch searchInput={search} onChange={onSearchChange} />
              </div>
            </div>
            <DataTable
              columns={columns}
              data={newUsers}
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
        </div>
      </div>
    </>
  );
};

export default withRouter(AdminUserManagement);
