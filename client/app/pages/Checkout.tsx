import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Header from "app/components/Header";
import { AuthContext } from "contexts/authContext";
import {
  payOrder,
  getPaymentIntendOfOrder,
  getPIC,
} from "utils/api-routes/api-routes.util";
import history from "utils/history";
import { loadStripe } from "@stripe/stripe-js/pure";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { AppContext } from "contexts/appContext";
import { AppAlertsContext } from "contexts/appAlertsContext";
import Loader from "app/components/Loader";
import appConfig from "../../appconfig.json";
import visa from "../../assets/visa.png";
import mastercard from "../../assets/mastercard.png";
import AmericanExpress from "../../assets/American-Express.png";
import discover from "../../assets/discover.png";

import ApplyCoupon from "./UserOrder/_components/ApplyCoupon";
const FormElement = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { getMyInfo, myInfo } = useContext(AppContext);
  const { showLoader, hideLoader } = React.useContext(AppAlertsContext);
  const [cardError, setCardError] = useState(false);
  const [name, setName] = useState("");

  const handleSubmitCard = async (ev) => {
    ev.preventDefault();
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
      <form>
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
        <button onClick={handleSubmitCard} className="btn btn-lg">
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

const CheckoutForm = (props) => {
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const { userDetails } = useContext(AuthContext);
  const [showNewCardForm, setShowNewCardForm] = useState(
    props.stripeCustomerCard.length == 0
  );
  const { showLoader, hideLoader } = useContext(AppAlertsContext);
  useEffect(() => {
    setShowNewCardForm(props.stripeCustomerCard.length == 0);
  }, [props.stripeCustomerCard]);
  const pmicons = {
    mastercard: mastercard,
    visa: visa,
    discover: discover,
    "american express": AmericanExpress,
  };
  const [PI, setPI] = useState(false);
  const [addcardpopupshow, setaddcardpopupshow] = useState(false);

  const handlecardclose = () => setaddcardpopupshow(false);
  const handlecardshow = () => {
    getPI();
    setaddcardpopupshow(true);
  };

  const getPI = () => {
    getPIC().subscribe((response) => {
      console.log(response, "REPONSE");
      setPI(response.response.data);
    });
  };

  const [selectedCard, setSelectedCard] = useState(false);

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
      if (props.cardValidation) props.setCardValidation(false);
    } else {
      setError(null);
      if (!props.cardValidation) props.setCardValidation(true);
      // props.setIsFormSubmitted(true);
    }
  };

  useEffect(() => {
    if (props.isFormSubmitted) {
      console.log(props);
      handleSubmit({});
    }
  }, [props.isFormSubmitted]);

  // Handle form submission.
  const handleSubmit = async (event) => {
    // event.preventDefault();
    showLoader();
    console.log(props.stripeCustomerCard);
    payOrder({
      orderId: props.orderid,
      couponcode: props.coupon,
      paymentMethodId: !selectedCard ? "" : selectedCard.paymentMethodId,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        localStorage.removeItem("sessipn");
        hideLoader();
        history.push(`/receipt/${props.orderid}`);
      } else {
        props.setCheckoutError(response.response.Message);
      }
    });
  };
  useEffect(() => {
    props.stripeCustomerCard.map((card, index) => {
      if (card.isDefault) {
        setSelectedCard(card);
        props.setCardValidation(true);
      }
    });
  }, [props.stripeCustomerCard]);

  return (
    <>
      <AddNewCard
        value={""}
        onChange={() => {}}
        onStackSubmit={() => {}}
        show={addcardpopupshow}
        PI={PI}
        handleClose={handlecardclose}
      />
      {props.stripeCustomerCard.length ? (
        <>
          <button
            className="btn payment_switch"
            type="button"
            onClick={handlecardshow}
          >
            Add New Card
          </button>

          {props.stripeCustomerCard.map((card, index) => {
            return (
              <div className={`form - group col - 12`} key={index}>
                <input
                  type="radio"
                  id={`card_${index}`}
                  name="card"
                  checked={
                    selectedCard.paymentMethodId == card.paymentMethodId
                      ? "checked"
                      : ""
                  }
                  onClick={() => {
                    if (!props.cardValidation) props.setCardValidation(true);
                    setSelectedCard(card);
                  }}
                />{" "}
                <label
                  htmlFor={`card_${index}`}
                  onClick={() => {
                    if (!props.cardValidation) props.setCardValidation(true);
                    setSelectedCard(card);
                  }}
                >
                  <img
                    src={pmicons[card.brand]}
                    className="brand_icons"
                    alt=""
                  />
                  &nbsp; Card Ending {card.last4} -- {card.exp_month}/
                  {card.exp_year}
                </label>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </>
  );
};

const Checkout = (props) => {
  const { userDetails } = useContext(AuthContext);
  const { showLoader, hideLoader } = useContext(AppAlertsContext);
  const [coupon, setCoupon] = useState("");
  const { getMyInfo, myInfo, price } = useContext(AppContext);
  const [couponApplied, setCouponApplied] = useState(false);
  const [ApplyCouponShow, setApplyCouponShow] = useState(false);
  const [CheckoutError, setCheckoutError] = useState(false);
  const [PIC, setPIC] = useState(false);
  const [product, setProduct] = React.useState({
    name: "mpartial",
    price: price,
    description: "",
    coupon: "",
    amountsubtraced: "",
    orignalprice: "",
    newprice: "",
  });
  const orderid = props.match.params.orderid;

  const [info, setInfo] = useState(false);
  const [validation, setvalidation] = useState({
    fname: userDetails().firstName.length == 0,
    lname: userDetails().lastName.length == 0,
    email: userDetails().emailAddress.length == 0,
  });
  const [cardValidation, setCardValidation] = useState(false);
  // console.log("main_rendered");
  useEffect(() => {
    getMyInfo();
  }, []);

  useEffect(() => {
    if (myInfo) {
      setInfo(myInfo);
    }
    return () => {};
  }, [myInfo]);

  // useEffect(() => {
  //   if (props.PIC == null) {
  //     history.push("/orders");
  //   }
  // }, []);

  const getPICO = (isCoupedCode?, isCheckoutFormSubmitted?) => {
    setCheckoutError(false);
    setIsFormSubmitted(true);
  };

  const handleApplyCouponclose = () => setApplyCouponShow(false);
  const handleApplyCouponShow = () => setApplyCouponShow(true);

  const onSubmitSuccess = (couponData) => {
    handleApplyCouponclose();
    setProduct({
      name: "mpartial",
      price: couponData.newprice,
      description: "",
      coupon: couponData.code,
      amountsubtraced: couponData.amountreducned,
      orignalprice: couponData.orignalprice,
      newprice: couponData.newprice,
    });
  };

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [checkoutInfo, setCheckoutInfo] = useState({
    firstName: userDetails().firstName,
    lastName: userDetails().lastName,
    emailAddress: userDetails().emailAddress,
  });

  useEffect(() => {
    checkValidation();
  }, [checkoutInfo]);

  const onChangeValue = (value, key) => {
    const oldValues = Object.assign({}, checkoutInfo);
    oldValues[key] = value;
    setCheckoutInfo(oldValues);
  };
  let stripePromise;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(appConfig.stripe);
    }
    return stripePromise;
  };
  const checkValidation = () => {
    setvalidation({
      fname: checkoutInfo.firstName.length == 0,
      lname: checkoutInfo.lastName.length == 0,
      email: checkoutInfo.emailAddress.length == 0,
    });
  };

  const handleCardAction = (bool) => {
    setCardValidation(bool);
  };

  const handleFormSubmittion = (bool) => {};
  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="other_pages_container">
        <h1 className="title text-center">Checkout</h1>
        <div className="container">
          <form
            className="order_form"
            onSubmit={(e) => {
              e.preventDefault();

              getPICO(false, true);
            }}
          >
            <div className="row">
              <div className="col sub_titles">Billing Details</div>
            </div>
            <div className="row">
              <div className={`form - group col - 12`}>
                <label>
                  First Name <span className="red">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={checkoutInfo.firstName}
                  required
                  onChange={(e) =>
                    onChangeValue(e.currentTarget.value, "firstName")
                  }
                />
                {validation.fname ? (
                  <span className="password_not_matched">
                    First Name Is Required.
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row">
              <div className={`form - group col - 12`}>
                <label>
                  Last Name <span className="red">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={checkoutInfo.lastName}
                  required
                  onChange={(e) =>
                    onChangeValue(e.currentTarget.value, "lastName")
                  }
                />
                {validation.lname ? (
                  <span className="password_not_matched">
                    Last Name Is Required.
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row">
              <div className={`form - group col - 12`}>
                <label>
                  Email Address <span className="red">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={checkoutInfo.emailAddress}
                  required
                  onChange={(e) =>
                    onChangeValue(e.currentTarget.value, "emailAddress")
                  }
                />
                {validation.email ? (
                  <span className="password_not_matched">
                    Email Address Is Required.
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="row">
              <div className="col sub_titles">Payment Method</div>
            </div>

            {product.coupon && product.newprice < 0 ? (
              ""
            ) : (
              <div className="row">
                <div className={`form - group col - 12`}>
                  <Elements stripe={getStripe()}>
                    <CheckoutForm
                      orderid={orderid}
                      isFormSubmitted={isFormSubmitted}
                      ischildaccount={info.ischildaccount}
                      setIsFormSubmitted={handleFormSubmittion}
                      stripeCustomerCard={info ? info.stripeCustomerCard : []}
                      setCardValidation={handleCardAction}
                      cardValidation={cardValidation}
                      coupon={coupon}
                      checkoutInfo={checkoutInfo}
                      setCheckoutError={setCheckoutError}
                    />
                  </Elements>
                  {/* <input type="checkbox" /> Card Ending 7878 */}
                </div>
              </div>
            )}
            <div className="row">
              <div className="col">
                {product.coupon && product.coupon.length ? (
                  <>
                    <span className="coupon_success">
                      Coupon Applied: {product.coupon}
                    </span>
                  </>
                ) : (
                  ""
                )}
                <button
                  className="btn mt-2"
                  type="button"
                  onClick={handleApplyCouponShow}
                >
                  Apply Coupon
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col sub_titles">Your Order</div>
            </div>

            <div className="order_checkout_details">
              <div className="col-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mpartial</td>
                      <td>${price}</td>
                    </tr>
                    {product.coupon && product.coupon.length ? (
                      <>
                        <tr>
                          <td>Coupon Discount ({product.coupon})</td>
                          <td>
                            <div>-${product.amountsubtraced / 100}</div>
                          </td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td>
                            $
                            {product.newprice > 0
                              ? product.newprice / 100
                              : product.newprice}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td>Subtotal</td>
                          <td>${price}</td>
                        </tr>

                        <tr>
                          <td>Total</td>
                          <td>${price}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row ">
              {CheckoutError ? (
                <span className="password_not_matched">{CheckoutError} </span>
              ) : (
                ""
              )}
              <div className="col submit_btn_container">
                {product.coupon && product.newprice == 0 ? (
                  <button className="btn" type="submit" id="formButton">
                    <Loader text="Checkout"></Loader>
                  </button>
                ) : (
                  <button
                    className="btn"
                    type="submit"
                    // id="formButton"
                    onClick={checkValidation}
                    disabled={
                      checkoutInfo.firstName == "" ||
                      checkoutInfo.lastName == "" ||
                      checkoutInfo.emailAddress == "" ||
                      (info.ischildaccount
                        ? ""
                        : !cardValidation
                        ? true
                        : false)
                    }
                  >
                    <Loader text="Checkout"></Loader>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {ApplyCouponShow && (
        <ApplyCoupon
          value={""}
          onSubmitSuccess={onSubmitSuccess}
          show={ApplyCouponShow}
          setCoupon={setCoupon}
          handleClose={handleApplyCouponclose}
          info={{
            orderId: orderid,
          }}
        />
      )}
    </>
  );
};

export default withRouter(Checkout);
