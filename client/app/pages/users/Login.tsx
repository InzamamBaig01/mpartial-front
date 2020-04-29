import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../../contexts/authContext";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";

import Mail from "../../../assets/email.svg";
import Lock from "../../../assets/lock.svg";
import {
  resetPassword,
  forgotPasswordAPI,
} from "utils/api-routes/api-routes.util";
import Loader from "app/components/Loader";
interface IProps {}

export const Login: React.FC<IProps> = ({ ...props }) => {
  const {
    loginError,
    status,
    dispatchLogin,
    emailOnChange,
    passwordOnChange,
    setLoginError,
    payload,
  } = useContext(AuthContext);
  const [loginStatus, setLoginStatus] = useState(false);
  const handleEmailChange = (e: any) => emailOnChange(e.target.value);
  const handlePasswordChange = (e: any) => passwordOnChange(e.target.value);
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    dispatchLogin();
  };

  useEffect(() => {
    console.log(loginError);
    if (loginError)
      setLoginStatus(
        loginError == "A user could not be found with this email address."
          ? "Sorry, we couldn't find an account with that username or the password you entered isn't right"
          : loginError
      );
  }, [status, loginError]);

  useEffect(() => {
    return () => {
      setLoginStatus(false);
      setLoginError(false);
    };
  }, []);

  const resendEmail = () => {
    forgotPasswordAPI({
      emailaddress: payload.username,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoginStatus(
          "Verification link has been sent. Please check your email."
        );
      }
    });
  };

  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="login_page">
        <div className="login_container container">
          <span className="title">Sign In with your mpartial account.</span>

          <div className="login_inner_Container">
            <form onSubmit={handleSubmitForm}>
              {/* <a href="#" className="forget_link">Forgot password?</a> */}
              <div className="form-group">
                <div className="input-group">
                  <img className="input_icon" src={Mail} alt="" />
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleEmailChange}
                    autoComplete="off"
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
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <div className="forgotP_container">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block submit"
              >
                Sign in
                <Loader></Loader>
              </button>
            </form>
            <div className="login_devider">
              <span>New to mpartial?</span>
            </div>

            <Link to="/signup">
              <button className="btn create_account">CREATE ACCOUNT</button>
            </Link>
          </div>
        </div>
      </div>
      {loginStatus ? (
        <div className="not_verified">
          <div className="error_msg">
            <div
              className="close_verification_popup"
              onClick={() => {
                setLoginStatus(false);
              }}
            >
              &times;
            </div>
            {loginStatus ==
            "This user is not allowed to login. Please verify your email address first." ? (
              <>
                You have not verified your email address.{" "}
                <a
                  href="#"
                  onClick={() => {
                    resendEmail();
                  }}
                >
                  Click here
                </a>{" "}
                to receive a verification email.
              </>
            ) : (
              loginStatus
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default withRouter(Login);
