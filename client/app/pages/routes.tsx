import Login from "./users/Login";
import RedirectPage from "./redirect/RedirectPage";
import Homepage from "./Homepage/DashboardPage";
import Signup from "./users/Signup";
import Profile from "./users/Profile";
import MyOrders from "./users/MyOrders";
import MyOrderDetails from "./users/MyOrderDetails";
import UserOrder from "./UserOrder";
import Checkout from "./Checkout";
import Receipt from "./receipt";
import AdminLogin from "./admin/AdminLogin";
import AdminOrders from "./admin/AdminOrders";
import AdminUserManagement from "./admin/AdminUserManagement";
import { ForgotPassword } from "./users/ForgotPassword";
import TermsCondition from "./TermsCondition";
import Changepasswordwithtoken from "./Changepasswordwithtoken";
import ActivateAccount from "./ActivateAccount";
import AdminOrderDetails from "./admin/AdminOrderDetails";

export const ROUTES = [
  {
    component: Login,
    isPublic: true,
    path: "/login",
    slug: "login",
    title: "Login",
    isLogin: true,
  },
  {
    component: Signup,
    isPublic: true,
    path: "/signup",
    slug: "signup",
    title: "Sign Up",
    isLogin: true,
  },
  {
    component: TermsCondition,
    isPublic: true,
    path: "/terms",
    slug: "terms",
    title: "terms",
  },
  {
    component: Changepasswordwithtoken,
    isPublic: true,
    path: "/changepasswordwithtoken",
    slug: "changepasswordwithtoken",
    title: "changepasswordwithtoken",
  },{
    component: ActivateAccount,
    isPublic: true,
    path: "/Client/ConfirmEmail",
    slug: "emailverification",
    title: "emailverification",
  },
  {
    component: Profile,
    isExact: true,
    checkLogin: true,
    path: "/profile",
    slug: "Profile",
    title: "Profile",
    redirectTo: "/login",
  },
  {
    component: MyOrders,
    isExact: true,
    path: "/orders",
    checkLogin: true,
    slug: "Orders",
    title: "Orders",
    isLogin: false,
    redirectTo: "/login",
  },
  {
    component: MyOrderDetails,
    isExact: true,
    path: "/ordersdetails/:orderid",
    checkLogin: true,
    slug: "ordersDetails",
    title: "ordersDetails",
    isLogin: false,
    redirectTo: "/login",
  },
  {
    component: UserOrder,
    isExact: true,
    path: "/order",
    checkLogin: true,
    slug: "userorder",
    title: "userorder",
    isLogin: false,
    redirectTo: "/login",
  },
  {
    component: Checkout,
    isExact: true,
    path: "/checkout/:orderid",
    checkLogin: true,
    slug: "checkout",
    title: "checkout",
    isLogin: false,
    redirectTo: "/login",
  },
  {
    component: Receipt,
    isExact: true,
    path: "/receipt/:orderid",
    checkLogin: true,
    slug: "receipt",
    title: "receipt",
    isLogin: false,
    redirectTo: "/login",
  },
  {
    component: RedirectPage,
    isPublic: true,
    path: "/redirect",
    slug: "redirect",
    title: "Redirect",
  },
  {
    component: Homepage,
    isExact: true,
    isPublic: true,
    path: "/",
    slug: "dashboard",
    title: "dashboard",
    redirectTo: "/login",
  },
  {
    component: Homepage,
    isExact: true,
    isPublic: true,
    path: "/#:sectionid?",
    slug: "dashboard",
    title: "dashboard",
    redirectTo: "/login",
  },
  {
    component: AdminLogin,
    path: "/mpartialadmin",
    slug: "admin",
    title: "admin",
    isLogin: true,
    isAD: true,
    redirectTo: "/user-management",

  },
  {
    component: AdminOrders,
    path: "/allorders",
    slug: "admin/orders",
    title: "admin/orders",
    redirectTo: "/mpartialadmin",
    checkADLogin: true,
    isAD: true,
  },{
    component: AdminOrderDetails,
    path: "/details/:orderid",
    slug: "admin/orders/details",
    title: "admin/orders/details",
    redirectTo: "/mpartialadmin",
    isAD: true,
    checkADLogin: true,

  },
  {
    component: AdminUserManagement,
    path: "/user-management",
    slug: "admin/user-management",
    title: "admin/user-management",
    redirectTo: "/mpartialadmin",
    isAD: true,
    checkADLogin: true,
  },
  {
    component: ForgotPassword,
    isPublic: true,
    path: "/forgot-password",
    slug: "forgot-password",
    title: "forgot-password",
    isLogin: false,
    redirectTo: "/forgot-password",
  },
];
