import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../../contexts/authContext";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";

import Mail from "../../../assets/email.svg";
import Lock from "../../../assets/lock.svg";
import adminlogo from "../../../assets/adminlogo.svg";

import {
  resetPassword,
  forgotPasswordAPI,
} from "utils/api-routes/api-routes.util";
import Loader from "app/components/Loader";
interface IProps {}

export const AdminLogin: React.FC<IProps> = ({ ...props }) => {
  const {
    ADloginError,
    ADstatus,
    dispatchADLogin,
    setLoginError,
    payload,
  } = useContext(AuthContext);
  const [loginStatus, setLoginStatus] = useState(false);

  const [details, setDetails] = useState({
      username: '',
      password: '',
  })
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    dispatchADLogin(details);
  };

  useEffect(() => {
    // console.log(loginError);
    if (ADloginError)
      setLoginStatus(
        ADloginError == "A user could not be found with this email address."
          ? "Sorry, we couldn't find an account with that username or the password you entered isn't right"
          : ADloginError
      );
  }, [ADstatus, ADloginError]);

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
      <div className="login_page">
        <div className="login_container container">
          <div className="text-center">
            <img src={adminlogo} alt="" />
          </div>
          <span className="title">
            Sign In with your mpartial admin account.
          </span>

          <div className="login_inner_Container">
            <form onSubmit={handleSubmitForm}>
              {/* <a href="#" className="forget_link">Forgot password?</a> */}
              <div className="form-group">
                <div className="input-group">
                  <img className="input_icon" src={Mail} alt="" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    onChange={(e) => {
                        setDetails({
                            ...details,
                            username: e.currentTarget.value
                        })
                    }}
                    value={details.username}
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
                    value={details.password}
                    onChange={(e) => {
                        setDetails({
                            ...details,
                            password: e.currentTarget.value
                        })
                    }}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block submit"
                >
                  Sign in
                  <Loader></Loader>
                </button>
            </form>
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

export default withRouter(AdminLogin);
