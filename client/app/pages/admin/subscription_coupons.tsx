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
  addSubscriptionCoupon,
  getAllSubscriptionCoupon,
  editCoupon,
  couponUsageHistory,
} from "utils/api-routes/api-routes.util";
import { data } from "jquery";
import moment from "moment";

interface ICoupon {
  couponcode: undefined | String | Number;
  activefrom: undefined | String | Number;
  noofcustomers: undefined | String | Number;
  duration: undefined | String | Number;
  discountpercentage: undefined | String | Number;
  description: undefined | String | Number;
  forcustomeremail: undefined | String | Number;
  usagelimitpercustomer: undefined | String | Number;
  expirydate: undefined | String | Number;
}

const AddCoupons = (props) => {
  const [data, setData] = useState<ICoupon>({
    couponcode: "",
    activefrom: new Date().toISOString(),
    noofcustomers: "",
    duration: "",
    description: "",
    discountpercentage: "",
    usagelimitpercustomer: "",
    expirydate: new Date(
      moment().add("day", 1).format("YYYY-MM-DD")
    ).toISOString(),
  });
  const { getallADUsers, AllUsers } = useContext(AppContext);
  const [error, setError] = useState(false);
  const [Users, setUsers] = useState([]);
  const [couponError, setCouponError] = useState(false);

  useEffect(() => {
    getallADUsers();

    if (props.isDuplicating) {
      const duData = props.info;
      setData({
        couponcode: "",
        activefrom: new Date().toISOString(),
        noofcustomers: "",
        description: "",
        duration: "",
        discountpercentage: "",
        usagelimitpercustomer: "",
        expirydate: new Date(
          moment().add("day", 1).format("YYYY-MM-DD")
        ).toISOString(),
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
      if (!coupon.archived) {
        return coupon.couponcode == data.couponcode;
      } else {
        return "";
      }
    });
    if (isAvailable.length) {
      setCouponError(true);
    } else {
      setCouponError(false);
    }
  }, [data.couponcode]);

  const onsubmit = (e) => {
    e.preventDefault();
    data.expirydate = moment(data.expirydate).format("YYYY-MM-DD");
    data.activefrom = moment(data.activefrom).format("YYYY-MM-DD");
    Object.keys(data).map((key) => {
      data[key] =
        typeof data[key] == "string"
          ? data[key].trim() != ""
            ? data[key]
            : null
          : data[key];
    });
    addSubscriptionCoupon(data).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.onSubmitSuccess();
        props.handleClose();
      } else {
        setError(response.response.Message);
      }
    });
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
              <span style={{ color: "red", fontWeight: "800" }}>
                {couponError ? `${data.couponcode} already exists.` : ""}
              </span>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                type="text"
                placeholder="Coupon Description"
                className="form-control"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    description: e.currentTarget.value,
                  })
                }
                value={data.description}
                style={{ resize: "none" }}
              />
            </div>

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
                    discountpercentage: e.currentTarget.value,
                  })
                }
                value={data.discountpercentage}
                id="percentage"
                min="0"
                max="100"
                step="0.10"
              />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                placeholder="Coupon Description"
                className="form-control"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    duration: e.currentTarget.value,
                  })
                }
                value={data.duration}
              />
            </div>

            <div className="form-group">
              <label>Application Active</label>
              <DatePicker
                id="example-datepicker"
                className="form-control"
                required
                minDate={new Date().toISOString()}
                value={data.activefrom}
                maxDate={data.expirydate}
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
              <label>Application Expiration</label>
              <DatePicker
                id="example-datepickers"
                className="form-control"
                required
                value={data.expirydate}
                minDate={data.activefrom}
                showClearButton={false}
                placeholder="Coupon Expiration Date"
                onChange={(v, f) =>
                  setData({
                    ...data,
                    expirydate: v,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Number of Customers</label>
              <input
                type="number"
                placeholder="Usage limit"
                className="form-control"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    noofcustomers: e.currentTarget.value,
                  })
                }
                value={data.noofcustomers}
              />
            </div>

            <div className="form-group">
              <label>Application limit per user</label>
              <input
                type="number"
                placeholder="Usage limit per user"
                className="form-control"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    usagelimitpercustomer: e.currentTarget.value,
                  })
                }
                value={data.usagelimitpercustomer}
              />
            </div>
            <span className="mb-3" style={{ color: "red", fontWeight: "800" }}>
              {error ? error : ""}
            </span>
            <div className="form-group text-center">
              <button
                className="btn btn-lg mt-4"
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

const SubscriptionCoupons = () => {
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

  //Loader for 2 secs

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    getCoupons();
    handleAddCouponsclose();
  }, []);

  const getCoupons = () => {
    getAllSubscriptionCoupon().subscribe((response) => {
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
      name: "Application Expiry",
      selector: "expirydate",
      sortable: false,
      className: "header-col",
      format: (d) => {
        return moment(d.expirydate).format("MMM Do, YYYY");
      },
    },
    {
      name: "Used/Total Customers",
      selector: "noofcustomers",
      sortable: false,
      className: "header-col",
      format: (d) => `${d.countofdistinctusers}/${d.noofcustomers}`,
    },

    {
      name: "Discount % ",
      selector: "discountpercentage",
      sortable: false,
      className: "header-col",
      format: (d) => {
        return (
          <>
            <span>{d.discountpercentage}%</span>
          </>
        );
      },
    },
    {
      name: "Duration",
      selector: "duration",
      sortable: false,
      className: "header-col",
      format: (d) => {
        return (
          <>
            <span>{d.duration} month(s)</span>
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
        <Link to={`/subscription-coupons-details/${d.id}`}>
          <img src={viewicon} alt="" />
        </Link>
      ),
    },
  ];

  // const onRowClicked = (data) => {
  //   console.log(data);
  //   setSelectedCoupon(data);
  //   // handleViewCouponsShow();
  //   history.push(`/coupons-details/${data.id}`);
  // };

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
                // onRowClicked={onRowClicked}
                noDataComponent
              />
            </section>
          )}
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

export default withRouter(SubscriptionCoupons);
