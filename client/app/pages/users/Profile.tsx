import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";
import userProfile from "../../../assets/userProfile.svg";
import stripe from  'stripe';

// console.log(stripe);

import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';



const Profile = () => {

    const stripePromise = loadStripe('pk_test_BVYHeMmpLalkw9ro9W2IkTFJ');
    // const stripe = Stripe('pk_test_BVYHeMmpLalkw9ro9W2IkTFJ');


    const initStripe = async () => {
        return new stripe('pk_test_BVYHeMmpLalkw9ro9W2IkTFJ', {
            apiVersion: "2020-03-02"
        });
    }
    useEffect(() => {
        // console.log(stripePromise);
        // const stripe  = initStripe();
        // // console.log(stripe);
        // // return;
        // stripe.then((d) => {
        //     // console.log();
        //     // d.customers.list().then((ddd)=>{console.log(ddd)})
        //    const cc =  d.customers.listSources(
        //         'cus_C7kp9txX7uPYx4',
        //       ).then((dd) =>{
        //           console.log(dd)
        //       })
        // })
        // return;
        // stripePromise.then((d) => {
        //     console.log(Object.keys(d), d);
        //     return;
        //     // cus_C7kp9txX7uPYx4
        //     d.accounts.list(
        //         {limit: 3},
        //         function(err, accounts) {
        //             console.log(accounts);

        //             // asynchronously called
        //         }
        //       );
        // })

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
                                <div className="profile_image">
                                    <img src={userProfile} alt="" />
                                </div>
                                <div className="profile_name">John Wick</div>
                                <div className="profile_email">johnwick@gmail.com</div>
                                <div className="divider"></div>
                                <div className="profile_info">
                                    <div className="row">
                                        <div className="col">First Name</div>
                                        <div className="col text-right">Jhon</div>
                                    </div>

                                    <div className="row">
                                        <div className="col">Last Name</div>
                                        <div className="col text-right">wick</div>
                                    </div>

                                    <div className="row">
                                        <div className="col">Email</div>
                                        <div className="col text-right">JhonWick@gmail.com</div>
                                    </div>

                                    <div className="row">
                                        <div className="col">Phone</div>
                                        <div className="col text-right">878-778-9877</div>
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
                                        <button className="btn">ADD</button>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="cards">
                                    {/* <Elements stripe={stripePromise}>
                                            <CardElement
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: '16px',
                                                        color: '#424770',
                                                        '::placeholder': {
                                                            color: '#aab7c4',
                                                        },
                                                    },
                                                    invalid: {
                                                        color: '#9e2146',
                                                    },
                                                },
                                            }}
                                        />
                                    </Elements> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default withRouter(Profile);
