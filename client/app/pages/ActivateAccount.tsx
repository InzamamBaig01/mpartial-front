import { withRouter, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import Header from "app/components/Header";
import { AuthContext } from "contexts/authContext";

import history from "../../utils/history";
import successicon from "../../assets/success_icon.png";
import erroricon from "../../assets/error_icon.png";
import { ActivateAccountAPI } from "utils/api-routes/api-routes.util";

const ActivateAccount = (props) => {
  //   console.log(props.location.search);
  const values = queryString.parse(props.location.search);
  //   console.log(values);

  const [success, setSuccess] = useState("false");

  useEffect(() => {
    ActivateAccountAPI(
      queryString.stringify({
        thetoken: values.thetoken,
      })
    ).subscribe((response) => {
      if (response.response.Requested_Action) {
        setSuccess("true");
      } else {
        console.log(response.response.Message);
        setSuccess(response.response.Message);
      }
    });
  }, []);
  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="other_pages_container full_height">
        <h1 className="title text-center">Email Verification</h1>
        <div className="container">
          <div className="signup_holder">
            <h4>
              {success == "true" ? (
                <>
                  <img src={successicon} className="verif_image" alt="" />
                  Your email address is confirmed.
                  <Link to="/login">Click here</Link> to Sign In
                </>
              ) : success != "false" ? (
                <>
                  <img src={erroricon} className="verif_image" alt="" />
                  The link has expired. Please try again.
                </>
              ) : (
                ""
              )}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ActivateAccount);
