import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deleteEducation } from "../../actions/profile";

export const Education = ({ educations }) => {
  const dispatch = useDispatch();

  const educationDetails = educations.map((education, index) => {
    const { school, degree, from, to, _id } = education;

    return (
      <tr key={index}>
        <td>{school}</td>
        <td className="hide-sm">{degree}</td>
        <td className="hide-sm">
          <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
          {!to ? `Now` : <Moment format="YYYY/MM/DD">{to}</Moment>}
        </td>
        <td>
          <button
            onClick={() => {
              dispatch(deleteEducation(_id));
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
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educationDetails}</tbody>
      </table>
    </div>
  );
};
