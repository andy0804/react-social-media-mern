import "./App.css";
import React, { Fragment, useEffect } from "react";
import { Landing } from "./components/layout/Landing";
import { Navbar } from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Alert } from "./components/layout/Alert";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { PrivateRoute } from "./hoc/PrivateRoute";
import { Dashboard } from "./components/dashboard/Dashboard";
import { LOGOUT } from "./types/type";
import setAuthToken from "./utils/setAuthToken";
import { CreateProfile } from "./components/profile/create-profile/CreateProfile";
import { AddEducation } from "./components/profile/education/AddEducation";
import { AddExperience } from "./components/profile/experience/AddExperience";
import { Profile } from "./components/profile/view-profile/Profile";
import { ViewUserProfile } from "./components/profile/view-user-profile/ViewUserProfile";
import Posts from "./components/posts/Posts";
import { Post } from "./components/posts/Post";

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile/:id" component={ViewUserProfile} />
              <Route exact path="/profiles" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
