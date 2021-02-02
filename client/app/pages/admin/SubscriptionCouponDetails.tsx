import { withRouter, Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import {
  getAllSubscriptionCoupon,
  couponUsageHistory,
  addSubscriptionCoupon,
  editCoupon,
  deleteCoupon,
} from "utils/api-routes/api-routes.util";
import ADHeader from "app/components/ADHeader";
import AdminSidebar from "./_components/AdminSidebar";
import viewicon from "../../../assets/view.svg";
import { AppContext } from "contexts/appContext";
import moment from "moment";
import { Modal, ButtonGroup, Button } from "react-bootstrap";
import DatePicker from "reactstrap-date-picker";
import history from "../../../utils/history";
import Switch from "react-switch";

const AddCoupons = (props) => {
  const [data, setData] = useState<ICoupon>({
    couponcode: "",
    activefrom: new Date().toISOString(),
    usagelimit: "",
    description: "",
    duration: "",
    discountpercentage: "",
    usagelimitpercustomer: "",
    expirydate: new Date(
      moment().add("day", 1).format("YYYY-MM-DD")
    ).toISOString(),
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

      setData({
        couponcode: "",
        activefrom: new Date(duData.activefrom).toISOString(),
        usagelimit: duData.usagelimit,
        duration: duData.duration,
        discountpercentage: duData.discountpercentage,
        description: duData.description,
        usagelimitpercustomer: duData.usagelimitpercustomer,
        expirydate: new Date(duData.expirydate).toISOString(),
      });
      //   setCouponType(currentCouponType);
      //   setCouponFor(currentCouponFor);
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
    addSubscriptionCoupon(data).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.onSubmitSuccess(data.couponcode);
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
              <label>Coupon Active From</label>
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
              <label>Coupon Expiration Date</label>
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
              <label>Usage limit</label>
              <input
                type="number"
                placeholder="Usage limit"
                className="form-control"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    usagelimit: e.currentTarget.value,
                  })
                }
                value={data.usagelimit}
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
                    usagelimitpercustomer: e.currentTarget.value,
                  })
                }
                value={data.usagelimitpercustomer}
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

const SubscriptionCouponDetails = (props) => {
  const couponid = props.match.params.couponid;
  const [coupon, setCoupon] = useState({});
  const [coupons, setCoupons] = useState([]);
  const [couponHistory, setCouponHistory] = useState([]);
  const [duplicateCouponStatus, setduplicateCouponStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicating, setISDuplicating] = useState(false);
  const [AddCouponsShow, setAddCouponsShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleAddCouponsclose = () => {
    setISDuplicating(false);
    setAddCouponsShow(false);
  };
  const handleAddCouponsShow = () => setAddCouponsShow(true);

  const onChangeActive = (d, isActive) => {
    editCoupon({
      couponId: d.id,
      isSubscriptionCoupon: true,
      isCouponActive: isActive,
    }).subscribe((response) => {
      getCouponDetail();
    });
  };

  //Running loader for 2 secs
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  const getCouponDetail = () => {
    getAllSubscriptionCoupon().subscribe((response) => {
      const couponsOP = response.response.data;
      console.log("man", couponsOP);
      setCoupons(couponsOP);
      const filtered = couponsOP.filter((c) => {
        return c.id == couponid;
      });
      setCoupon(filtered.length ? filtered[0] : {});
    });
  };

  useEffect(() => {
    getCouponDetail();
  }, []);

  useEffect(() => {
    if (Object.keys(coupon).length) {
      console.log(coupon);
      couponUsageHistory({
        couponId: coupon.id,
        isSubscriptionCoupon: true,
      }).subscribe((response) => {
        setCouponHistory(response.response.data);
      });
    }
  }, [coupon]);

  const onDplicateClick = () => {
    setISDuplicating(true);
    handleAddCouponsShow();
  };

  const onSubmitSuccess = (code) => {
    setduplicateCouponStatus(`Coupon ${code} has been created.`);
    setTimeout(() => {
      history.push("/subscription_coupons");
    }, 1000);
  };

  const deleteCouponOP = () => {
    deleteCoupon({ id: coupon.id, isSubscriptionCoupon: true }).subscribe(
      (res) => {
        setduplicateCouponStatus(`Coupon has been deleted.`);
        setTimeout(() => {
          history.push("/subscription_coupons");
        }, 1000);
      }
    );
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
                marginleft: "-50px",
                margintop: "-50px",
              }}
            />
          ) : (
            <section>
              <div className={"section-head"}>
                <div>
                  <h2>Subscription Coupon Details</h2>
                </div>
                <div>
                  <div className="text-right"></div>
                </div>
              </div>
              <div className="order_details">
                <div className={"order_details_header"}>
                  <div className="row">
                    <div className="col-4">
                      <h2>Coupon: {coupon.couponcode}</h2>
                    </div>
                    <div className="col-8 text-right">
                      <button className="btn" onClick={onDplicateClick}>
                        Make Duplicate
                      </button>{" "}
                      &nbsp;
                      {isDeleting ? (
                        <ButtonGroup aria-label="Basic example">
                          <span className="btn btn-secondary disabled">
                            Are you Sure?
                          </span>
                          <Button variant="secondary" onClick={deleteCouponOP}>
                            Yes
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => setIsDeleting(false)}
                          >
                            No
                          </Button>
                        </ButtonGroup>
                      ) : (
                        <button
                          className="btn"
                          onClick={() => setIsDeleting(true)}
                        >
                          Delete Coupon
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" order_details_info">
                  <div className="row">
                    <div className="col text-left">
                      <b>Active From:</b>
                    </div>
                    <div className="col text-left">
                      {moment(coupon.activefrom).format("MMM Do, YYYY")}
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col text-left mt-3">
                      <b>Expiry:</b>
                    </div>
                    <div className="col text-left mt-3">
                      {moment(coupon.expirydate).format("MMM Do, YYYY")}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-left mt-3">
                      <b>Usage Limit:</b>
                    </div>
                    <div className="col text-left mt-3">
                      {coupon.usagelimit}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-left mt-3">
                      <b> User limit per customer: </b>
                    </div>
                    <div className="col text-left mt-3">
                      {coupon.usagelimitpercustomer}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col text-left mt-3">
                      <b>Discount:</b>
                    </div>
                    <div className="col text-left mt-3">
                      {coupon.discountpercentage}%
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-left mt-3">
                      <b>Duration</b>
                    </div>
                    <div className="col text-left mt-3">
                      {coupon.duration} Month(s)
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-left mt-3">
                      <b>Status:</b>
                    </div>
                    <div className="col text-left mt-3">
                      {/* {coupon.isactive ? "Active" : "Unactive"} */}
                      {/* <br /> */}
                      <Switch
                        onChange={(isActive) =>
                          onChangeActive(coupon, isActive)
                        }
                        checked={coupon.isactive}
                        checkedIcon={false}
                        uncheckedIcon={false}
                      />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col text-left mt-3">
                      <b>Description</b>
                    </div>
                    <div className="col text-left mt-3">
                      {coupon.description}
                    </div>
                  </div>

                  <div className="row  mt-4 pt-4">
                    <div className="col text-left">
                      <h2>Coupon History</h2>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col text-left">
                      <table className="table">
                        {couponHistory.length ? (
                          couponHistory.map((history) => {
                            return (
                              <tr>
                                <td>
                                  <strong>Customer :</strong> {history}{" "}
                                </td>

                                <td>
                                  <Link
                                    to={`/usersdetails/${window.btoa(history)}`}
                                  >
                                    <img src={viewicon} alt="" />
                                  </Link>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td>No History available.</td>
                          </tr>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
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
          info={coupon}
          isDuplicating={isDuplicating}
          Coupons={coupons}
        />
      )}
      {duplicateCouponStatus ? (
        <div className="not_verified">
          <div className="error_msg">
            <div
              className="close_verification_popup"
              onClick={() => {
                setduplicateCouponStatus(false);
              }}
            >
              &times;
            </div>
            {duplicateCouponStatus}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default withRouter(SubscriptionCouponDetails);
