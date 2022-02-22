import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Auth from "routes/Auth";
import Navigation from "components/Navigation";
import { routes } from "routes";

interface IAppRouterProps {
  isLoggedIn: boolean;
}

const AppRouter: React.FC<IAppRouterProps> = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path={routes.home}>
              <Home />
            </Route>
            <Route exact path={routes.profile}>
              <Profile />
            </Route>
          </>
        ) : (
          <>
            <Route exact path={routes.home}>
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
