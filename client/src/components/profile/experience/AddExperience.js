import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { updateExperience } from "../../../actions/profile";

export const AddExperience = ({ history }) => {
  const initialState = {
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  };
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const { title, company, location, from, to, current, description } = formData;
  const [toDateDisabled, toggleDateDisabled] = useState(false);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData, "EXPERIENCE");
    dispatch(updateExperience(formData, history));
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input
            value={title}
            onChange={onChange}
            type="text"
            placeholder="* Job Title"
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={company}
            onChange={onChange}
            type="text"
            placeholder="* Company"
            name="company"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={location}
            onChange={onChange}
            type="text"
            placeholder="Location"
            name="location"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input value={from} onChange={onChange} type="date" name="from" />
        </div>
        <div className="form-group">
          <p>
            <input
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDateDisabled(!toDateDisabled);
              }}
              checked={current}
              type="checkbox"
              name="current"
              value={current}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            disabled={toDateDisabled ? "disabled" : ""}
            value={to}
            onChange={onChange}
            type="date"
            name="to"
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={onChange}
            value={description}
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};
