import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../../contexts/authContext";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";

import Mail from "../../../assets/email.svg";
import Lock from "../../../assets/lock.svg";
interface IProps { }

export const Login: React.FC<IProps> = ({ ...props }) => {
  const {
    loginError,
    status,
    dispatchLogin,
    emailOnChange,
    passwordOnChange,
  } = useContext(AuthContext);
  const [loginStatus, setLoginStatus] = useState(false);
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
              <div className="forgotP_container">
                <Link to="/forgotpassword">Forgot Password?</Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block submit"
              >
                Sign in
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
      {
        loginStatus ? (
          <div className="not_verified" onClick={() => {
            setLoginStatus(false);
          }}>
            <div className="error_msg"  onClick={() => {
            setLoginStatus(true);
          }}>
              You have not verified your email address. <a href="#">Click here</a> to receive a verification email.
        </div>
          </div>
        ) : ''
     }
    </>
  );
};

export default withRouter(Login);
