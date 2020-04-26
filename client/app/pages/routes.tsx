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
import {ForgotPassword} from './users/ForgotPassword';

export const ROUTES = [
  {
    component: Login,
    isPublic: true,
    path: "/login",
    slug: "login",
    title: "Login",
    isLogin: true,
    redirectTo: "/profile",
  },
  {
    component: Signup,
    isPublic: true,
    path: "/signup",
    slug: "signup",
    title: "Sign Up",
    isLogin: true,
    redirectTo: "/profile",
  },
  {
    component: Profile,
    isExact: true,
    path: "/profile",
    slug: "Profile",
    title: "Profile",
    redirectTo: "/login",
  },
  {
    component: MyOrders,
    isExact: true,
    path: "/orders",
    slug: "Orders",
    title: "Orders",
    isLogin: false,
    redirectTo: "/login",
  }, {
    component: MyOrderDetails,
    isExact: true,
    path: "/ordersdetails",
    slug: "ordersDetails",
    title: "ordersDetails",
    isLogin: false,
    redirectTo: "/login",
  }, {
    component: UserOrder,
    isExact: true,
    path: "/order",
    slug: "userorder",
    title: "userorder",
    isLogin: false,
    redirectTo: "/login",
  },
  {
    component: Checkout,
    isExact: true,
    isPublic: true,
    path: "/checkout/:orderid",
    slug: "checkout",
    title: "checkout",
    isLogin: false,
    redirectTo: "/login",
  }, {
    component: Receipt,
    isExact: true,
    isPublic: true,
    path: "/receipt/:orderid",
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
  },{
    component: Homepage,
    isExact: true,
    isPublic: true,
    path: "/#:sectionid?",
    slug: "dashboard",
    title: "dashboard",
    redirectTo: "/login",
  }, {
    component: AdminLogin,
    isPublic: true,
    path: "/admin",
    slug: "admin",
    title: "admin",
    isLogin: false,
    redirectTo: "/dashboard",
  }, {
    component: AdminOrders,
    isPublic: true,
    path: "/allorders",
    slug: "admin/orders",
    title: "admin/orders",
    isLogin: false,
    redirectTo: "/dashboard",
  }, {
    component: AdminUserManagement,
    isPublic: true,
    path: "/user-management",
    slug: "admin/user-management",
    title: "admin/user-management",
    isLogin: false,
    redirectTo: "/dashboard",
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
