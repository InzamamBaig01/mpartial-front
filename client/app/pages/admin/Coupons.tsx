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
import AdminSidebar from "./_components/AdminSidebar";
import history from "../../../utils/history";
import { Dropdown, Modal, Button } from "react-bootstrap";
import DatePicker from "reactstrap-date-picker";
import { AppContext } from "../../../contexts/appContext";
import {
  addCoupon,
  getAllCoupon,
  editCoupon,
  couponUsageHistory,
} from "utils/api-routes/api-routes.util";
import { data } from "jquery";
import moment from "moment";

interface ICoupon {
  couponcode: undefined | String | Number;
  activefrom: undefined | String | Number;
  maxusagecount: undefined | String | Number;
  offpercentage: undefined | String | Number;
  subtractfixedamount: undefined | String | Number;
  forcustomeremail: undefined | String | Number;
  maxusagecountperuser: undefined | String | Number;
  expiry: undefined | String | Number;
}

const AddCoupons = (props) => {
  const [data, setData] = useState<ICoupon>({
    couponcode: "",
    activefrom: new Date().toISOString(),
    maxusagecount: "",
    offpercentage: "",
    subtractfixedamount: "",
    forcustomeremail: "",
    maxusagecountperuser: "",
    expiry: new Date(moment().add("day", 1).format("YYYY-MM-DD")).toISOString(),
  });
  const { getallADUsers, AllUsers } = useContext(AppContext);

  const [couponType, setCouponType] = useState("Percentage");
  const [couponFor, setCouponFor] = useState("public");
  const [Users, setUsers] = useState([]);
  const [couponError, setCouponError] = useState(false);

  useEffect(() => {
    getallADUsers();
    if (props.isDuplicating) {
      const duData = props.info;
      const currentCouponFor =
        duData.forcustomeremail == null ? "Public" : "Customer";
      const currentCouponType =
        duData.offpercentage == null ? "Fixed" : "Percentage";
      setData({
        couponcode: "",
        activefrom: new Date(duData.activefrom).toISOString(),
        maxusagecount: duData.maxusagecount,
        offpercentage:
          currentCouponType == "Percentage" ? duData.offpercentage : "",
        subtractfixedamount:
          currentCouponType == "Fixed" ? duData.subtractfixedamount : "",
        forcustomeremail:
          currentCouponFor == "Customer" ? duData.forcustomeremail : "",
        maxusagecountperuser:
          duData.maxusagecountperuser != null
            ? duData.maxusagecountperuser
            : "",
        expiry: new Date(duData.expiry).toISOString(),
      });
      setCouponType(currentCouponType);
      setCouponFor(currentCouponFor);
    }
  }, []);

  useEffect(() => {
    if (AllUsers.length) {
      setUsers(AllUsers);
    }
  }, [AllUsers]);

  useEffect(() => {
    const isAvailable = props.Coupons.filter((coupon) => {
      return coupon.couponcode == data.couponcode;
    });
    if (isAvailable.length) {
      setCouponError(true);
    } else {
      setCouponError(false);
    }
  }, [data.couponcode]);

  const onsubmit = (e) => {
    e.preventDefault();
    data.expiry = moment(data.expiry).format("YYYY-MM-DD");
    data.activefrom = moment(data.activefrom).format("YYYY-MM-DD");
    Object.keys(data).map((key) => {
      data[key] =
        typeof data[key] == "string"
          ? data[key].trim() != ""
            ? data[key]
            : null
          : data[key];
    });
    addCoupon(data).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.onSubmitSuccess();
        props.handleClose();
      }
    });
  };

  const changeCouponType = (e) => {
    if (e.currentTarget.value == "Fixed") {
      setData({
        ...data,
        offpercentage: "",
      });
    } else {
      setData({
        ...data,
        subtractfixedamount: "",
      });
    }
    setCouponType(e.currentTarget.value);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        className="edit_profile"
      >
        <Modal.Header closeButton>
          <Modal.Title className="add_card_title">
            {props.isDuplicating ? "Duplicate Coupon" : "Create New Coupon"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="support_body">
          <form onSubmit={onsubmit}>
            <div className="form-group">
              <label>Coupon Code</label>
              <input
                type="text"
                placeholder="Coupon Code"
                className="form-control"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    couponcode: e.currentTarget.value,
                  })
                }
                value={data.couponcode}
              />
              <span>
                {couponError ? `${data.couponcode} is already existed.` : ""}
              </span>
            </div>
            <div className="form-group">
              <label>Coupon Type (Fixed or Percentage)</label>
              <select
                placeholder="Coupon Type"
                className="form-control"
                value={couponType}
                onChange={changeCouponType}
              >
                <option>Fixed</option>
                <option>Percentage</option>
              </select>
            </div>
            {couponType == "Percentage" ? (
              <div className="form-group">
                <label>Coupon Percentage</label>

                <input
                  type="number"
                  placeholder="Coupon Percentage"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setData({
                      ...data,
                      offpercentage: e.currentTarget.value,
                    })
                  }
                  value={data.offpercentage}
                  id="percentage"
                  min="0"
                  max="100"
                  step="0.10"
                />
              </div>
            ) : (
              <div className="form-group">
                <label>Coupon Fixed Amount</label>

                <input
                  type="number"
                  placeholder="Coupon Fixed Amount"
                  className="form-control"
                  id="fixed"
                  required
                  onChange={(e) =>
                    setData({
                      ...data,
                      subtractfixedamount: e.currentTarget.value,
                    })
                  }
                  value={data.subtractfixedamount}
                />
              </div>
            )}
            <div className="form-group">
              <label>Coupon For (Customer or public)</label>
              <select
                placeholder="Coupon Type"
                className="form-control"
                value={couponFor}
                onChange={(e) => setCouponFor(e.currentTarget.value)}
              >
                <option>Public</option>
                <option>Customer</option>
              </select>
            </div>

            {couponFor == "Customer" ? (
              <div className="form-group">
                <select
                  className="form-control"
                  value={data.forcustomeremail}
                  onChange={(e) =>
                    setData({
                      ...data,
                      forcustomeremail: e.currentTarget.value,
                    })
                  }
                >
                  {Users.map((user) => {
                    return (
                      <option value={user.emailAddress}>
                        {user.firstName} {user.lastName} - {user.emailAddress}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              ""
            )}
            <div className="form-group">
              <label>Coupon Active From</label>
              <DatePicker
                id="example-datepicker"
                className="form-control"
                required
                minDate={new Date().toISOString()}
                value={data.activefrom}
                maxDate={data.expiry}
                showClearButton={false}
                placeholder="Coupon Active From"
                onChange={(v, f) =>
                  setData({
                    ...data,
                    activefrom: v,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Coupon Expiry Date</label>
              <DatePicker
                id="example-datepickers"
                className="form-control"
                required
                value={data.expiry}
                minDate={data.activefrom}
                showClearButton={false}
                placeholder="Coupon Expiry Date"
                onChange={(v, f) =>
                  setData({
                    ...data,
                    expiry: v,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Usage limit</label>
              <input
                type="number"
                placeholder="Usage limit"
                className="form-control"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    maxusagecount: e.currentTarget.value,
                  })
                }
                value={data.maxusagecount}
              />
            </div>

            <div className="form-group">
              <label>Usage limit per user</label>
              <input
                type="number"
                placeholder="Usage limit per user"
                className="form-control"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    maxusagecountperuser: e.currentTarget.value,
                  })
                }
                value={data.maxusagecountperuser}
              />
            </div>
            <div className="form-group text-center">
              <button
                className="btn btn-lg"
                type="submit"
                id="formButton"
                disabled={couponError}
              >
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const ViewCoupon = (props) => {
  couponUsageHistory({
    couponCode: props.info.couponcode,
  }).subscribe((res) => {
    console.log(res);
  });

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        className="view_coupon"
      >
        <Modal.Header closeButton>
          <Modal.Title className="add_card_title">
            Coupon: {props.info.couponcode}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="support_body">
          <div className="row">
            <div className="col text-left">Active From:</div>
            <div className="col text-left">{props.info.activefrom}</div>
          </div>
          <div className="row">
            <div className="col text-left">Expiry:</div>
            <div className="col text-left">{props.info.expiry}</div>
          </div>
          <div className="row">
            <div className="col text-left">Usage:</div>
            <div className="col text-left">
              {props.info.usedtimes}/{props.info.maxusagecount}
            </div>
          </div>
          <div className="row">
            <div className="col text-left">Status:</div>
            <div className="col text-left">
              {props.info.isactive ? "Active" : "Unactive"}
            </div>
          </div>

          <div className="row">
            <div className="col text-left">Coupon Type:</div>
            <div className="col text-left">
              {props.info.offpercentage != null ? "Percentage" : "Fixed"}
            </div>
          </div>
          <div className="row">
            <div className="col text-left">Discount:</div>
            <div className="col text-left">
              {props.info.offpercentage != null
                ? `${props.info.offpercentage}%`
                : props.info.subtractfixedamount}
            </div>
          </div>
          <div className="row">
            <div className="col text-left">Coupon For:</div>
            <div className="col text-left">
              {props.info.forcustomeremail != null ? "Customer" : "Public"}
            </div>
          </div>
          {props.info.forcustomeremail != null ? (
            <div className="row">
              <div className="col text-left">Customer:</div>
              <div className="col text-left">{props.info.forcustomeremail}</div>
            </div>
          ) : (
            ""
          )}
          <div className="row mt-3">
            <div className="col text-center">
              <button className="btn" onClick={props.onDplicateClick}>
                Make Duplicate
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const Coupons = () => {
  const [Coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState({});
  const [isDuplicating, setISDuplicating] = useState(false);
  const [AddCouponsShow, setAddCouponsShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleAddCouponsclose = () => {
    setISDuplicating(false);
    setAddCouponsShow(false);
  };
  const handleAddCouponsShow = () => setAddCouponsShow(true);

  const [ViewCouponsShow, setViewCouponsShow] = useState(false);
  const handleViewCouponsclose = () => {
    setViewCouponsShow(false);
  };
  const handleViewCouponsShow = () => setViewCouponsShow(true);

  //Running loader for 2 secs
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getCoupons();
    handleAddCouponsclose();
  }, []);

  const getCoupons = () => {
    getAllCoupon().subscribe((response) => {
      setCoupons(response.response.data);
    });
  };

  const onSubmitSuccess = () => {
    getCoupons();
  };

  const columns = [
    {
      name: "Code",
      selector: "couponcode",
      sortable: false,
      className: "header-col",
    },

    {
      name: "Expiry",
      selector: "expiry",
      sortable: false,
      className: "header-col",
    },
    {
      name: "Usage / Limit",
      selector: "maxusagecount",
      sortable: false,
      className: "header-col",
      format: (d) => `${d.usedtimes}/${d.maxusagecount}`,
    },
    {
      name: "Discount Amount / % ",
      selector: "maxusagecount",
      sortable: false,
      className: "header-col",
      format: (d) => {
        return (
          <>
            {d.offpercentage ? (
              <span>{d.offpercentage}%</span>
            ) : (
              <span>${d.subtractfixedamount}</span>
            )}
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
        <Link to={`/coupons-details/${d.id}`}>
          <img src={viewicon} alt="" />
        </Link>
      ),
    },
  ];

  const onRowClicked = (data) => {
    console.log(data);
    setSelectedCoupon(data);
    // handleViewCouponsShow();
    history.push(`/coupons-details/${data.id}`);
  };

  const onDplicateClick = () => {
    setISDuplicating(true);
    handleViewCouponsclose();
    handleAddCouponsShow();
  };
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
            <div className={"section-head mb-3"}>
              <div className="col">
                <h2>Coupons</h2>
              </div>
              <div className="col text-right">
                <button className="btn" onClick={handleAddCouponsShow}>
                  Create New Coupon
                </button>
              </div>
            </div>

            <DataTable
              className="coupons_table"
              columns={columns}
              data={Coupons}
              responsive={true}
              pagination={true}
              onRowClicked={onRowClicked}
              noDataComponent
            />
          </section>
        </div>
      </div>
      {AddCouponsShow && (
        <AddCoupons
          value={""}
          onSubmitSuccess={onSubmitSuccess}
          show={AddCouponsShow}
          handleClose={handleAddCouponsclose}
          info={selectedCoupon}
          isDuplicating={isDuplicating}
          Coupons={Coupons}
        />
      )}
      {ViewCouponsShow && (
        <ViewCoupon
          value={""}
          onSubmitSuccess={() => {}}
          show={ViewCouponsShow}
          handleClose={handleViewCouponsclose}
          onDplicateClick={onDplicateClick}
          info={selectedCoupon}
          Coupons={Coupons}
        />
      )}
    </>
  );
};

export default withRouter(Coupons);
