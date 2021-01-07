import React, { useEffect, useState, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import moment from "moment";

import Header from "app/components/Header";
import userProfile from "../../../assets/userProfile.svg";
import visa from "../../../assets/visa.png";
import check from "../../../assets/chat.png";
import chat from "../../../assets/checkBig.png";

import loader from "../../../assets/loader.gif";
import mastercard from "../../../assets/mastercard.png";
import AmericanExpress from "../../../assets/American-Express.png";
import discover from "../../../assets/discover.png";
import appConfig from "../../../appconfig.json";
// console.log(stripe);

import {
  CardElement,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "contexts/authContext";
import { AppContext } from "contexts/appContext";
import profile_edit from "../../../assets/profile_edit.svg";
import dragimage from "../../../assets/userProfile.svg";
import { useDropzone } from "react-dropzone";
import queryString from "query-string";
import {
  profileUpdate,
  getPIC,
  getSubscriptionPlans,
  changePassword,
  cancelSubscription,
  subscriptionHistory,
} from "utils/api-routes/api-routes.util";
import history from "../../../utils/history";

import BankCard from "app/components/BankCard";
import Loader from "app/components/Loader";
import { AppAlertsContext } from "contexts/appAlertsContext";
import { EditProfile } from "./_components/EditProfile";
import ReactIsCapsLockActive from "@matsun/reactiscapslockactive";
import TransactionHistory from "./_components/TranscationHistory";
const createOptions = (fontSize: string, padding?: string) => {
  return {
    style: {
      base: {
        color: "#303238",
        fontSize: "16px",
        padding: "10px",
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#CFD7DF",
        },
      },
      invalid: {
        color: "#e5424d",
        ":focus": {
          color: "#303238",
        },
      },
    },
  };
};

const FormElement = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { getMyInfo, myInfo } = useContext(AppContext);
  const { showLoader, hideLoader } = React.useContext(AppAlertsContext);
  const [cardError, setCardError] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    showLoader();

    console.log("PI", props.PI);

    const result = await stripe.confirmCardSetup(props.PI, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: name,
        },
      },
    });

    if (result.error) {
      // Display result.error.message in your UI.
      setCardError(result.error.message);
      hideLoader();
    } else {
      // The setup has succeeded. Display a success message and send
      // result.setupIntent.payment_method to your server to save the
      // card to a Customer
      // hideLoader();
      getMyInfo(true);
      setCardError(false);
      props.handleClose();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.currentTarget.value)}
          required
          placeholder="Name on card"
        />
        <CardElement className="card_element_form"></CardElement>
        {cardError ? (
          <>
            <i className="red">
              <small>{cardError}</small>
            </i>
            <br />
            <br />
          </>
        ) : (
          <> </>
        )}
        <button type="submit" className="btn btn-lg">
          Save
        </button>
      </form>
    </>
  );
};

const AddNewCard = (props) => {
  let stripePromise;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(appConfig.stripe);
    }
    return stripePromise;
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} className="Add_card">
        <Modal.Header closeButton>
          <Modal.Title className="add_card_title">
            Add Payment Option
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="support_body">
          <Elements stripe={getStripe()}>
            <FormElement
              PI={props.PI}
              handleClose={props.handleClose}
            ></FormElement>
          </Elements>
        </Modal.Body>
      </Modal>
    </>
  );
};

const EditPassword = (props) => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirm: "",
    thetoken: localStorage.token,
  });
  const [validPassword, setValidPassword] = React.useState(true);
  const [isCapsOn, setIsCapsOn] = React.useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const confirmPassword = (cp) => {
    setValidPassword(cp == passwords.newPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const stringified = queryString.stringify(passwords);

    changePassword(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.setMessage("Password Updated");
        props.onEditPasswordSuccess();
        handleShowModal();
        setPasswords({
          oldPassword: "",
          newPassword: "",
          confirm: "",
          thetoken: localStorage.token,
        });
        props.handleShow();
      } else {
        setErrorMessage(response.response.Message);
      }
    });
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        className="edit_profile"
      >
        <Modal.Header closeButton>
          <Modal.Title className="add_card_title">Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="support_body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                className={`form-control iscaps_${isCapsOn}`}
                value={passwords.oldPassword}
                required
                onClick={(e) => {
                  const caps_lock_on = e.getModifierState("CapsLock");
                  setIsCapsOn(caps_lock_on);
                }}
                onKeyDown={(e) => {
                  const caps_lock_on = e.getModifierState("CapsLock");
                  setIsCapsOn(caps_lock_on);
                }}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    oldPassword: e.currentTarget.value,
                  })
                }
              />
              {/* {
                isCapsOn && <p>Caps lock on.</p>
              } */}
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                onClick={(e) => {
                  const caps_lock_on = e.getModifierState("CapsLock");
                  setIsCapsOn(caps_lock_on);
                }}
                onKeyDown={(e) => {
                  const caps_lock_on = e.getModifierState("CapsLock");
                  setIsCapsOn(caps_lock_on);
                  console.log(caps_lock_on);
                }}
                type="password"
                className={`form-control iscaps_${isCapsOn}`}
                value={passwords.newPassword}
                required
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    newPassword: e.currentTarget.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                onClick={(e) => {
                  const caps_lock_on = e.getModifierState("CapsLock");
                  setIsCapsOn(caps_lock_on);
                }}
                onKeyDown={(e) => {
                  const caps_lock_on = e.getModifierState("CapsLock");
                  setIsCapsOn(caps_lock_on);
                  console.log(caps_lock_on);
                }}
                type="password"
                className={`form-control iscaps_${isCapsOn}`}
                value={passwords.confirm}
                required
                onChange={(e) => {
                  setPasswords({
                    ...passwords,
                    confirm: e.currentTarget.value,
                  });
                  confirmPassword(e.currentTarget.value);
                }}
              />
              <ReactIsCapsLockActive>
                {(active) => (
                  <i className="red">
                    <span className="password_not_matched">
                      <b>
                        {active ? (
                          <i>
                            Caps Lock is On, having Caps Lock on may cause you
                            to enter your password incorrectly.{" "}
                          </i>
                        ) : (
                          ""
                        )}
                      </b>
                    </span>
                  </i>
                )}
              </ReactIsCapsLockActive>
              {!validPassword ? (
                <span className="password_not_matched">
                  Passwords do not match
                </span>
              ) : (
                ""
              )}

              {errorMessage ? (
                <div>
                  {" "}
                  <i className="red">
                    <span className="password_not_matched">
                      <b>
                        <i>{errorMessage}</i>
                      </b>
                    </span>
                  </i>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="form-group text-center">
              <button
                className="btn"
                type="submit"
                id="formButton"
                disabled={!validPassword || passwords.newPassword.length == 0}
              >
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const Profile = (props) => {
  const {
    getMyInfo,
    myInfo,
    myPlans,
    getMyPlans,
    getHistory,
    histories,
  } = useContext(AppContext);
  const { showLoader, hideLoader } = useContext(AppAlertsContext);

  const [info, setInfo] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [PI, setPI] = useState(false);
  const [plans, setPlans] = useState([]);
  const [filteredPlan, setFilteredPlan] = useState([]);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const pmicons = {
    mastercard: mastercard,
    visa: visa,
    discover: discover,
    amex: AmericanExpress,
  };

  console.log(props);
  useEffect(() => {
    showLoader();
    getMyInfo();
    getMyPlans();
    getHistory();
    if (props.location.state) {
      props.location.state.flag ? setToggleMembership(true) : "";
    }

    setTimeout(() => {
      setSpinner(false);
    }, 2500);
  }, []);

  console.log("MUINFO", myInfo);

  useEffect(() => {}, []);

  const getPI = () => {
    getPIC().subscribe((response) => {
      console.log(response, "REPONSE");
      setPI(response.response.data);
    });
  };

  useEffect(() => {
    if (myInfo) {
      hideLoader();
      setInfo(myInfo);
      if (myPlans) {
        const x = myPlans.filter(
          (plan) => plan.name === myInfo.subscriptionplanname
        );

        setFilteredPlan(x);
      }
    }
  }, [myInfo]);

  console.log("PLANS, ", myInfo.stripeCustomerCard == 0);

  const cancelPlan = () => {
    showLoader();
    cancelSubscription().subscribe((response) => {
      console.log(response);
      getMyInfo();
    });
  };

  console.log(filteredPlan);
  const [addcardpopupshow, setaddcardpopupshow] = useState(false);
  const [editProfileShow, setEditProfileShow] = useState(false);
  const [editPasswordShow, setEditPasswordShow] = useState(false);
  const [toggleMembership, setToggleMembership] = useState(false);

  const handleEditProfileclose = () => setEditProfileShow(false);
  const handleEditProfileShow = () => setEditProfileShow(true);

  const handleEditPasswordclose = () => setEditPasswordShow(false);
  const handleEditPasswordShow = () => setEditPasswordShow(true);

  const { userDetails } = useContext(AuthContext);

  const [userData, setUserData] = useState(userDetails());
  const handlecardclose = () => setaddcardpopupshow(false);
  const handlecardshow = () => {
    getPI();
    setaddcardpopupshow(true);
  };

  useEffect(() => {});

  const onSubmitSuccess = () => {
    getMyInfo();
    handleEditProfileclose();
  };

  const onSubmitPasswordSuccess = () => {
    handleEditPasswordclose();
  };

  const onToggleMembership = () => {
    setToggleMembership(!toggleMembership);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="cancel_subscription">
        <Modal.Header closeButton>
          <Modal.Title>Cancel Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel your subscription? Your subscription
          will be canceled immediately.
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn"
            onClick={() => {
              cancelPlan();

              handleClose();
            }}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="cancel_subscription"
      >
        <Modal.Body style={{ margin: "0 auto" }}>
          <div
            className="d-flex align-items-center justify-content-center mt-3"
            style={{ margin: "0 auto" }}
          >
            {message ? (
              <img src={chat} width="60px" />
            ) : (
              <img src={check} width="60px" />
            )}
          </div>
          {message ? (
            <div className="mt-4">{message}</div>
          ) : (
            <div className="mt-4">Please add a payment method.</div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none", margin: "0 auto" }}>
          <button
            className="btn"
            onClick={() => {
              handleCloseModal();
              setMessage(false);
            }}
            style={{ textDecoration: "none" }}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <Header isFixedColor={true}></Header>
      <div className="other_pages_container">
        <h1 className="title text-center">My Account</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-12 col-xs-12">
              <div className="profile_left_sidebar">
                <div
                  className="edit_profile_icon "
                  onClick={handleEditProfileShow}
                >
                  <img src={profile_edit} alt="" loading="lazy" />
                </div>
                <div className="profile_image">
                  <img
                    src={
                      info.profilePicture ? info.profilePicture : userProfile
                    }
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="profile_name">
                  {info ? info.firstName : ""} {info ? info.lastName : ""}
                </div>
                <div className="profile_email">{info.emailAddress}</div>
                <div className="divider"></div>
                <div className="profile_info">
                  <div className="row">
                    <div className="col">First Name</div>
                    <div className="col text-right">{info.firstName}</div>
                  </div>

                  <div className="row">
                    <div className="col">Last Name</div>
                    <div className="col text-right">{info.lastName}</div>
                  </div>

                  <div className="row">
                    <div className="col">Email</div>
                    <div className="col text-right">{info.emailAddress}</div>
                  </div>

                  <div className="row">
                    <div className="col">Cell</div>
                    <div className="col text-right">{info.phone}</div>
                  </div>
                  {info.subscriptionstatus === "NotActive" ||
                  info.ischildaccount ? (
                    ""
                  ) : (
                    <div className="row">
                      <div className="col">Company</div>
                      <div className="col text-right">{info.companyname}</div>
                    </div>
                  )}
                  <div className="row">
                    <div className="col text-center">
                      <button className="btn" onClick={handleEditPasswordShow}>
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8 col-sm-12 col-xs-12">
              {spinner ? (
                <div
                  style={{ margin: "0 auto", marginTop: "100px" }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <img src={loader} />
                </div>
              ) : (
                <div className="profile_right_section">
                  {info.ischildaccount ? (
                    <div>
                      <h4
                        className="text-left"
                        style={{
                          fontFamily: "Gilroy",
                          fontSize: "16px",
                          fontWeight: "600px",
                        }}
                      >
                        <b>Connected Account</b>
                      </h4>
                      <hr />
                      <div className="row mt-4">
                        <div className="col-lg-4 col-xs-12 mb-3">
                          <h4
                            className="faded text-left"
                            style={{
                              fontFamily: "Gilroy",
                              fontSize: "16px",
                              fontWeight: "600px",
                            }}
                          >
                            <b>Company</b>
                          </h4>
                          <h4
                            className="text-left"
                            style={{
                              fontFamily: "Gilroy",
                              fontSize: "16px",
                              fontWeight: "600px",
                            }}
                          >
                            <b>{info.companyname}</b>
                          </h4>
                        </div>
                        <div
                          className="col-lg-4 col-xs-12 mb-3 "
                          style={{ marginRight: "0px" }}
                        >
                          <h4
                            className="faded text-left"
                            style={{
                              fontFamily: "Gilroy",
                              fontSize: "16px",
                              fontWeight: "600px",
                            }}
                          >
                            <b>Company Email</b>
                          </h4>
                          <h4
                            className="text-left"
                            style={{
                              fontFamily: "Gilroy",
                              fontSize: "16px",
                              fontWeight: "600px",
                            }}
                          >
                            <b>{info.companyemail}</b>
                          </h4>
                        </div>
                        <div className="col-lg-4  col-xs-12 mb-3 text-left">
                          <h4
                            className="faded "
                            style={{
                              fontFamily: "Gilroy",
                              fontSize: "16px",
                              fontWeight: "600px",
                            }}
                          >
                            <b>Subscription Status</b>
                          </h4>
                          <h4
                            className=""
                            style={{
                              fontFamily: "Gilroy",
                              fontSize: "16px",
                              fontWeight: "600px",
                            }}
                          >
                            <b>{info.subscriptionstatus}</b>
                          </h4>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="row align-items-center">
                        <div
                          className="col-lg-4  col-xs-6  "
                          onClick={onToggleMembership}
                        >
                          <div
                            className={
                              !toggleMembership
                                ? "profile_title green"
                                : "profile_title faded"
                            }
                            style={{ cursor: "pointer" }}
                          >
                            Payment Options{" "}
                          </div>
                        </div>{" "}
                        <div className="col-lg-8 ">
                          <div className="row align-items-center">
                            <div
                              className={
                                !toggleMembership
                                  ? "profile_title faded col-lg-8"
                                  : "profile_title green col-lg-8"
                              }
                              onClick={onToggleMembership}
                              style={{ cursor: "pointer" }}
                            >
                              Membership{" "}
                            </div>
                            <div className="text-right col-lg-4 ">
                              {toggleMembership ? (
                                <Link
                                  className={
                                    info.subscriptionstatus === "Active"
                                      ? "btn"
                                      : "btn disabled"
                                  }
                                  to="/manage_users"
                                >
                                  Manage Users
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="divider"></div>
                      <Loader></Loader>
                      {!toggleMembership ? (
                        <div className="cards">
                          {info && info.stripeCustomerCard.length > 0 ? (
                            info.stripeCustomerCard.map((card, index) => {
                              return <BankCard card={card} />;
                            })
                          ) : (
                            <div className="text-left">
                              <b>No Payment method found! </b>
                            </div>
                          )}
                          <div className="divider"></div>
                          <div className="col text-left">
                            <button className="btn" onClick={handlecardshow}>
                              ADD
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {(filteredPlan.length &&
                            filteredPlan.length > 0 &&
                            info.subscriptionstatus === "Active") ||
                          info.subscriptionstatus === "Cancelled" ||
                          info.subscriptionstatus ===
                            "PausedDueToPaymentFailure" ? (
                            <div className="packages">
                              <div className="row align-items-center">
                                <div className="col-lg-8 col-xs-12 text-left d-flex align-items-center">
                                  <span
                                    className="h3"
                                    style={{
                                      fontStyle: "bold",
                                      paddingRight: "5px",
                                    }}
                                  >
                                    {filteredPlan[0].name}
                                  </span>
                                  {info.subscriptionstatus === "Cancelled" ? (
                                    <Badge className="cancelled_badge">
                                      <p>Cancelled</p>
                                    </Badge>
                                  ) : info.subscriptionstatus === "Active" ? (
                                    <Badge className="active_badge">
                                      <p>Active</p>
                                    </Badge>
                                  ) : info.subscriptionstatus ===
                                    "PausedDueToPaymentFailure" ? (
                                    <Badge className="paused_badge">
                                      <p>Paused</p>
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="col-lg-4 col-xs-12 text-right d-flex align-items-center justify-content-end">
                                  <h3> ${filteredPlan[0].price}</h3>
                                  <span className="interval">
                                    /{filteredPlan[0].intervalUnit}
                                  </span>
                                </div>
                              </div>
                              <div className="row">
                                <div
                                  className="col-lg-8 d-flex"
                                  style={{ paddingLeft: "0" }}
                                >
                                  <div className="col-lg-6 text-left d-flex flex-column mt-2 justify-content-end">
                                    <p
                                      style={{ marginBottom: "0" }}
                                      className="faded"
                                    >
                                      Subscription Date
                                    </p>

                                    <p
                                      style={{
                                        marginBottom: "0",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {moment(histories[0].createdAt).format(
                                        "MMM DD - YYYY"
                                      )}
                                    </p>
                                  </div>
                                  <div className="col-lg-6 text-left d-flex flex-column mt-2 justify-content-end">
                                    <p
                                      style={{ marginBottom: "0" }}
                                      className="faded"
                                    >
                                      Next Billing Date
                                    </p>
                                    {info.subscriptionstatus === "Active" ? (
                                      <p
                                        style={{
                                          marginBottom: "0",
                                          fontWeight: "600",
                                        }}
                                      >
                                        {moment(
                                          histories[0].nextbillingdate
                                        ).format("MMM DD - YYYY")}
                                      </p>
                                    ) : (
                                      <p
                                        style={{
                                          marginBottom: "0",
                                          fontWeight: "600",
                                        }}
                                      >
                                        NA
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-4 d-flex mt-2 align-items-end justify-content-end">
                                  {info.subscriptionstatus === "Active" ? (
                                    <button
                                      className="btn"
                                      onClick={handleShow}
                                    >
                                      <Loader text="Cancel Subscription"></Loader>
                                    </button>
                                  ) : (
                                    <button
                                      className="btn"
                                      onClick={() => {
                                        myInfo.stripeCustomerCard == 0
                                          ? handleShowModal()
                                          : history.push(
                                              `/subscriptioncheckout/${filteredPlan[0].name}`
                                            );
                                      }}
                                    >
                                      Renew Subscription
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : myPlans.length && myPlans.length > 0 ? (
                            myPlans.map((plan) => (
                              <div className="packages">
                                <div className="row align-items-center">
                                  <div className="col-lg-8 col-xs-12 text-left d-flex align-items-center">
                                    <span
                                      className="h3"
                                      style={{
                                        fontStyle: "bold",
                                        paddingRight: "5px",
                                      }}
                                    >
                                      {plan.name}
                                    </span>

                                    <Badge className="pause_badge">
                                      <p>Inactive</p>
                                    </Badge>
                                  </div>
                                  <div className="col-lg-4 col-xs-12 text-right d-flex align-items-center justify-content-end">
                                    <h3> ${plan.price}</h3>
                                    <span className="interval">
                                      /{plan.intervalUnit}
                                    </span>
                                  </div>
                                </div>
                                <div className="d-flex flex-column mt-2 align-items-end justify-content-end">
                                  <div>
                                    <button
                                      className="btn"
                                      onClick={() => {
                                        myInfo.stripeCustomerCard == 0
                                          ? handleShowModal()
                                          : history.push(
                                              `/subscriptioncheckout/${plan.name}`
                                            );
                                      }}
                                    >
                                      Buy Subscription
                                    </button>
                                    <Link to="/#Contact-US">
                                      <p className="mt-2 text-center demo">
                                        Request demo
                                      </p>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            ""
                          )}
                          {info.subscriptionstatus === "NotActive" ? (
                            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. The pricing down by 57%"
                          ) : (
                            <div className="row mt-4">
                              <div className="col-lg-12">
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
                                  <div className="payment_section_body transaction_history">
                                    <TransactionHistory />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12">
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
                                    {info &&
                                      info.stripeCustomerCard.map((card) => {
                                        if (card.isDefault) {
                                          return <BankCard card={card} />;
                                        }
                                      })}
                                    <hr />
                                    <div className="row'">
                                      <div
                                        className="col text-right"
                                        onClick={onToggleMembership}
                                      >
                                        <Link className="btn mb-2">
                                          Manage Payments
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AddNewCard
        value={""}
        onChange={() => {}}
        onStackSubmit={() => {}}
        show={addcardpopupshow}
        PI={PI}
        handleClose={handlecardclose}
      />

      {editProfileShow && (
        <EditProfile
          value={""}
          onSubmitSuccess={onSubmitSuccess}
          show={editProfileShow}
          handleClose={handleEditProfileclose}
          info={info}
        />
      )}
      {console.log("Profile", info)}
      {editPasswordShow && (
        <EditPassword
          value={""}
          onEditPasswordSuccess={onSubmitPasswordSuccess}
          setMessage={setMessage}
          handleShow={handleShowModal}
          show={editPasswordShow}
          handleClose={handleEditPasswordclose}
          info={info}
        />
      )}
    </>
  );
};

export default withRouter(Profile);
