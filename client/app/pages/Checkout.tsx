import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";
import { AuthContext } from "contexts/authContext";
import { payOrder } from "utils/api-routes/api-routes.util";
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


const CheckoutForm = (props) => {
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const { userDetails } = useContext(AuthContext);
  const { showLoader, hideLoader } = useContext(AppAlertsContext);

  const [selectedCard, setSelectedCard] = useState(false);

  const cardObj = {
    id: "pm_1GcSOiGnXIZN763FSI0tl0Ik",
    object: "payment_method",
    billing_details: {
      address: {
        city: null,
        country: null,
        line1: null,
        line2: null,
        postal_code: "54000",
        state: null,
      },
      email: null,
      name: "Jenny Rosen",
      phone: null,
    },
    card: {
      brand: "visa",
      checks: {
        address_line1_check: null,
        address_postal_code_check: "pass",
        cvc_check: "pass",
      },
      country: "US",
      exp_month: 4,
      exp_year: 2033,
      fingerprint: "iDWPsLwNujxEW7UL",
      funding: "credit",
      generated_from: null,
      last4: "4242",
      three_d_secure_usage: {
        supported: true,
      },
      wallet: null,
    },
    created: 1587976384,
    customer: "cus_HAWqhNZK8JYLET",
    livemode: false,
    metadata: {},
    type: "card",
  };

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
      // props.setIsFormSubmitted(true);
    }
  };

  useEffect(() => {
    if (props.isFormSubmitted) {
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
        localStorage.getItem("sessipn"),
        selectedCard
          ? {
              payment_method: selectedCard.paymentMethodId,
            }
          : {
              payment_method: {
                card: card,
                billing_details: {
                  name: "Jenny Rosen",
                },
              },
              setup_future_usage: "off_session",
            }
      )
      .then(async function (result) {
        if (result.error) {
          props.setIsFormSubmitted(false);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            payOrder({
              status: result.paymentIntent.status,
              orderId: props.orderid,
              fullresponse: JSON.stringify(result.paymentIntent),
            }).subscribe((response) => {
              if (response.response.Requested_Action) {
                localStorage.removeItem("sessipn")
                hideLoader();
                history.push(`/receipt/${props.orderid}`);
              }
            });
          }
        }
      });
  };

  return (
    <>
      {props.info && props.info.stripeCustomerCard.length ? (
        props.info.stripeCustomerCard.map((card, index) => {
          return (
            <div className={`form-group col-12`} key={index}>
              <input
                type="radio"
                id={`card_${index}`}
                name="card"
                onClick={() => setSelectedCard(card)}
              />{" "}
              <label
                htmlFor={`card_${index}`}
                onClick={() => setSelectedCard(card)}
              >
                Card Ending {card.last4} -- {card.exp_month}/{card.exp_year}
              </label>
            </div>
          );
        })
      ) : (
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
  const { getMyInfo, myInfo, price } = useContext(AppContext);

  const [product] = React.useState({
    name: "mpartial",
    price: price,
    description: "",
  });
  const orderid = props.match.params.orderid;


  const [info, setInfo] = useState(false);
  const [validation, setvalidation] = useState({
    fname: userDetails().firstName.length == 0,
    lname: userDetails().lastName.length == 0,
    email: userDetails().emailAddress.length == 0,
  });

  useEffect(() => {
    getMyInfo();
  }, []);

  useEffect(() => {
    if (myInfo) {
      setInfo(myInfo);
    }
  }, [myInfo]);

  useEffect(() => {
    if (localStorage.getItem("sessipn") == null) {
      history.push("/orders");
    }
  }, []);

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
  const stripePromise = loadStripe(
    "pk_test_qtQYQAflfKikPJB9y8Y1H8fY00dcOIegPx"
  );

  const checkValidation = () => {
    setvalidation({
      fname: checkoutInfo.firstName.length == 0,
      lname: checkoutInfo.lastName.length == 0,
      email: checkoutInfo.emailAddress.length == 0,
    });
  };
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
              setIsFormSubmitted(true);
            }}
          >
            <div className="row">
              <div className="col sub_titles">Billing Details</div>
            </div>
            <div className="row">
              <div className={`form-group col-12`}>
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
              <div className={`form-group col-12`}>
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
              <div className={`form-group col-12`}>
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

            <div className="row">
              <div className={`form-group col-12`}>
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    orderid={orderid}
                    isFormSubmitted={isFormSubmitted}
                    setIsFormSubmitted={setIsFormSubmitted}
                    info={info}
                  />
                </Elements>
                {/* <input type="checkbox" /> Card Ending 7878 */}
              </div>
            </div>

            <div className="row">
              <div className="col sub_titles">Your Order</div>
            </div>

            <div className="row order_checkout_details">
              <div className="col-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>mpartial</td>
                      <td>${price}</td>
                    </tr>

                    <tr>
                      <td>Subtotal</td>
                      <td>${price}</td>
                    </tr>

                    <tr>
                      <td>Total</td>
                      <td>${price}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row">
              <div className="col ">
                <button
                  className="btn"
                  type="submit"
                  id="formButton"
                  onClick={checkValidation}
                  disabled={
                    checkoutInfo.firstName == "" ||
                    checkoutInfo.lastName == "" ||
                    checkoutInfo.emailAddress == ""
                      ? true
                      : false
                  }
                >
                  {" "}
                  Checkout
                  <Loader></Loader>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(Checkout);
