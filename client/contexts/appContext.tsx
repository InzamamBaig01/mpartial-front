import * as React from "react";
import {
  getMyOrdersAPI,
  getMyInfoAPI,
} from "../utils/api-routes/api-routes.util";
import { useState, useEffect } from "react";
import * as jsoncompare from "js-object-compare";
import history from "../utils/history";
import { useParams } from "react-router-dom";
import moment from "moment";
interface IContextProps {
  dashboard: boolean;
  getMyOrders: Function;
  myOrder: any;
  getMyInfo: Function;
  myInfo: any;
  getOrderById: Function;
  singleOrderDetails: any;
}

export const AppContext = React.createContext({} as IContextProps);

export default ({ children }) => {
  const dashboard = false;
  const [myOrders, setMyOrders] = useState([]);
  const [myInfo, setMyInfo] = useState(false);
  const [singleOrderDetails, setSingleOrderDetails] = useState(false);

  const getMyOrders = () => {
    getMyOrdersAPI().subscribe((response) => {
      setMyOrders(response.response.data);
    });
  };

  const getMyInfo = () => {
    getMyInfoAPI().subscribe((response) => {
      // console.log(response.response);
      setMyInfo(response.response.data);
      localStorage.setItem("profile", JSON.stringify(response.response.data));
    });
  };

  const getOrderByID = (id, orders?) => {
    return orders.filter((order) => order.id == id)[0];
  };

  const getOrderById = (id) => {
    getMyOrdersAPI().subscribe((response) => {
      setMyOrders(response.response.data);
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
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};
