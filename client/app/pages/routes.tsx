import Login from "./users/Login";
import RedirectPage from "./redirect/RedirectPage";
import Homepage from "./Homepage/DashboardPage";
import Signup from "./users/Signup";
import Profile from "./users/Profile";
import MyOrders from "./users/MyOrders";
import MyOrderDetails from "./users/MyOrderDetails";
import UserOrder from "./UserOrder";
import Checkout from "./Checkout";

export const ROUTES = [
  {
    component: Login,
    isPublic: true,
    path: "/login",
    slug: "login",
    title: "Login",
    isLogin: false,
    redirectTo: "/dashboard",
  },
  {
    component: Signup,
    isPublic: true,
    path: "/signup",
    slug: "signup",
    title: "Sign Up",
    isLogin: false,
    redirectTo: "/dashboard",
  },
  {
    component: Profile,
    isExact: true,
    isPublic: true,
    path: "/profile",
    slug: "Profile",
    title: "Profile",
    redirectTo: "/login",
  },
  {
    component: MyOrders,
    isExact: true,
    isPublic: true,
    path: "/orders",
    slug: "Orders",
    title: "Orders",
    isLogin: false,
    redirectTo: "/login",
  }, {
    component: MyOrderDetails,
    isExact: true,
    isPublic: true,
    path: "/ordersdetails",
    slug: "ordersDetails",
    title: "ordersDetails",
    isLogin: false,
    redirectTo: "/login",
  }, {
    component: UserOrder,
    isExact: true,
    isPublic: true,
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
    path: "/checkout",
    slug: "checkout",
    title: "checkout",
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
];
