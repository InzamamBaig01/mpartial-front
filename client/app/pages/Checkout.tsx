import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";
import { AuthContext } from "contexts/authContext";
import {
  payOrder,
  getPaymentIntendOfOrder,
  getPIC,
} from "utils/api-routes/api-routes.util";
import history from "utils/history";
import { loadStripe } from "@stripe/stripe-js";
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

const CheckoutForm = (props) => {
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const { userDetails } = useContext(AuthContext);
  const { showLoader, hideLoader } = useContext(AppAlertsContext);
  const pmicons = {
    mastercard: mastercard,
    visa: visa,
    discover: discover,
    "american express": AmericanExpress,
  };
  const [showNewCardForm, setShowNewCardForm] = useState(
    props.stripeCustomerCard.length == 0
  );
  // console.log(props.stripeCustomerCard.length == 0);
  const [selectedCard, setSelectedCard] = useState(false);

  useEffect(() => {
    setShowNewCardForm(props.stripeCustomerCard.length == 0);
  }, [props.stripeCustomerCard]);
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
    const card = elements.getElement(CardElement);

    stripe
      .confirmCardPayment(
        props.PIC,
        !showNewCardForm
          ? {
              payment_method: selectedCard.paymentMethodId,
            }
          : {
              payment_method: {
                card: card,
                billing_details: {
                  name: `${props.checkoutInfo.firstName} ${props.checkoutInfo.lastName}`,
                },
              },
              setup_future_usage: "off_session",
            }
      )
      .then(async function (result) {
        console.log(result);
        // return;
        if (result.error) {
          props.setIsFormSubmitted(false);
          setError(result.error.message);
          props.setCardValidation(false);
          console.log(result.error);
          // return;
          hideLoader();
          payOrder({
            status: result.error.code,
            orderId: props.orderid,
            fullresponse: JSON.stringify(result.error),
          }).subscribe((response) => {
            console.log(response.response);
            // if (response.response.Requested_Action) {
            //   localStorage.removeItem("sessipn");
            //   hideLoader();
            //   history.push(`/receipt/${props.orderid}`);
            // }
          });
        } else {
          hideLoader();
          if (result.paymentIntent.status === "succeeded") {
            payOrder({
              status: result.paymentIntent.status,
              orderId: props.orderid,
              fullresponse: JSON.stringify(result.paymentIntent),
            }).subscribe((response) => {
              if (response.response.Requested_Action) {
                localStorage.removeItem("sessipn");
                hideLoader();
                history.push(`/receipt/${props.orderid}`);
              } else {
                hideLoader();
                setError("Server Error.");
              }
            });
          } else {
            hideLoader();
            setError("payment  Error.");
          }
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
      {props.stripeCustomerCard.length ? (
        <>
          <button
            className="btn payment_switch"
            type="button"
            onClick={() => {
              setShowNewCardForm(!showNewCardForm);
              setSelectedCard(false);
              props.setCardValidation(false);
              setError(null);
            }}
          >
            {showNewCardForm ? "Use Existing Card" : "Use New Card"}
          </button>
          {!showNewCardForm &&
            props.stripeCustomerCard.map((card, index) => {
              return (
                <div className={`form - group col - 12`} key={index}>
                  <input
                    type="radio"
                    id={`card_${index}`}
                    name="card"
                    defaultChecked={
                      selectedCard.paymentMethodId == card.paymentMethodId
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
      {showNewCardForm && (
        <div className="">
          <label htmlFor="card-element">Credit or debit card</label>
          <CardElement
            id="card-element"
            className="form-control"
            onChange={handleChange}
          />
          <div className="card-errors" role="alert">
            {error}
          </div>
        </div>
      )}
    </>
  );
};

const Checkout = (props) => {
  const { userDetails } = useContext(AuthContext);
  const { showLoader, hideLoader } = useContext(AppAlertsContext);

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
    getPaymentIntendOfOrder({
      orderId: orderid,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        // console.log(response.response);
        setPIC(response.response.message);
        const order = response.response.data;
        // setProduct({
        //   name: 'mpartial',
        //   price: order.orignalprice,
        //   description: '',
        //   coupon: isCoupedCode ? order.couponapplied : '',
        //   amountsubtraced: order.amountsubtraced,
        //   orignalprice: order.orignalprice,
        //   newprice: order.amountInCents,
        // });
        setCheckoutError(false);
        setIsFormSubmitted(true);
        // if (isCheckoutFormSubmitted) setIsFormSubmitted(isCoupedCode);
      } else {
        // getPICO(isCoupedCode);
        setCheckoutError("Server Error");
        hideLoader();
      }
    });
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
    // getPICO(true);
    // setPrice(couponData.price);
    // getPICO(couponData.coupon);
    // setCouponApplied(couponData.coupon);
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
  const stripePromise = loadStripe(appConfig.stripe);

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

  const saveFreeOrder = () => {
    showLoader();
    payOrder({
      status: "succeeded",
      orderId: orderid,
      fullresponse: "{}",
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        localStorage.removeItem("sessipn");
        hideLoader();
        history.push(`/receipt/${orderid}`);
      }
    });
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

            {product.coupon && product.newprice == 0 ? (
              ""
            ) : (
              <div className="row">
                <div className={`form - group col - 12`}>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      orderid={orderid}
                      isFormSubmitted={isFormSubmitted}
                      setIsFormSubmitted={handleFormSubmittion}
                      stripeCustomerCard={info ? info.stripeCustomerCard : []}
                      setCardValidation={handleCardAction}
                      cardValidation={cardValidation}
                      checkoutInfo={checkoutInfo}
                      PIC={PIC}
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

            <div className="row">
              {CheckoutError ? (
                <span className="password_not_matched">
                  Server Error! Please try again.
                </span>
              ) : (
                ""
              )}
              <div className="col submit_btn_container">
                {product.coupon && product.newprice == 0 ? (
                  <button
                    className="btn"
                    type="submit"
                    id="formButton"
                    onClick={saveFreeOrder}
                  >
                    <Loader text="Checkout"></Loader>
                  </button>
                ) : (
                  <button
                    className="btn"
                    type="submit"
                    id="formButton"
                    onClick={checkValidation}
                    disabled={
                      checkoutInfo.firstName == "" ||
                      checkoutInfo.lastName == "" ||
                      checkoutInfo.emailAddress == "" ||
                      !cardValidation
                        ? true
                        : false
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
