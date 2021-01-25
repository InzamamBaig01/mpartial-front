import { withRouter, Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import queryString from "query-string";
import Header from "app/components/Header";
import { AppContext } from "contexts/appContext";

import { acceptInvite } from "utils/api-routes/api-routes.util";

const AcceptInvite = (props) => {
  const { getMyInfo, myInfo } = useContext(AppContext);

  const value = queryString.parse(props.location.search);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    acceptInvite(
      queryString.stringify({
        invitedsemail: value.invitedsemail,
        inviteid: value.inviteid,
      })
    ).subscribe((response) => {
      if (response.response.Requested_Action) {
        getMyInfo();
      } else {
        setSuccess(response.response.Message);
      }
    });
  }, []);
  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="other_pages_container full_height">
        <h1 className="title text-center">Invitation</h1>
        <div className="container">
          <div className="signup_holder">
            <h4>
              {success
                ? success
                : myInfo
                ? `You have accepted Invitation from ${myInfo.companyemail}`
                : ""}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(AcceptInvite);
