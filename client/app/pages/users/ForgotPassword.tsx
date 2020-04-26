import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../../contexts/authContext";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";

import Mail from "../../../assets/email.svg";
import Lock from "../../../assets/lock.svg";
interface IProps { }

export const ForgotPassword: React.FC<IProps> = ({ ...props }) => {

  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="login_page">
        <div className="login_container container">
          <span className="title">Forgot your Password?</span>

          <div className="login_inner_Container">
            <form>
              {/* <a href="#" className="forget_link">Forgot password?</a> */}
              <div className="form-group">
                <div className="input-group">
                  <img className="input_icon" src={Mail} alt="" />
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email "
                    autocomplete="off"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block submit"
              >
                Submit
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
    </>
  );
};

export default withRouter(ForgotPassword);
