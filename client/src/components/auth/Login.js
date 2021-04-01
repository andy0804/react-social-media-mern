import React, { useState } from "react";
import { Link } from "react-router-dom";
export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formData, "formData");
  };
  return (
    <>
      <h1 className="large text-primary">Sign in </h1>

      <form
        onSubmit={(e) => onSubmit(e)}
        className="form"
        action="create-profile.html"
      >
        <div className="form-group">
          <input
            required
            onChange={(e) => onChange(e)}
            type="email"
            placeholder="Email Address"
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            required
            onChange={(e) => onChange(e)}
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Sign in" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
};
