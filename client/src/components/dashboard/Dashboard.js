import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

export const Dashboard = ({ test }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const { profile, profiles, repo } = useSelector((state) => state.profile);
  console.log("data", profile);
  console.log("data", profiles);
  console.log("data", repo);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);
  console.log("test", test);
  return <div>Hi this from dashboard {test}</div>;
};
