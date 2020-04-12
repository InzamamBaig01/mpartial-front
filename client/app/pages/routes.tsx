import RedirectPage from "./redirect/RedirectPage";
import HomePage from "./Homepage/DashboardPage";

export const ROUTES = [
  {
    component: HomePage,
    isPublic: true,
    path: "/",
    slug: "dashboard",
    title: "dashboard",
  },
];
