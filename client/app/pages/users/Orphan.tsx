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

export const Signup = () => {
  return (
    <>
      <Header isFixedColor={true}></Header>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          height: "100%",
          paddingTop: "90px",
          background: "rgba(242, 246, 247, 0.7) 0% 0% no-repeat padding-box",
          position: "relative",
        }}
      >
        {/*  */}
        <div className="help-icon"></div>

        <div className="container">
          <div
            className="row"
            style={{
              background: "#ffffff 0% 0% no-repeat padding-box",
              boxShadow: "0px 3px 6px rgb(0 0 0 / 16%)",
              borderRadius: "5px",
              opacity: "1",
            }}
          >
            <div className="col-md-6 col-sm-12 col-xs-12">
              <h4
                style={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "24px",
                  letterSpacing: "0px",
                  color: "#000000",
                  opacity: "1",
                  characterSpacing: "0",
                  lineSpacing: "60"
                }}
              >
                It's time to take your<br></br> account to the next level.<br></br>
             You are almost there.</h4>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <h5>You can:</h5>
              <h5>1.Subscribe to a Enterprise Plan</h5>
              <h5>2.Or...be invited as a Enterprise Collobrator</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Signup);
