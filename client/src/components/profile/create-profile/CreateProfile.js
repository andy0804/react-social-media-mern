import React, { useState, useEffect } from "react";
import SelectControl from "../../../controls/dropdown/SelectControl";
import { PROFESSIONAL_STATUS } from "../../../constants/Constant";
import { Link, Redirect } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../../actions/profile";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../layout/Loading";

export const CreateProfile = ({ history }) => {
  const { profile, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const initialState = {
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  };
  const [socialMediaLinksDisplay, toggleSocialMediaLinksDisplay] = useState(
    false
  );
  const [formData, setFormData] = useState(initialState);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  useEffect(() => {
    if (profile) {
      const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        social,
      } = profile;
      if (social) {
        toggleSocialMediaLinksDisplay(true);
      }
      setFormData({
        company: company || "",
        website: website || "",
        location: location || "",
        status: status || "",
        skills: (skills && skills.join(",")) || "",
        githubusername: githubusername || "",
        bio: bio || "",
        twitter: (social && social.twitter) || "",
        facebook: (social && social.facebook) || "",
        linkedin: (social && social.linkedin) || "",
        youtube: (social && social.youtube) || "",
        instagram: (social && social.instagram) || "",
      });
    }
  }, [loading]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData, history, profile ? true : false));
    window.scrollTo(0, 0);
  };
  return (
    <div>
      {loading && <Loading />}

      <h1 className="large text-primary">
        {profile ? "Edit" : "Create"} Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <SelectControl
            onChange={onChange}
            name="status"
            value={status}
            selectList={PROFESSIONAL_STATUS}
          />
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>

        <div className="form-group">
          <input
            value={company}
            onChange={onChange}
            type="text"
            placeholder="Company"
            name="company"
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            value={website}
            onChange={onChange}
            type="text"
            placeholder="Website"
            name="website"
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            value={location}
            onChange={onChange}
            type="text"
            placeholder="Location"
            name="location"
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            value={skills}
            onChange={onChange}
            type="text"
            placeholder="* Skills"
            name="skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            value={githubusername}
            onChange={onChange}
            type="text"
            placeholder="Github Username"
            name="githubusername"
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            value={bio}
            onChange={onChange}
            placeholder="A short bio of yourself"
            name="bio"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() =>
              toggleSocialMediaLinksDisplay((prevState) => !prevState)
            }
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {socialMediaLinksDisplay && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                onChange={onChange}
                value={twitter}
                type="text"
                placeholder="Twitter URL"
                name="twitter"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                value={facebook}
                onChange={onChange}
                type="text"
                placeholder="Facebook URL"
                name="facebook"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                value={youtube}
                onChange={onChange}
                type="text"
                placeholder="YouTube URL"
                name="youtube"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                value={linkedin}
                onChange={onChange}
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                value={instagram}
                onChange={onChange}
                type="text"
                placeholder="Instagram URL"
                name="instagram"
              />
            </div>
          </>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};
