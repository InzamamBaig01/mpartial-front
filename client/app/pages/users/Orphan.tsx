import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../../contexts/authContext";
import { withRouter, Link } from "react-router-dom";
import Header from "app/components/Header";
import styled from "styled-components";

const myStyle = styled.div`
  &:after {
    width: 100%;
    min-height: 100vh;
    height: 100%;
    padding-top: 90px;
    background: rgba(242, 246, 247, 0.7) 0% 0% no-repeat padding-box;
  }
`;

export const Orphan = () => {
  return (
    <>
      <Header isFixedColor={true}></Header>
      <div className="helper">
        {/*  */}
        <div className="help-icon"></div>

        <div className="container offer">
          <div
            className="row offer-row"
            style={{
              boxShadow: "0px 3px 6px rgb(0 0 0 / 16%)",
            }}
          >
            <div className="col-md-6 col-sm-12 col-xs-12 line">
              <h4 className="line-heading mobile-heading-one">
                It's time to take your<br></br> account to the next level.
                <br></br>
                You are almost there.
              </h4>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12 col-two">
              <h5 className="line-heading mobile-heading-two">You can:</h5>
              <h5 className="mobile-center">
                1. Subscribe to a Enterprise Plan <br></br>2. Or... be invited
                as a Enterprise Collobrator
              </h5>
            </div>
          </div>
          <div className="got-it-btn">
            <Link to="/profile">
              <button className="btn">GOT IT</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Orphan);
