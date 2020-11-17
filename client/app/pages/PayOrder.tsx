import React, { useEffect, useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";
import { AuthContext } from "contexts/authContext";
import { payOrder } from "utils/api-routes/api-routes.util";
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
        // return;
        if (result.error) {
          props.setIsFormSubmitted(false);
          setError(result.error.message);
          props.setCardValidation(false);
        } else {
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
              }
            });
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
const PayOrder = (props) => {
  const orderId = props.match.params.orderId;

  const { userDetails } = useContext(AuthContext);
  const { getMyInfo, myInfo, price } = useContext(AppContext);

  const [product] = React.useState({
    name: "mpartial",
    price: price,
    description: "",
  });

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
  const handleFormSubmittion = (bool) => {
    setIsFormSubmitted(bool);
  };
  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="other_pages_container">
        <h1 className="title text-center">Pay Now</h1>
        <h3 className="text-center">{"Project Name"}</h3>
        <br />
        <div className="container receipt_details">
          <div className="row">
            <div className={`form-group mt-3 col-12`}>
              <Elements stripe={getStripe()}>
                <CheckoutForm
                  orderid={orderId}
                  isFormSubmitted={isFormSubmitted}
                  setIsFormSubmitted={handleFormSubmittion}
                  stripeCustomerCard={info ? info.stripeCustomerCard : []}
                  setCardValidation={handleCardAction}
                  cardValidation={cardValidation}
                  checkoutInfo={checkoutInfo}
                />
              </Elements>
              {/* <input type="checkbox" /> Card Ending 7878 */}
            </div>
          </div>
          <div className="row">
            <div className={`form-group col-12 mt-3`}>
              <button
                className="btn btn-green"
                id="formButton"
                onClick={checkValidation}
                disabled={!cardValidation ? true : false}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(PayOrder);
