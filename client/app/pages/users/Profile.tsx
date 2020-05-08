import React, { useEffect, useState, useContext, useCallback } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";
import userProfile from "../../../assets/userProfile.svg";
import visa from "../../../assets/visa.png";
import mastercard from "../../../assets/mastercard.png";
import AmericanExpress from "../../../assets/American-Express.png";
import discover from "../../../assets/discover.png";
// import stripe from "stripe";
import InputMask from "react-input-mask";
import appConfig from '../../../appconfig.json';
// console.log(stripe);

import {
  CardElement,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
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
  changePassword,
} from "utils/api-routes/api-routes.util";

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

const FormElement = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { getMyInfo, myInfo } = useContext(AppContext);

  const [name, setName] = useState("");


  const handleSubmit = (ev) => {
    ev.preventDefault();

    const card = elements.getElement(CardElement);

    stripe
      .createPaymentMethod({
        type: "card",
        card: card,
        billing_details: {
          name: name,
        },
      })
      .then(function (result) {
        console.log(result);
        if (result.paymentMethod) {
          getMyInfo();
        }
        // Handle result.error or result.paymentMethod
      });
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
        <button type="submit" className="btn btn-lg">
          Save
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
            <FormElement></FormElement>
          </Elements>
        </Modal.Body>
      </Modal>
    </>
  );
};

const EditProfile = (props) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phonenumber: "",
    role: "",
    thetoken: localStorage.token,
  });

  const [profileImage, setProfileImage] = useState({
    profilepicture: false,
    profileImage: false,
  });

  const [profileImageError, setProfileImageError] = useState(false)
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files

    var sFileName = acceptedFiles[0].name;
    var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
    var iFileSize = acceptedFiles[0].size;
    var iConvert = (acceptedFiles[0].size / 1048576).toFixed(2);

    /// OR together the accepted extensions and NOT it. Then OR the size cond.
    /// It's easier to see this way, but just a suggestion - no requirement.
    if (!(sFileExtension === "jpg" ||
      sFileExtension === "jpeg")) { /// 10 mb
      setProfileImageError('ext');
    } else if (iFileSize > 5485760) {
      setProfileImageError('size');
    } else {
      setProfileImageError(false);

      setProfileImage({
        profilepicture: acceptedFiles[0],
        profileImage: URL.createObjectURL(acceptedFiles[0]),
      });
    }

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    setData({
      firstName: props.info.firstName,
      lastName: props.info.lastName,
      phonenumber: props.info.phone,
      role: props.info.role,
      profilepicture: false,
      profileImage: false,
      thetoken: localStorage.token,
    });
  }, [props.info]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const compObj = {
      first_name: data['firstName'],
      last_name: data['lastName'],
      phone: data['phonenumber'],
    };
    const comObj2 = {
      first_name: props.info.firstName,
      last_name: props.info.lastName,
      phone: props.info.phone,
    };

    const stringified = queryString.stringify(data);

    formData.append("profilepicture", profileImage.profilepicture);
    profileUpdate(formData, stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.onSubmitSuccess();
        setProfileImage({
          profilepicture: false,
          profileImage: false,
        });
      }
    });
  };
  const validateChange = () => {
    return data.firstName == props.info.firstName &&
      data.lastName == props.info.lastName &&
      data.phonenumber == props.info.phone &&
      profileImage.profilepicture == false;
  }
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        className="edit_profile"
      >
        <Modal.Header closeButton>
          <Modal.Title className="add_card_title">Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="support_body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.firstName}
                    required
                    onChange={(e) =>
                      setData({
                        ...data,
                        firstName: e.currentTarget.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.lastName}
                    required
                    onChange={(e) =>
                      setData({
                        ...data,
                        lastName: e.currentTarget.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Cell</label>

                  <InputMask
                    mask="999-999-9999"
                    onChange={(e) =>
                      setData({
                        ...data,
                        phonenumber: e.currentTarget.value,
                      })
                    }
                    value={data.phonenumber}
                  >
                    {(inputProps) => (
                      <input
                        type="text"
                        className="form-control"
                        {...inputProps}
                        required
                      />
                    )}
                  </InputMask>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Profile Picture</label>
                  {profileImage.profileImage ? (
                    <>
                      <div className="profile_image_preview">
                        <div
                          className="cross_icon"
                          onClick={() =>
                            setProfileImage({
                              profilepicture: false,
                              profileImage: false,
                            })
                          }
                        >
                          &times;
                      </div>
                        <img src={profileImage.profileImage} alt="" />
                      </div>
                    </>
                  ) : (
                      <>
                        <div
                          {...getRootProps()}
                          className="upload_profile_picture"
                        >
                          <input {...getInputProps()} accept="image/jpeg" />
                          {isDragActive ? (
                            <p>
                              <img src={dragimage} alt="" />
                            </p>
                          ) : (
                              <p>
                                <img src={dragimage} alt="" />
                              </p>
                            )}
                        </div>
                        {profileImageError == "size" ? (<p className="profile_upload_image_info">
                          Uploaded file exceeds size limit, please upload image lower than 3MB
                        </p>) : ''}
                        {profileImageError == "ext" ? (<p className="profile_upload_image_info">
                          Invalid file extention, Please upload jpg file of 150x150 pixels
                        </p>) : ''}
                      </>
                    )}
                </div>
              </div>
            </div>
            <div className="form-group edit_profile_submit_container">
              <button className="btn edit_profile_submit" type="submit"
                id="formButton"
                disabled={validateChange()}
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
                  const caps_lock_on = e.getModifierState('CapsLock');
                  setIsCapsOn(caps_lock_on)
                }}
                onKeyDown={(e) => {
                  const caps_lock_on = e.getModifierState('CapsLock');
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
                  const caps_lock_on = e.getModifierState('CapsLock');
                  setIsCapsOn(caps_lock_on)
                }}
                onKeyDown={(e) => {
                  const caps_lock_on = e.getModifierState('CapsLock');
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
                  const caps_lock_on = e.getModifierState('CapsLock');
                  setIsCapsOn(caps_lock_on)
                }}
                onKeyDown={(e) => {
                  const caps_lock_on = e.getModifierState('CapsLock');
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

  const [info, setInfo] = useState(false);
  const pmicons = {
    mastercard: mastercard,
    visa: visa,
    discover: discover,
    "american express": AmericanExpress,
  }
  useEffect(() => {
    getMyInfo();
  }, []);

  useEffect(() => {
    console.log(myInfo);
    if (myInfo) {
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
  const handlecardshow = () => setaddcardpopupshow(true);

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
                    {/* <button className="btn" onClick={handlecardshow}>
                      ADD
                    </button> */}
                  </div>
                </div>
                <div className="divider"></div>
                <div className="cards">
                  <table className="table stable-stripe">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Card Number</th>
                        <th>Expiration Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {info
                        ? info.stripeCustomerCard.map((card, index) => {
                          return (
                            <tr>
                              <td key={index}><img src={pmicons[card.brand]} className="brand_icon" alt="" /></td>
                              <td>XXXX XXXX XXXX {card.last4}</td>
                              <td>
                                {card.exp_month}/{card.exp_year}
                              </td>
                              <td>
                                <i>a</i>
                                <i>b</i>
                              </td>
                            </tr>
                          );
                        })
                        : ""}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddNewCard
        value={""}
        onChange={() => { }}
        onStackSubmit={() => { }}
        show={addcardpopupshow}
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
