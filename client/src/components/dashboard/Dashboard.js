import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import { Loading } from "../layout/Loading";
import { Link } from "react-router-dom";
import DashboardAction from "./DashboardAction";
import { Education } from "./Education";
import { Experience } from "./Experience";

export const Dashboard = ({ test }) => {
  const { user } = useSelector((state) => state.auth);
  const { profile, loadingProfileID } = useSelector((state) => state.profile);
  console.log("data", profile);
  const dashboardContent = (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome {user && user.name} </i>
      </p>
      {profile != null ? (
        <>
          <DashboardAction />
          <Experience experience={profile.experience} />
          <Education educations={profile.education} />
          <div className="my-2">
            <button
              onClick={() => dispatch(deleteAccount())}
              className="btn btn-danger"
            >
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
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
  const content = loadingProfileID && !profile ? <Loading /> : dashboardContent;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);
  return <>{content}</>;
};
