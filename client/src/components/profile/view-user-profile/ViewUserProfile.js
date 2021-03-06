import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGithubRepos, getUserProfileById } from "../../../actions/profile";
import { Loading } from "../../layout/Loading";
import { Link, useParams } from "react-router-dom";
import Github from "../github/Github";
import { ProfileMain } from "../profile-main/ProfileMain";
import ProfileSkills from "../profile-skills/ProfileSkills";
import ProfileExperience from "../profile-experience/ProfileExperience";
import ProfileEducation from "../profile-education/ProfileEducation";
export const ViewUserProfile = ({ history }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, loadingProfileID, repos, success } = useSelector(
    (state) => state.profile
  );

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserProfileById(id)).then(() => {});
  }, [dispatch, id]);
  useEffect(() => {
    if (profile && profile.githubusername && success) {
      dispatch(getGithubRepos(profile.githubusername));
    }
  }, [dispatch, profile, loadingProfileID, success]);
  return (
    <div>
      {loadingProfileID && <Loading />}
      {!loadingProfileID && profile && (
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
      {!loadingProfileID && profile && repos && <Github repos={repos} />}
    </div>
  );
};
