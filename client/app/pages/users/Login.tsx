import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../../contexts/authContext";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";

import Mail from "../../../assets/email.svg";
import Lock from "../../../assets/lock.svg";
import {
  resetPassword,
  forgotPasswordAPI,
  resendActivationEmail,
} from "utils/api-routes/api-routes.util";
import Loader from "app/components/Loader";

import ReCAPTCHA from "react-google-recaptcha";
import appConfig from "../../../appconfig.json";
import FloatingLabel from "app/components/FloatingLabel";
import ReactIsCapsLockActive from "@matsun/reactiscapslockactive";

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
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleEmailChange = (e: any) => {
    setData({
      ...data,
      email: e.currentTarget.value,
    });
    emailOnChange(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setData({
      ...data,
      password: e.currentTarget.value,
    });
    passwordOnChange(e.target.value);
  };
  const [loginAttempt, setLoginAttempt] = useState(0);
  const captcha = React.createRef();
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    dispatchLogin();
  };

  const [isHuman, setIshuman] = useState(false);
  useEffect(() => {
    // console.log(loginError);
    if (loginError) {
      setLoginStatus(
        loginError == "A user could not be found with this email address."
          ? "Sorry, we couldn't find an account with that username or the password you entered isn't right."
          : loginError
      );
      setLoginAttempt(loginAttempt + 1);
      if (captcha.current) captcha.current.reset();
    }
  }, [status, loginError]);

  useEffect(() => {
    return () => {
      setLoginStatus(false);
      setLoginError(false);
      setLoginAttempt(0);
    };
  }, []);

  const resendEmail = () => {
    resendActivationEmail({
      emailaddress: payload.username,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoginStatus(
          "Verification link has been sent. Please check your email."
        );
      }
    });
  };
  const onCaptchaChange = (value) => {
    // console.log("Captcha value:", value);
    if (value) setIshuman(true);
  };

  const loginref = React.createRef();
  const passwordref = React.createRef();
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
                    onChange={handleEmailChange}
                    ref={loginref}
                    required
                  />
                  <FloatingLabel
                    label="Email"
                    inputRef={loginref}
                    inputValue={data.email}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <img className="input_icon" src={Lock} alt="" />
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    ref={passwordref}
                    onChange={handlePasswordChange}
                    required
                  />
                  <FloatingLabel
                    label="Password"
                    inputRef={passwordref}
                    inputValue={data.password}
                  />
                </div>
                <ReactIsCapsLockActive>
                  {(active) =>
                    active ? (
                      <div>
                        <i className="red">
                          <span className="password_not_matched">
                            Caps Lock is On, having Caps Lock on may cause you
                            to enter your password incorrectly.
                          </span>
                        </i>
                      </div>
                    ) : (
                      ""
                    )
                  }
                </ReactIsCapsLockActive>
              </div>
              <div className="forgotP_container">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              {loginAttempt > 5 && (
                <ReCAPTCHA
                  sitekey={appConfig.captchaKey}
                  onChange={onCaptchaChange}
                  ref={captcha}
                  className="captcha_box"
                />
              )}
              <button
                type="submit"
                className="btn btn-primary btn-block submit"
                id="formButton"
                disabled={loginAttempt > 5 && !isHuman}
              >
                <Loader text="Sign in"></Loader>
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
                to resend verification email.
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
