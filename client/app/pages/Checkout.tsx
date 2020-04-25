import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";
import StripeCheckout from "react-stripe-checkout";
import { ajax } from 'rxjs/observable/dom/ajax';
import { AuthContext } from "contexts/authContext";

const requestHeader = () => {
    const headers = {
        'Content-Type': 'application/json',
    };

    let token: string | boolean = false;

    if (localStorage.token) {
        token = localStorage.token;
    }
    if (token) {
        // headers['thetoken'] = localStorage.token;
    } else {
        // headers['thetoken'] = '17d26ca06932e52bbac7f1e0be00227d';
    }

    return headers;
};

const Checkout = () => {
    const {
        userDetails,
    } = useContext(AuthContext);
    const [product] = React.useState({
        name: "mpartial",
        price: 250,
        description: ""
    });
    console.log(userDetails);
    const [checkoutInfo, setCheckoutInfo] = useState({
        firstName: userDetails().firstName,
        lastName: userDetails().lastName,
        emailAddress: userDetails().emailAddress,
        zipCode: userDetails().zipCode,
    })

    const handleToken = async (token, addresses) => {
        console.log(token)
        // const response = await axios.post(
        //     "https://ry7v05l6on.sse.codesandbox.io/checkout",
        //     { token, product }
        // );
        // const { status } = response.data;
        // console.log("Response:", response.data);
        // if (status === "success") {
        //     // toast("Success! Check email for details", { type: "success" });
        // } else {
        //     // toast("Something went wrong", { type: "error" });
        // }

        ajax({
            headers: requestHeader(),
            method: 'POST',
            url: `http://117.20.29.192:8080/Client/saveOrderData?stripeToken=${token.id}&amountInCents=${product.price * 100}&thetoken=${localStorage.token}`,
        }).subscribe((res) => {
            console.log(res);
        })

    }
    const onChangeValue = (value, key) => {
        const oldValues = Object.assign({}, checkoutInfo);
        oldValues[key] = value;
        setCheckoutInfo(oldValues);
    }
    return (
        <>
            <Header isFixedColor={true}></Header>
            <div className="other_pages_container">
                <h1 className="title text-center">Checkout</h1>
                <div className="container">
                    <form className="order_form" onSubmit={(e) => { e.preventDefault() }}>
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

                        {/* <div className="row">
                            <div className="col sub_titles">
                                Payment Method
                            </div>
                        </div>

                        <div className="row">
                            <div className={`form-group col-12`}>
                                <input type="checkbox" /> Card Ending 7878
                            </div>

                            <div className={`form-group col-12`}>
                                <input type="checkbox" /> Card Ending 2345
                            </div>
                        </div> */}

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
                                <StripeCheckout
                                    stripeKey="pk_test_qtQYQAflfKikPJB9y8Y1H8fY00dcOIegPx"
                                    token={handleToken}
                                    amount={product.price * 100}
                                    name="mpartial"
                                    email="qualitybits1@gmail.com"
                                // billingAddress
                                // shippingAddress
                                >
                                    <button className="btn"
                                        disabled={(checkoutInfo.firstName == '' || checkoutInfo.lastName == '' || checkoutInfo.emailAddress == '' || checkoutInfo.zipCode == '') ? true : false}
                                    > {(checkoutInfo.firstName == '' || checkoutInfo.lastName == '' || checkoutInfo.emailAddress == '' || checkoutInfo.zipCode == '') ? "true" : "false"} Checkout</button>
                                </StripeCheckout>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}


export default withRouter(Checkout);
