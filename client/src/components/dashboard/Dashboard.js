import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { Loading } from "../layout/Loading";
import { Link } from "react-router-dom";
import DashboardAction from "./DashboardAction";

export const Dashboard = ({ test }) => {
  const { user } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);
  console.log("data", profile);
  const dashboardContent = (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome {user && user.name} </i>
      </p>
      {profile != null ? (
        <>
          <DashboardAction />{" "}
        </>
      ) : (
        <>
          <p>You have not yet setup your profile</p>
          <Link className="btn btn-primary my-1" to="/create-profile">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
  const content = loading && !profile ? <Loading /> : dashboardContent;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);
  console.log("test", test);
  return <>{content}</>;
};
