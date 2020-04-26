import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";
import StripeCheckout from "react-stripe-checkout";
import { ajax } from 'rxjs/observable/dom/ajax';
import { AuthContext } from "contexts/authContext";
import { payOrder } from "utils/api-routes/api-routes.util";
import history from "utils/history";
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useElements,
    useStripe
} from '@stripe/react-stripe-js';

// Custom styling can be passed to options when creating an Element.
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    }
};

const CheckoutForm = (props) => {
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const {
        userDetails,
    } = useContext(AuthContext);


    const [sendNow, setSendNow] = useState(false)

    // Handle real-time validation errors from the card Element.
    const handleChange = (event) => {
        if (event.error) {
            setError(event.error.message);
        } else {
            setError(null);
            // props.setIsFormSubmitted(true);
        }
    }


    useEffect(() => {
        if(props.isFormSubmitted) {
            handleSubmit({});
        }
    }, [props.isFormSubmitted]);

    // Handle form submission.
    const handleSubmit = async (event) => {
        // event.preventDefault();
        const card = elements.getElement(CardElement);


        stripe.confirmCardPayment(localStorage.getItem("sessipn"), {
            payment_method: {
                card: card,
                billing_details: {
                    name: 'Jenny Rosen'
                }
            },
            setup_future_usage: 'off_session'
        }).then(async function (result) {
            if (result.error) {
                // Show error to your customer
                console.log(result.error.message);
                props.setIsFormSubmitted(false);
            } else {
                console.log(result)
                if (result.paymentIntent.status === 'succeeded') {
                    const token = await stripe.createToken(card)
                    if (token.error) {
                        // Inform the user if there was an error.
                        setError(result.error.message);
                    } else {
                        setError(null);
                        // Send the token to your server.
                        //   stripeTokenHandler(result.token);
                        console.log(token)
                        payOrder({
                            stripeToken: token.token.id,
                            orderId: props.orderid,
                            price: 250 * 100
                        }).subscribe((response) => {
                            if (response.response.Requested_Action) {
                                history.push(`/receipt/${props.orderid}`);
                            }
                        })
                    }
                }

            }
        });

    };

    return (
        <>

        {/* <form onSubmit={handleSubmit}> */}
            <div className="">
                <label htmlFor="card-element">
                    Credit or debit card
        </label>
                <CardElement
                    id="card-element"
                    className="form-control"
                    onChange={handleChange}
                />
                <div className="card-errors" role="alert">{error}</div>
            </div>
            {/* <button type="submit">Submit Payment</button> */}
         {/* </form> */}
        </>
    );
}


const Checkout = (props) => {
    const {
        userDetails,
    } = useContext(AuthContext);
    const [product] = React.useState({
        name: "mpartial",
        price: 250,
        description: ""
    });
    const orderid = props.match.params.orderid;


    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [checkoutInfo, setCheckoutInfo] = useState({
        firstName: userDetails().firstName,
        lastName: userDetails().lastName,
        emailAddress: userDetails().emailAddress,
        zipCode: '',
    })

    const handleToken = async (token, addresses) => {
        payOrder({
            stripeToken: token.id,
            orderId: orderid,
            price: product.price * 100
        }).subscribe((response) => {
            if (response.response.Requested_Action) {
                history.push(`/receipt/${orderid}`);
            }
        })
    }
    const onChangeValue = (value, key) => {
        const oldValues = Object.assign({}, checkoutInfo);
        oldValues[key] = value;
        setCheckoutInfo(oldValues);
    }
    const stripePromise = loadStripe('pk_test_qtQYQAflfKikPJB9y8Y1H8fY00dcOIegPx');
    return (
        <>
            <Header isFixedColor={true}></Header>
            <div className="other_pages_container">
                <h1 className="title text-center">Checkout</h1>
                <div className="container">
                    <form className="order_form" onSubmit={(e) => { e.preventDefault(); setIsFormSubmitted(true); }}>
                        <div className="row">
                            <div className="col sub_titles">
                                Billing Details
                            </div>
                        </div>
                        <div className="row">
                            <div className={`form-group col-12`}>
                                <label>First Name</label>
                                <input type="text" className="form-control" value={checkoutInfo.firstName} onChange={(e) => onChangeValue(e.currentTarget.value, "firstName")} />
                            </div>
                        </div>
                        <div className="row">
                            <div className={`form-group col-12`}>
                                <label>Last Name</label>
                                <input type="text" className="form-control" value={checkoutInfo.lastName} onChange={(e) => onChangeValue(e.currentTarget.value, "lastName")} />
                            </div>
                        </div>
                        <div className="row">
                            <div className={`form-group col-12`}>
                                <label>Email Address</label>
                                <input type="text" className="form-control" value={checkoutInfo.emailAddress} onChange={(e) => onChangeValue(e.currentTarget.value, "emailAddress")} />
                            </div>
                        </div>
                        <div className="row">
                            <div className={`form-group col-12`}>
                                <label>Zip Code</label>
                                <input type="text" className="form-control" value={checkoutInfo.zipCode} onChange={(e) => onChangeValue(e.currentTarget.value, "zipCode")} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col sub_titles">
                                Payment Method
                            </div>
                        </div>

                        <div className="row">
                            <div className={`form-group col-12`}>
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm orderid={orderid} isFormSubmitted={isFormSubmitted} setIsFormSubmitted={setIsFormSubmitted} />
                                </Elements>
                                {/* <input type="checkbox" /> Card Ending 7878 */}
                            </div>

                            {/* <div className={`form-group col-12`}>
                                <input type="checkbox" /> Card Ending 2345
                            </div> */}
                        </div>

                        <div className="row">
                            <div className="col sub_titles">
                                Your Order
                            </div>
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
                                            <td>$250</td>
                                        </tr>

                                        <tr>
                                            <td>Subtotal</td>
                                            <td>$250</td>
                                        </tr>

                                        <tr>
                                            <td>Total</td>
                                            <td>$250</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col ">
                                {/* <StripeCheckout
                                    stripeKey="pk_test_qtQYQAflfKikPJB9y8Y1H8fY00dcOIegPx"
                                    token={handleToken}
                                    amount={product.price * 100}
                                    name="mpartial"
                                    email="qualitybits1@gmail.com"
                                // billingAddress
                                // shippingAddress
                                > */}
                                <button className="btn" type="submit"
                                    disabled={(checkoutInfo.firstName == '' || checkoutInfo.lastName == '' || checkoutInfo.emailAddress == '' || checkoutInfo.zipCode == '') ? true : false}
                                > Checkout</button>
                                {/* </StripeCheckout> */}
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}


export default withRouter(Checkout);
