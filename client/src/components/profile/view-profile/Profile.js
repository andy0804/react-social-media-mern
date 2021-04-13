import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfiles } from "../../../actions/profile";
import { Loading } from "../../layout/Loading";
import { ProfileItem } from "../profile-item/ProfileItem";

export const Profile = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserProfiles());
    return () => {};
  }, [dispatch]);
  return (
    <div>
      {loading && <Loading />}
      {!loading && profiles && (
        <Fragment>
          <>
            <h1 className="large text-primary">Developer</h1>
            <p className="lead">
              <i className="fab fa-connectdevelop"></i>Browse and Connect with
              Developers
            </p>
            <div className="profiles">
              {profiles.map((profile, index) => {
                return (
                  <ProfileItem
                    key={profile.user._id}
                    profile={profile}
                  ></ProfileItem>
                );
              })}
            </div>
          </>
        </Fragment>
      )}
      {!loading && !profiles && (
        <>
          {" "}
          <h1>No Profiles found</h1>
        </>
      )}
    </div>
  );
};
