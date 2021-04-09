import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

export const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const guestLinks = (
    <>
      <li>
        <a href="profiles.html">Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );
  const authenticatedLinks = (
    <>
      <li>
        <Link
          to="/dashboard"
          onClick={(e) => {
            e.preventDefault();
            history.push({
              pathname: "/dashboard",
            });
          }}
        >
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
            history.push({
              pathname: "/",
            });
          }}
        >
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </>
  );

  const links = isAuthenticated ? authenticatedLinks : guestLinks;
  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="index.html">
          <i className="fas fa-code"></i> DevConnector
        </a>
      </h1>
      <ul>{!loading && links}</ul>
    </nav>
  );
};
