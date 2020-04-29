import * as React from "react";
import {
  getUsers,
  GetAllRoles,
  GetAllPrivileges,
} from "../utils/api-routes/api-routes.util";
import { useState } from "react";
import * as jsoncompare from "js-object-compare";

interface IContextProps {
  alertDetails: object;
  showAlert: Function;
  hideAlert: Function;
  showLoader: Function;
  hideLoader: Function;
  loader: any;
}

export const AppAlertsContext = React.createContext({} as IContextProps);

export default ({ children }) => {
  const [alertDetails, setAlertDetails] = useState({
    isShowAlert: false,
    isTimely: false,
    message: "",
    alertType: "success",
  } as alertDetails);

  const [loader, setLoader] = useState(false);

  const showAlert = (data: alertDetails) => {
    setAlertDetails({
      isShowAlert: true,
      isTimely: data.isTimely,
      message: data.message,
      alertType: data.alertType,
    });
  };

  const hideAlert = () => {
    setAlertDetails({ ...alertDetails, isShowAlert: false });
  };

  const showLoader = () => {
    setLoader(true);
  };

  const hideLoader = () => {
    setLoader(false);
  };

  const defaultContext = {
    alertDetails,
    showAlert,
    hideAlert,
    showLoader,
    hideLoader,
    loader,
  };

  return (
    <AppAlertsContext.Provider value={defaultContext}>
      {children}
    </AppAlertsContext.Provider>
  );
};
