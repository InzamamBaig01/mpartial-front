import { withRouter, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import Header from "app/components/Header";
import { AuthContext } from "contexts/authContext";

import history from "../../utils/history";
import successicon from "../../assets/checkBig.png";
import erroricon from "../../assets/chat.png";
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
      <div className="">
        <div className="signup_holder ">
          <div className="container " style={{ height: "100vh" }}>
            {success == "true" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto",
                  height: "100%",
                }}
              >
                <div className="mb-4">
                  <img src={successicon} className="verif_image" alt="" />
                </div>
                <div className="mb-4">
                  <h4>
                    {" "}
                    <b> Your email address is verified</b>{" "}
                  </h4>
                </div>
                <div>
                  <a className="btn" href="/login">
                    Proceed
                  </a>
                </div>
              </div>
            ) : success != "false" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto",
                  height: "100%",
                }}
              >
                <div className="mb-4">
                  <img src={erroricon} className="verif_image" alt="" />
                </div>
                <div className="mb-4">
                  <h4>
                    <b>
                      {" "}
                      Verification link has expired. Please Sign In <br /> to
                      resend the verification email again.{" "}
                    </b>
                  </h4>
                </div>
                <div>
                  <a className="btn" href="/login">
                    Signin
                  </a>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ActivateAccount);
