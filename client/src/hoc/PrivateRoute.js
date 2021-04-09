import React, { Component } from "react";
import { Route } from "react-router";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated && !loading) {
          return <Component {...props} {...rest} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};
