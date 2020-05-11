import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../../contexts/authContext";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";
import { AppAlertsContext } from "contexts/appAlertsContext";
import Mail from "../../../assets/email.svg";
import Lock from "../../../assets/lock.svg";
import { forgotPasswordAPI } from "utils/api-routes/api-routes.util";
import Loader from "app/components/Loader";
interface IProps {}

export const ForgotPassword: React.FC<IProps> = ({ ...props }) => {
  const [email, setEmail] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const { showLoader, hideLoader } = React.useContext(AppAlertsContext);
  useEffect(() => {
    return () => {
     // console.log("cleaned up");
      setLoginStatus(false);
    };
  }, []);

  const resendEmail = (e) => {
    e.preventDefault();
    showLoader();
    forgotPasswordAPI({
      emailaddress: email,
    }).subscribe((response) => {
      if (response.response.Requested_Action) {
        hideLoader();
        setLoginStatus("A password recovery email has been sent to entered email.");
      }
    });
  };

  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="login_page">
        <div className="login_container container">
          <span className="title">Forgot your Password?</span>

          <div className="login_inner_Container">
            <form onSubmit={resendEmail}>
              {/* <a href="#" className="forget_link">Forgot password?</a> */}
              <div className="form-group">
                <div className="input-group">
                  <img className="input_icon" src={Mail} alt="" />
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email "
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block submit"
              >
                Submit
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
            {loginStatus ? loginStatus : ""}
            {/*  */}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default withRouter(ForgotPassword);
