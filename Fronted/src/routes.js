import Main from "./pages/MainPage";


const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/repFeed",
    name: "repFeed",
    component: () => import("./pages/repFeed"),
  },
  {
    path: "/population",
    name: "population",
    component: () => import("./pages/population"),
  },
];

export default routes;

