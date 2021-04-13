import React from "react";
import Moment from "react-moment";

const ProfileExperience = ({ profile }) => {
  return (
    <div class="profile-exp bg-white p-2">
      <h2 class="text-primary">Experience</h2>
      {profile.experience.map((exp, index) => {
        return (
          <div key={exp._id}>
            <h3 class="text-dark">{exp.company}</h3>
            <p>
              <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
              {!exp.to ? (
                `Current`
              ) : (
                <Moment format="YYYY/MM/DD">{exp.to}</Moment>
              )}
            </p>
            <p>
              <strong>Position: </strong>
              {exp.title}
            </p>
            <p>
              <strong>Description: </strong>
              {exp.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileExperience;
