import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
export const ProfileMain = ({ profile }) => {
  return (
    <div class="profile-top bg-primary p-2">
      <img class="round-img my-1" src={profile.user.avatar} alt="" />
      <h1 class="large">{profile.user.name}</h1>
      <p class="lead">
        {profile.status} {profile.company && <span>at {profile.company}</span>}{" "}
      </p>
      <p>{profile.location}</p>
      <div class="icons my-1">
        <Link to={profile.website} target="_blank" rel="noopener noreferrer">
          <i class="fas fa-globe fa-2x"></i>
        </Link>
        <Link
          to={profile.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fab fa-twitter fa-2x"></i>
        </Link>
        <Link
          to={profile.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fab fa-facebook fa-2x"></i>
        </Link>
        <Link
          to={profile.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fab fa-linkedin fa-2x"></i>
        </Link>
        <Link
          to={profile.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fab fa-youtube fa-2x"></i>
        </Link>
        <Link
          to={profile.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fab fa-instagram fa-2x"></i>
        </Link>
      </div>
    </div>
  );
};
