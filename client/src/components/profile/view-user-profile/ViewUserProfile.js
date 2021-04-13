import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGithubRepos, getUserProfileById } from "../../../actions/profile";
import { Loading } from "../../layout/Loading";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import Moment from "react-moment";
import Github from "../github/Github";
import { ProfileMain } from "../profile-main/ProfileMain";
import ProfileSkills from "../profile-skills/ProfileSkills";
import ProfileExperience from "../profile-experience/ProfileExperience";
import ProfileEducation from "../profile-education/ProfileEducation";
export const ViewUserProfile = ({ history }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, loading, repos } = useSelector((state) => state.profile);
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUserProfileById(id));

    return () => {};
  }, [dispatch]);
  return (
    <div>
      {loading && <Loading />}
      {!loading && profile && (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {isAuthenticated && (
            <Link to="/create-profile" className="btn btn-light">
              <i className="fas fa-user-circle text-primary"></i> Edit Profile
            </Link>
          )}

          <div class="profile-grid my-1">
            <ProfileMain profile={profile} />
            <ProfileSkills profile={profile} />
            <ProfileExperience profile={profile} />
            <ProfileEducation profile={profile} />
          </div>
        </>
      )}
      {!loading && profile && repos && <Github repos={repos} />}
    </div>
  );
};
