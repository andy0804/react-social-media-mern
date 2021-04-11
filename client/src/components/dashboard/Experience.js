import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../actions/profile";

export const Experience = ({ experience }) => {
  const dispatch = useDispatch();

  const experienceDetails = experience.map((exp, index) => {
    const { title, company, from, to, _id } = exp;

    return (
      <tr key={index}>
        <td>{company}</td>
        <td className="hide-sm">{title}</td>
        <td className="hide-sm">
          <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
          {!to ? `Now` : <Moment format="YYYY/MM/DD">{to}</Moment>}
        </td>
        <td>
          <button
            onClick={() => {
              dispatch(deleteExperience(_id));
              window.scrollTo(0, 0);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experienceDetails}</tbody>
      </table>
    </div>
  );
};
