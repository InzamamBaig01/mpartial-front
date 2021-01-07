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
  const { getAllSubscriptions, subscriptions } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState({
    all: true,
    active: false,
    cancelled: false,
    paused: false,
  });
  const [sub, setSub] = useState([]);
  const [activeSub, setActiveSub] = useState([]);
  const [pausedSub, setpausedSub] = useState([]);
  const [cancelledSub, setcancelledSub] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: "Company Name",
      selector: "companyname",
      sortable: true,
      className: "header-col",
      format: (d) => {
        return <>{d.companyname ? d.companyname : "NA"}</>;
      },
    },
    {
      name: "First Name",
      selector: "firstName",
      sortable: true,
      className: "header-col",
    },
    {
      name: "Last Name",
      selector: "lastName",
      sortable: true,
      className: "header-col",
    },
    {
      name: "Status",
      selector: "subscriptionstatus",
      sortable: true,
      className: "header-col",
    },
    {
      name: "Start Date",
      selector: "subscriptionstartdate",
      sortable: false,
      className: "header-col",
    },
    {
      name: "Next Payment Date",
      selector: "subscriptionnextbillingdate",
      sortable: false,
      className: "header-col",
      format: (d) => {
        return (
          <>
            {d.subscriptionnextbillingdate
              ? d.subscriptionnextbillingdate
              : "NA"}
          </>
        );
      },
    },
    {
      name: "Action",
      selector: "action",
      sortable: false,
      className: "header-col",
      format: (d) => (
        <Link to={`/usersdetails/${window.btoa(d.emailAddress)}`}>
          <img src={viewicon} alt="view-icon" />
        </Link>
      ),
    },
  ];

  useEffect(() => {
    getAllSubscriptions();
  }, []);

  //Running loader for 2 secs
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (subscriptions.length) {
      setSub(subscriptions);
      setActiveSub(
        subscriptions.filter(
          (subscription) => subscription.subscriptionstatus === "Active"
        )
      );

      setcancelledSub(
        subscriptions.filter(
          (subscription) => subscription.subscriptionstatus === "Cancelled"
        )
      );

      setpausedSub(
        subscriptions.filter(
          (subscription) =>
            subscription.subscriptionstatus === "PausedDueToPaymentFailure"
        )
      );
    }
  }, [subscriptions]);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredSub = sub.filter(
    (sub) =>
      sub.emailAddress.toLowerCase().includes(search.toLowerCase()) ||
      (sub.companyname
        ? sub.companyname.toLowerCase().includes(search.toLowerCase())
        : "") ||
      sub.firstName.toLowerCase().includes(search.toLowerCase()) ||
      sub.lastName.toLowerCase().includes(search.toLowerCase())
  );
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
              <div className="section-head   row ">
                <div className=" col-lg-2">
                  <h2>All Subscriptions</h2>
                </div>
                <div className="statuses  col-lg-10 row">
                  <div
                    className={
                      activeTab.all
                        ? "col-lg-2 col-sm-6 active_sections "
                        : "col-lg-2 col-sm-6 faded"
                    }
                    onClick={() =>
                      setActiveTab({
                        all: true,
                        active: false,
                        cancelled: false,
                        paused: false,
                      })
                    }
                  >
                    <p>All ({sub.length})</p>
                  </div>
                  <div
                    className={
                      activeTab.active
                        ? "col-lg-2 col-sm-6 active_sections "
                        : "col-lg-2 col-sm-6 faded"
                    }
                    onClick={() =>
                      setActiveTab({
                        all: false,
                        active: true,
                        cancelled: false,
                        paused: false,
                      })
                    }
                  >
                    <p>Active ({activeSub.length})</p>
                  </div>
                  <div
                    className={
                      activeTab.paused
                        ? "col-lg-2 col-sm-6 active_sections "
                        : "col-lg-2 col-sm-6 faded"
                    }
                    onClick={() =>
                      setActiveTab({
                        all: false,
                        active: false,
                        cancelled: false,
                        paused: true,
                      })
                    }
                  >
                    <p>Paused ({pausedSub.length})</p>
                  </div>
                  <div
                    className={
                      activeTab.cancelled
                        ? "col-lg-2 col-sm-6 active_sections "
                        : "col-lg-2 col-sm-6 faded"
                    }
                    onClick={() =>
                      setActiveTab({
                        all: false,
                        active: false,
                        cancelled: true,
                        paused: false,
                      })
                    }
                  >
                    <p>Cancelled ({cancelledSub.length})</p>
                  </div>
                  <div
                    className="col-lg-4 col-sm-12 "
                    style={{ margin: "0 auto", alignItems: "center" }}
                  >
                    <AdminSearch
                      searchInput={search}
                      onChange={onSearchChange}
                    />
                  </div>
                </div>
              </div>
              {activeTab.all ? (
                <div>
                  <DataTable
                    columns={columns}
                    data={filteredSub}
                    responsive={true}
                    pagination={true}
                  />
                </div>
              ) : (
                ""
              )}

              {activeTab.active ? (
                <div>
                  <DataTable
                    columns={columns}
                    data={activeSub}
                    responsive={true}
                    pagination={true}
                  />
                </div>
              ) : (
                ""
              )}

              {activeTab.paused ? (
                <div>
                  <DataTable
                    columns={columns}
                    data={pausedSub}
                    responsive={true}
                    pagination={true}
                  />
                </div>
              ) : (
                ""
              )}

              {activeTab.cancelled ? (
                <div>
                  <DataTable
                    columns={columns}
                    data={cancelledSub}
                    responsive={true}
                    pagination={true}
                  />
                </div>
              ) : (
                ""
              )}
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default withRouter(AllSubscriptions);
