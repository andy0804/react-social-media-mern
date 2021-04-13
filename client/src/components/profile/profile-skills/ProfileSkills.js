import React from "react";

const ProfileSkills = ({ profile }) => {
  return (
    <div class="profile-about bg-light p-2">
      <h2 class="text-primary">{profile.user.name}'s Bio</h2>
      <p>{profile.bio}</p>
      <div class="line"></div>
      <h2 class="text-primary">Skill Set</h2>
      <div class="skills">
        {profile.skills.slice(0, 4).map((skill, index) => {
          return (
            <div key={index} class="p-1">
              <i class="fa fa-check"></i> {skill}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileSkills;
