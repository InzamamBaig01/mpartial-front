import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";
import userProfile from "../../../assets/userProfile.svg";
import stripe from 'stripe';

// console.log(stripe);

import { CardElement, Elements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Dropdown, Modal, Button } from "react-bootstrap";
import { AuthContext } from "contexts/authContext";



const createOptions = (fontSize: string, padding?: string) => {
    return {
        style: {
            base: {
                fontSize,
                color: '#424770',
                letterSpacing: '0.025em',
                fontFamily: 'Source Code Pro, monospace',
                '::placeholder': {
                    color: '#aab7c4',
                },
                ...(padding ? { padding } : {}),
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };
};


const AddNewCard = props => {
    const stripePromise = loadStripe('pk_test_BVYHeMmpLalkw9ro9W2IkTFJ');
    const handleSubmit = (ev) => {
        ev.preventDefault();
        // if (this.props.stripe) {
        //     this.props.stripe
        //         .createToken()
        //         .then((payload) => console.log('[token]', payload));
        // } else {
        //     console.log("Stripe.js hasn't loaded yet.");
        // }
    };


    const handleBlur = () => {
        console.log('[blur]');
    };
    const handleChange = (change) => {
        console.log('[change]', change);
    };
    const handleClick = () => {
        console.log('[click]');
    };
    const handleFocus = () => {
        console.log('[focus]');
    };
    const handleReady = () => {
        console.log('[ready]');
    };
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                className="Add_card"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="add_card_title">
                        Add Payment Option
            </Modal.Title>
                </Modal.Header>
                <Modal.Body className="support_body">
                    <form onSubmit={props.onStackSubmit}>
                        <Elements stripe={stripePromise}>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Card number
          <CardNumberElement
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onReady={handleReady}
                                        {...createOptions("14")}
                                    />
                                </label>
                                <label>
                                    Expiration date
          <CardExpiryElement
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onReady={handleReady}
                                        {...createOptions("14")}
                                    />
                                </label>
                                <label>
                                    CVC
          <CardCvcElement
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onReady={handleReady}
                                        {...createOptions("14")}
                                    />
                                </label>
                                <button>Pay</button>
                            </form>
                        </Elements>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};


const Profile = () => {


    const [addcardpopupshow, setaddcardpopupshow] = useState(false);

    const {
        userDetails,
    } = useContext(AuthContext);

    const [userData, setUserData] = useState(userDetails())
    const handlecardclose = () => setaddcardpopupshow(false);
    const handlecardshow = () => setaddcardpopupshow(true);



    const stripePromise = loadStripe('pk_test_BVYHeMmpLalkw9ro9W2IkTFJ');
    // const stripe = Stripe('pk_test_BVYHeMmpLalkw9ro9W2IkTFJ');


    const initStripe = async () => {
        return new stripe('pk_test_BVYHeMmpLalkw9ro9W2IkTFJ', {
            apiVersion: "2020-03-02"
        });
    }
    useEffect(() => {
        // console.log(stripePromise);
        // const stripe = initStripe();
        // // console.log(stripe);
        // // return;

        // stripe.then((d) => {
        //     console.log(d);
        //     d.customers.list().then((response) => {
        //         console.log("customers list", response);
        //     })
        //     d.customers.create(
        //         {
        //             email: 'qualitybits1@gmail.com',
        //         }
        //     ).then((response) => {
        //         console.log("customers list", response);
        //     })
        //     // console.log();
        //     // d.customers.list().then((ddd)=>{console.log(ddd)})
        //     //    const cc =  d.customers.listSources(
        //     //         'cus_C7kp9txX7uPYx4',
        //     //       ).then((dd) =>{
        //     //           console.log(dd)
        //     //       })
        // })
        // return;
        stripePromise.then((d) => {
            console.log(d);
            return;
            // cus_C7kp9txX7uPYx4
            d.accounts.list(
                { limit: 3 },
                function (err, accounts) {
                    console.log(accounts);

                    // asynchronously called
                }
            );
        })

    }, [])

    return (
        <>
            <Header isFixedColor={true}></Header>
            <div className="other_pages_container">
                <h1 className="title text-center">My Account</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <div className="profile_left_sidebar">
                                <div className="edit_profile-icon "></div>
                                <div className="profile_image">
                                    <img src={userProfile} alt="" />
                                </div>
                                <div className="profile_name">{userData.firstName} {userData.lastName}</div>
                                <div className="profile_email">{userData.emailAddress}</div>
                                <div className="divider"></div>
                                <div className="profile_info">
                                    <div className="row">
                                        <div className="col">First Name</div>
                                        <div className="col text-right">{userData.firstName}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col">Last Name</div>
                                        <div className="col text-right">{userData.lastName}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col">Email</div>
                                        <div className="col text-right">{userData.emailAddress}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col">Phone</div>
                                        <div className="col text-right">{userData.phone}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col">Zip Code</div>
                                        <div className="col text-right">678765</div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-center">
                                            <button className="btn">Change Password</button>
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

                                        <button className="btn" onClick={handlecardshow}>ADD</button>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="cards">
                                    {/* */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddNewCard
                value={''}
                onChange={() => { }}
                onStackSubmit={() => { }}
                show={addcardpopupshow}
                handleClose={handlecardclose}
            />
        </>
    );
}


export default withRouter(Profile);
