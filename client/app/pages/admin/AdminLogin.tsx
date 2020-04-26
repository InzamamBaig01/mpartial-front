import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../../contexts/authContext";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";

import Mail from "../../../assets/email.svg";
import Lock from "../../../assets/lock.svg";
import adminlogo from "../../../assets/adminlogo.svg";

interface IProps { }

export const AdminLogin: React.FC<IProps> = ({ ...props }) => {
    const {
        loginError,
        status,
        dispatchLogin,
        emailOnChange,
        passwordOnChange,
    } = useContext(AuthContext);
    const [loginStatus, setLoginStatus] = useState(loginError);
    const handleEmailChange = (e: any) => emailOnChange(e.target.value);
    const handlePasswordChange = (e: any) => passwordOnChange(e.target.value);
    const handleSubmitForm = (e: any) => {
        e.preventDefault();
        dispatchLogin();
    };

    useEffect(() => {
        setLoginStatus(loginError);
    }, [status, loginError]);

    return (
        <>
            <div className="login_page">
                <div className="login_container container">
                    <div className="text-center">
                        <img src={adminlogo} alt="" />
                    </div>
                    <span className="title">Sign In with your mpartial admin account.</span>

                    <div className="login_inner_Container">
                        <form onSubmit={handleSubmitForm}>
                            {/* <a href="#" className="forget_link">Forgot password?</a> */}
                            <div className="form-group">
                                <div className="input-group">
                                    <img className="input_icon" src={Mail} alt="" />
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        onChange={handleEmailChange}
                                        autocomplete="off"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <img className="input_icon" src={Lock} alt="" />
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={handlePasswordChange}
                                        autocomplete="off"
                                        required
                                    />
                                </div>
                            </div>

                            <Link to="/profile">

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block submit"
                                >
                                    Sign in
              </button>
                            </Link>

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(AdminLogin);