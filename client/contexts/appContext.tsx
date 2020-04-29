import * as React from "react";
import {
  getMyOrdersAPI,
  getMyInfoAPI,
} from "../utils/api-routes/api-routes.util";
import { useState, useEffect, useContext } from "react";
import * as jsoncompare from "js-object-compare";
import history from "../utils/history";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AppAlertsContext } from "./appAlertsContext";
import { AuthContext } from "./authContext";
interface IContextProps {
  dashboard: boolean;
  getMyOrders: Function;
  myOrder: any;
  getMyInfo: Function;
  myInfo: any;
  getOrderById: Function;
  singleOrderDetails: any;
  price: any;
}

export const AppContext = React.createContext({} as IContextProps);

export default ({ children }) => {
  const dashboard = false;
  const [myOrders, setMyOrders] = useState([]);
  const [myInfo, setMyInfo] = useState(false);
  const [singleOrderDetails, setSingleOrderDetails] = useState(false);
  const [price, setPrice] = useState(750);
  const { showLoader, hideLoader } = useContext(AppAlertsContext);
  const { logout } = useContext(AuthContext);
  // console.log(showLoader);
  const getMyOrders = () => {
    // showLoader();
    getMyOrdersAPI().subscribe((response) => {
      setMyOrders(response.response.data);
      // hideLoader();
    });
  };

  const getMyInfo = () => {
    // showLoader();
    getMyInfoAPI().subscribe((response) => {
      // console.log(response.response);
      if (response.response.Requested_Action) {
        setMyInfo(response.response.data);
        // hideLoader();

        localStorage.setItem("profile", JSON.stringify(response.response.data));
      } else {
        logout();
      }
    });
  };

  const getOrderByID = (id, orders?) => {
    return orders.filter((order) => order.id == id)[0];
  };

  const getOrderById = (id) => {
    // showLoader();
    getMyOrdersAPI().subscribe((response) => {
      setMyOrders(response.response.data);
      // hideLoader();
      setSingleOrderDetails(getOrderByID(id, response.response.data));
    });
  };

  const defaultContext = {
    dashboard,
    getMyOrders,
    myOrders,
    myInfo,
    getMyInfo,
    getOrderById,
    singleOrderDetails,
    price,
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};
