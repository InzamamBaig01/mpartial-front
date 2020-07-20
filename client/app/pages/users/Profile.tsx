import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";
import userProfile from "../../../assets/userProfile.svg";
import visa from "../../../assets/visa.png";
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
import { loadStripe } from "@stripe/stripe-js";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { AuthContext } from "contexts/authContext";
import { AppContext } from "contexts/appContext";
import profile_edit from "../../../assets/profile_edit.svg";
import dragimage from "../../../assets/userProfile.svg";
import { useDropzone } from "react-dropzone";
import queryString from "query-string";
import {
  profileUpdate,
  getPIC,
} from "utils/api-routes/api-routes.util";
import BankCard from "app/components/BankCard";
import Loader from "app/components/Loader";
import { AppAlertsContext } from "contexts/appAlertsContext";
import { EditProfile } from './_components/EditProfile'
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
          <Loader text="Save"></Loader>
        </button>
      </form>
    </>
  );
};

const AddNewCard = (props) => {
  const stripePromise = loadStripe(appConfig.stripe);

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} className="Add_card">
        <Modal.Header closeButton>
          <Modal.Title className="add_card_title">
            Add Payment Option
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="support_body">
          <Elements stripe={stripePromise}>
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

  const confirmPassword = (cp) => {
    setValidPassword(cp == passwords.newPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const stringified = queryString.stringify(passwords);

    changePassword(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.onEditPasswordSuccess();
        setPasswords({
          oldPassword: "",
          newPassword: "",
          confirm: "",
          thetoken: localStorage.token,
        });
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
              <label>New Confirm Password</label>
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
              {!validPassword ? (
                <span className="password_not_matched">
                  Passwords does not match
                </span>
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

const Profile = () => {
  const { getMyInfo, myInfo } = useContext(AppContext);
  const { showLoader, hideLoader } = useContext(AppAlertsContext);

  const [info, setInfo] = useState(false);
  const [PI, setPI] = useState(false);
  const pmicons = {
    mastercard: mastercard,
    visa: visa,
    discover: discover,
    "american express": AmericanExpress,
  };
  useEffect(() => {
    showLoader();
    getMyInfo();
  }, []);

  const getPI = () => {
    getPIC().subscribe((response) => {
      setPI(response.response.Message);
    });
  };

  useEffect(() => {
    if (myInfo) {
      hideLoader();
      setInfo(myInfo);
    }
  }, [myInfo]);

  const [addcardpopupshow, setaddcardpopupshow] = useState(false);
  const [editProfileShow, setEditProfileShow] = useState(false);
  const [editPasswordShow, setEditPasswordShow] = useState(false);

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

  const stripePromise = loadStripe("pk_test_BVYHeMmpLalkw9ro9W2IkTFJ");

  const onSubmitSuccess = () => {
    getMyInfo();
    handleEditProfileclose();
  };

  const onSubmitPasswordSuccess = () => {
    handleEditPasswordclose();
  };

  return (
    <>
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
                  <img src={profile_edit} alt="" />
                </div>
                <div className="profile_image">
                  <img
                    src={
                      info.profilePicture ? info.profilePicture : userProfile
                    }
                    alt=""
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
              <div className="profile_right_section">
                <div className="row">
                  <div className="col">
                    <div className="profile_title">Payment Options</div>
                  </div>
                  <div className="col text-right">
                    <button className="btn" onClick={handlecardshow}>
                      ADD
                    </button>
                  </div>
                </div>
                <div className="divider"></div>
                <Loader></Loader>
                <div className="cards">
                
                  {info
                    ? info.stripeCustomerCard.map((card, index) => {
                        return (
                          // <tr>
                          //   <td key={index}><img src={pmicons[card.brand]} className="brand_icon" alt="" /></td>
                          //   <td>XXXX XXXX XXXX {card.last4}</td>
                          //   <td>
                          //     {card.exp_month}/{card.exp_year}
                          //   </td>
                          //   {/* <td>
                          //         <i>a</i>
                          //         <i>b</i>
                          //       </td> */}
                          // </tr>
                          <BankCard card={card} />
                        );
                      })
                    : ""}
                </div>
              </div>
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

      {editPasswordShow && (
        <EditPassword
          value={""}
          onEditPasswordSuccess={onSubmitPasswordSuccess}
          show={editPasswordShow}
          handleClose={handleEditPasswordclose}
          info={info}
        />
      )}
    </>
  );
};

export default withRouter(Profile);
