import { withRouter, Link } from "react-router-dom";
import React, { useState } from "react";
import queryString from "query-string";
import Header from "app/components/Header";
import { AuthContext } from "contexts/authContext";

import history from "../../utils/history";
import Password from "../../assets/password.svg";
import { resetPasswordWithToken } from "utils/api-routes/api-routes.util";

const Changepasswordwithtoken = (props) => {
//   console.log(props.location.search);
  const values = queryString.parse(props.location.search);
//   console.log(values);
  const [password, setpassword] = React.useState("");
  const [validPassword, setValidPassword] = React.useState(true);
  const [passwordMsg,setPasswordMsg] = useState(false)
  const onSubmit = (e) => {
    // props.setStep(2)
    e.preventDefault();
    resetPasswordWithToken(
      queryString.stringify({
        thetoken: values.thetoken,
        newPassword: password,
      })
    ).subscribe((response) => {
      if (response.response.Requested_Action) {
        setPasswordMsg("true")
        // history.push("/login");
      } else {
        setPasswordMsg("Link has expired")
      }
    });
  };

  const confirmPassword = (cp) => {
    setValidPassword(cp == password);
  };
  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="other_pages_container full_height">
        <h1 className="title text-center">Change Password</h1>
        <div className="container">
          <div className="signup_holder">
            <form onSubmit={onSubmit}>
              <div
                className="form-group"
                css={{ maxWidth: "464px", margin: "30px auto" }}
              >
                <div className="input-group">
                  <img className="input_icon" src={Password} alt="" />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    autoComplete="off"
                    required
                    onChange={(e) => {
                      setpassword(e.currentTarget.value);
                    }}
                  />
                </div>
              </div>
              <div
                className="form-group"
                css={{ maxWidth: "464px", margin: "30px auto" }}
              >
                <div className="input-group">
                  <img className="input_icon" src={Password} alt="" />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    autoComplete="off"
                    required
                    onChange={(e) => {
                      confirmPassword(e.currentTarget.value);
                    }}
                  />
                </div>
                {!validPassword ? (
                  <span className="password_not_matched">
                    Passwords does not match
                  </span>
                ) : (
                  ""
                )}
              </div>

              <button
                css={{ maxWidth: "257px", marginTop: "30px" }}
                type="submit"
                id="formButton"
                disabled={!validPassword || password.length == 0}
                className="btn btn-primary btn-block submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {passwordMsg ? (
        <div className="not_verified">
          <div className="error_msg">
            <div
              className="close_verification_popup"
              onClick={() => {
                setPasswordMsg(false);
              }}
            >
              &times;
            </div>
            {passwordMsg ? passwordMsg == "true" ? (
              <>
              Your Password has been updated. <Link to="/login">Click Here</Link> to Login.
              </>
            ) : passwordMsg : ""}
            {/*  */}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default withRouter(Changepasswordwithtoken);
