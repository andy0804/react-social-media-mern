import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { clearProfiles } from "../../../actions/profile";
import { useDispatch } from "react-redux";

export const ProfileItem = ({ profile }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div>
      <div className="profile bg-light">
        <img src={profile.user.avatar} alt="" className="round-img" />

        <div>
          <h2>{profile.user.name} </h2>
          <p>
            {profile.status}{" "}
            {profile.company && <span>at {profile.company} </span>}
          </p>
          <p className="my-1">
            {profile.location && <span>{profile.location}</span>}
          </p>
          <Link
            onClick={(e) => {
              e.preventDefault();
              dispatch(clearProfiles());

              history.push({
                pathname: `/profile/${profile.user._id}`,
              });
            }}
            className="btn btn-primary"
            to={`/profile/${profile.user._id}`}
          >
            View Profile
          </Link>
        </div>
        <ul>
          {profile.skills.slice(0, 4).map((skill, index) => {
            return (
              <li className="text-primary" key={index}>
                <i className="fas fa-check">{skill}</i>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
