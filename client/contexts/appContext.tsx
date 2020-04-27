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
}

export const AppContext = React.createContext({} as IContextProps);

export default ({ children }) => {
  const dashboard = false;
  const [myOrders, setMyOrders] = useState([]);
  const [myInfo, setMyInfo] = useState(false);

  const getMyOrders = () => {
    getMyOrdersAPI().subscribe((response) => {
      setMyOrders(response.response.data);
    });
  };

  const getMyInfo = () => {
    getMyInfoAPI().subscribe((response) => {
      console.log(response.response);
      setMyInfo(response.response.data);
    });
  };

  const defaultContext = {
    dashboard,
    getMyOrders,
    myOrders,
    myInfo,
    getMyInfo,
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};
