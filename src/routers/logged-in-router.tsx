import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { Restaurants } from "../pages/client/restaurants";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfilePage } from "../pages/user/edit-profile";

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile" exact>
    <EditProfilePage />
  </Route>,
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
        {data.whoami.role === "Client" && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
