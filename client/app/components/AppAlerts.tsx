import React, { useEffect } from "react";
import { AppAlertsContext } from "../../contexts/appAlertsContext";
import { useContext } from "react";
import successalerticon from "../../assets/successalert.svg";
import erroralerticon from "../../assets/erroralert.svg";
const AppAlerts = () => {
  const { alertDetails, hideAlert } = useContext(AppAlertsContext);

  return (
    <>
      {alertDetails.isShowAlert ? (
        <>
          <div className={`app_alert ${alertDetails.alertType}`} onClick={
              hideAlert
          }>
            {alertDetails.alertType === "success" ? (
              <img src={successalerticon} alt="" />
            ) : (
              <img src={erroralerticon} alt="" />
            )}
            {alertDetails.message}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default AppAlerts;
