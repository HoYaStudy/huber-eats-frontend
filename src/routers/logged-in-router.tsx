import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { Header } from "../components/header";
import { Restaurants } from "../pages/client/restaurants";
import { NotFound } from "../pages/404";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfilePage } from "../pages/user/edit-profile";
import { Search } from "../pages/client/search";
import { CategoryPage } from "../pages/client/category";
import { RestaurantPage } from "../pages/client/restaurant";
import { AddRestaurant } from "../pages/owner/add-restaurants";
import { MyRestaurantsPage } from "../pages/owner/my-restaurants";
import { MyRestaurantPage } from "../pages/owner/my-restaurant";
import { AddDish } from "../pages/owner/add-dish";

const commonRoutes = [
  { path: "/confirm", component: <ConfirmEmail /> },
  { path: "/edit-profile", component: <EditProfilePage /> },
];

const clientRoutes = [
  { path: "/", component: <Restaurants /> },
  { path: "/search", component: <Search /> },
  { path: "/category/:slug", component: <CategoryPage /> },
  { path: "/restaurants/:id", component: <RestaurantPage /> },
];

const ownerRoutes = [
  { path: "/", component: <MyRestaurantsPage /> },
  { path: "/add-restaurant", component: <AddRestaurant /> },
  { path: "/restaurants/:id", component: <MyRestaurantPage /> },
  { path: "/restaurants/:restaurantId/add-dish", component: <AddDish /> },
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="text-xl font-medium tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        {commonRoutes.map((route) => (
          <Route key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        {data.whoami.role === "Client" &&
          clientRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.whoami.role === "Owner" &&
          ownerRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
