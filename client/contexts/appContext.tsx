import * as React from "react";
import {
  getMyOrdersAPI,
  getMyInfoAPI,
  subscriptionHistory,
  getMyChildAccounts,
  allADOrders,
  allADUsers,
  getSubscriptionPlans,
  setDefaultPaymentMenthod,
  allSubscriptions,
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
  getMyPlans: Function;
  myOrder: any;
  getMyInfo: Function;
  myPlans: any;
  setMyPlans: Function;
  getInvitedUsers: Function;
  invitedUsers: any;
  myInfo: any;
  subscriptions: any;
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
  setSingleUserDetails: Function;
  singleUserDetails: any;
  getMyInvitedUser: Function;
  getAllSubscriptions: Function;
  histories: any;
  setHistory: Function;
  getHistory: Function;
}

export const AppContext = React.createContext({} as IContextProps);

export default ({ children }) => {
  const dashboard = false;
  const [myOrders, setMyOrders] = useState([]);
  const [histories, setHistory] = useState([]);

  const [myPlans, setMyPlans] = useState([]);
  const [myInfo, setMyInfo] = useState(false);
  const [subscriptions, setSubscriptions] = useState(false);
  const [invitedUsers, getInvitedUsers] = useState([]);
  const [singleOrderDetails, setSingleOrderDetails] = useState(false);
  const [singleADOrderDetails, setSingleADOrderDetails] = useState(false);
  const [price, setPrice] = useState(750);
  const [AllOrders, setAllOrders] = useState([]);
  const [AllUsers, setAllUsers] = useState([]);
  const { showLoader, hideLoader } = useContext(AppAlertsContext);
  const { logout } = useContext(AuthContext);
  const [singleUserDetails, setSingleUserDetails] = useState(false);
  // console.log(showLoader);
  const getMyInvitedUser = () => {
    // showLoader();
    getMyChildAccounts().subscribe((response) => {
      getInvitedUsers(response.response.data);
      // hideLoader();
    });
  };

  const getMyOrders = () => {
    // showLoader();
    getMyOrdersAPI().subscribe((response) => {
      setMyOrders(response.response.data);
      // hideLoader();
    });
  };

  const getHistory = () => {
    // showLoader();
    subscriptionHistory().subscribe((response) => {
      setHistory(response.response.data);
    });
  };

  const getMyPlans = () => {
    // showLoader();
    getSubscriptionPlans().subscribe((response) => {
      setMyPlans(response.response.data);
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

  const getAllSubscriptions = () => {
    // showLoader();
    allSubscriptions().subscribe((response) => {
      setSubscriptions(response.response.data);
      // hideLoader();
    });
  };

  const getADUserByID = (id, orders?) => {
    return orders.filter((order) => order.emailAddress == id)[0];
  };

  const getADUserById = (id) => {
    setSingleUserDetails(false);

    // showLoader();
    allADUsers().subscribe((response) => {
      setAllUsers(response.response.data);
      // hideLoader();()
      setSingleUserDetails(getADUserByID(id, response.response.data));
    });
  };

  const getallADUsers = () => {
    //showLoader();
    allADUsers().subscribe((response) => {
      setAllUsers(response.response.data);
      console.log(response.response.data);
      //hideLoader();
    });
  };

  const defaultContext = {
    dashboard,
    getMyOrders,
    getMyPlans,
    myOrders,
    myInfo,
    getMyInfo,
    subscriptions,
    getInvitedUsers,
    invitedUsers,
    getOrderById,
    singleOrderDetails,
    price,
    getallADOrders,
    AllOrders,
    getallADUsers,
    myPlans,
    setMyPlans,
    AllUsers,
    histories,
    setHistory,
    getMyInvitedUser,
    getAllSubscriptions,
    getADOrderById,
    singleADOrderDetails,
    getADUserById,
    setSingleUserDetails,
    singleUserDetails,
    getHistory,
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};
