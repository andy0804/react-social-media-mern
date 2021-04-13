import React from "react";
import Moment from "react-moment";

const ProfileEducation = ({ profile }) => {
  return (
    <div class="profile-edu bg-white p-2">
      <h2 class="text-primary">Education</h2>
      {profile.education.map((edu, index) => {
        return (
          <div key={edu._id}>
            <h3>{edu.school}</h3>
            <p>
              <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
              {!edu.to ? (
                `Current`
              ) : (
                <Moment format="YYYY/MM/DD">{edu.to}</Moment>
              )}
            </p>{" "}
            <p>
              <strong>Degree: </strong>
              {edu.degree}
            </p>
            <p>
              <strong>Field Of Study: </strong>
              {edu.fieldofstudy}
            </p>
            <p>
              <strong>Description: </strong>
              {edu.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileEducation;
