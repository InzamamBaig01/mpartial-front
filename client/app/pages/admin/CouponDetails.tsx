import { withRouter, Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import {
  getAllCoupon,
  couponUsageHistory,
  addCoupon,
  editCoupon,
  deleteCoupon,
} from "utils/api-routes/api-routes.util";
import ADHeader from "app/components/ADHeader";
import AdminSidebar from "./_components/AdminSidebar";
import viewicon from "../../../assets/view.svg";
import Coupons from "./Coupons";
import { AppContext } from "contexts/appContext";
import moment from "moment";
import { Modal, ButtonGroup, Button } from "react-bootstrap";
import DatePicker from "reactstrap-date-picker";
import history from "../../../utils/history";
import Switch from "react-switch";

const AddCoupons = (props) => {
  const [data, setData] = useState({
    couponcode: "",
    activefrom: new Date().toISOString(),
    maxusagecount: "",
    offpercentage: "",
    subtractfixedamount: "",
    forcustomeremail: "",
    maxusagecountperuser: "",
    expiry: new Date().toISOString(),
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
                minDate={new Date().toISOString()}
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

const CouponDetails = (props) => {
  const couponid = props.match.params.couponid;
  const [coupon, setCoupon] = useState({});
  const [coupons, setCoupons] = useState([]);
  const [couponHistory, setCouponHistory] = useState([]);
  const [duplicateCouponStatus, setduplicateCouponStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicating, setISDuplicating] = useState(false);
  const [AddCouponsShow, setAddCouponsShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddCouponsclose = () => {
    setISDuplicating(false);
    setAddCouponsShow(false);
  };
  const handleAddCouponsShow = () => setAddCouponsShow(true);

  const onChangeActive = (d, isActive) => {
    editCoupon({
      couponId: d.id,
      isCouponActive: isActive,
    }).subscribe((response) => {
      getCouponDetail();
    });
  };

  const getCouponDetail = () => {
    getAllCoupon().subscribe((response) => {
      const couponsOP = response.response.data;
      setCoupons(couponsOP);
      const filtered = couponsOP.filter((c) => {
        return c.id == couponid;
      });
      setCoupon(filtered.length ? filtered[0] : {});
    });
  };

  //Running loader for 2 secs
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getCouponDetail();
  }, []);

  useEffect(() => {
    if (Object.keys(coupon).length) {
      console.log(coupon);
      couponUsageHistory({
        couponId: coupon.id,
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
      history.push("/coupons");
    }, 1000);
  };

  const deleteCouponOP = () => {
    deleteCoupon({ id: coupon.id }).subscribe((res) => {
      setduplicateCouponStatus(`Coupon has been deleted.`);
      setTimeout(() => {
        history.push("/coupons");
      }, 1000);
    });
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
            <div className={"section-head mb-3 row"}>
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
                  <button className="btn" onClick={() => setIsDeleting(true)}>
                    Delete Coupon
                  </button>
                )}
              </div>
            </div>
            <div className="">
              <div className="row">
                <div className="col text-left">Active From:</div>
                <div className="col text-left">{coupon.activefrom}</div>
              </div>
              <div className="row">
                <div className="col text-left">Expiry:</div>
                <div className="col text-left">{coupon.expiry}</div>
              </div>
              <div className="row">
                <div className="col text-left">Usage:</div>
                <div className="col text-left">
                  {coupon.usedtimes}/{coupon.maxusagecount}
                </div>
              </div>
              <div className="row">
                <div className="col text-left">User limit per coupon:</div>
                <div className="col text-left">
                  {coupon.maxusagecountperuser}
                </div>
              </div>
              <div className="row">
                <div className="col text-left">Coupon Type:</div>
                <div className="col text-left">
                  {coupon.offpercentage != null ? "Percentage" : "Fixed"}
                </div>
              </div>
              <div className="row">
                <div className="col text-left">Discount:</div>
                <div className="col text-left">
                  {coupon.offpercentage != null
                    ? `${coupon.offpercentage}%`
                    : coupon.subtractfixedamount}
                </div>
              </div>
              <div className="row">
                <div className="col text-left">Coupon For:</div>
                <div className="col text-left">
                  {coupon.forcustomeremail != null ? "Customer" : "Public"}
                </div>
              </div>

              {coupon.forcustomeremail != null ? (
                <div className="row">
                  <div className="col text-left">Customer:</div>
                  <div className="col text-left">{coupon.forcustomeremail}</div>
                </div>
              ) : (
                ""
              )}
              <div className="row">
                <div className="col text-left">Status:</div>
                <div className="col text-left">
                  {/* {coupon.isactive ? "Active" : "Unactive"} */}
                  {/* <br /> */}
                  <Switch
                    onChange={(isActive) => onChangeActive(coupon, isActive)}
                    checked={coupon.isactive}
                    checkedIcon={false}
                    uncheckedIcon={false}
                  />
                </div>
              </div>

              <div className="row  mt-3">
                <div className="col text-left">
                  <h2>Coupon History</h2>
                </div>
              </div>
              <div className="row">
                <div className="col text-left">
                  <table className="table">
                    {couponHistory.length ? (
                      couponHistory.map((history) => {
                        return (
                          <tr>
                            <td>
                              <strong>Customer :</strong>{" "}
                              {history.customeremail}{" "}
                            </td>
                            <td>
                              <strong>Order :</strong> {history.orderId}{" "}
                            </td>
                            <td>
                              <Link to={`/details/${history.orderId}`}>
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
          </section>
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

export default withRouter(CouponDetails);
