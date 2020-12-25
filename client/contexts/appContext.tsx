import * as React from "react";
import {
  getMyOrdersAPI,
  getMyInfoAPI,
  allADOrders,
  allADUsers,
  setDefaultPaymentMenthod,
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
  getallADOrders: Function;
  AllOrders: any;
  getallADUsers: Function;
  AllUsers: any;
  getADOrderById: Function;
  singleADOrderDetails: any;
  getADUserById: Function;
  singleUserDetails: any;
}

export const AppContext = React.createContext({} as IContextProps);

export default ({ children }) => {
  const dashboard = false;
  const [myOrders, setMyOrders] = useState([]);
  const [myInfo, setMyInfo] = useState(false);
  const [singleOrderDetails, setSingleOrderDetails] = useState(false);
  const [singleADOrderDetails, setSingleADOrderDetails] = useState(false);
  const [price, setPrice] = useState(750);
  const [AllOrders, setAllOrders] = useState([]);
  const [AllUsers, setAllUsers] = useState([]);
  const { showLoader, hideLoader } = useContext(AppAlertsContext);
  const { logout } = useContext(AuthContext);
  const [singleUserDetails, setSingleUserDetails] = useState(false);
  // console.log(showLoader);
  const getMyOrders = () => {
    // showLoader();
    getMyOrdersAPI().subscribe((response) => {
      setMyOrders(response.response.data);
      // hideLoader();
    });
  };

  const getMyInfo = (isFirstCardAdded?) => {
    // showLoader();
    getMyInfoAPI().subscribe((response) => {
      // console.log(response.response);
      if (response.response.Requested_Action) {
        if (
          isFirstCardAdded &&
          response.response.data.stripeCustomerCard.length == 1
        ) {
          setDefaultPaymentMenthod(
            response.response.data.stripeCustomerCard[0].paymentMethodId
          ).subscribe((response) => {
            getMyInfo();
          });
        } else {
          setMyInfo(response.response.data);
          localStorage.setItem(
            "profile",
            JSON.stringify(response.response.data)
          );
        }
        // hideLoader();
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

  const getADOrderByID = (id, orders?) => {
    return orders.filter((order) => order.id == id)[0];
  };

  const getADOrderById = (id) => {
    // showLoader();
    allADOrders().subscribe((response) => {
      setAllOrders(response.response.data);
      // hideLoader();
      setSingleADOrderDetails(getADOrderByID(id, response.response.data));
    });
  };

  const getallADOrders = () => {
    // showLoader();
    allADOrders().subscribe((response) => {
      setAllOrders(response.response.data);
      // hideLoader();
    });
  };

  const getADUserByID = (id, orders?) => {
    return orders.filter((order) => order.emailAddress == id)[0];
  };

  const getADUserById = (id) => {
    // showLoader();
    allADUsers().subscribe((response) => {
      setAllUsers(response.response.data);
      // hideLoader();
      setSingleUserDetails(getADUserByID(id, response.response.data));
    });
  };

  const getallADUsers = () => {
    // showLoader();
    allADUsers().subscribe((response) => {
      setAllUsers(response.response.data);
      console.log(response.response.data);
      // hideLoader();
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
    getallADOrders,
    AllOrders,
    getallADUsers,
    AllUsers,
    getADOrderById,
    singleADOrderDetails,
    getADUserById,
    singleUserDetails,
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};
