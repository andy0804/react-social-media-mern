import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../actions/posts";

const Comments = ({ comments, id }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div class="comments">
      {comments &&
        comments.map((comment) => {
          return (
            <div class="post bg-white p-1 my-1">
              <div>
                <Link to={`/profile/${comment.user}`}>
                  <img class="round-img" src={comment.avatar} alt="" />
                  <h4>{comment.name}</h4>
                </Link>
              </div>
              <div>
                <p class="my-1">{comment.text}</p>
                <p class="post-date">
                  {" "}
                  Posted on <Moment format="MM/DD/YYYY">{comment.date}</Moment>
                </p>
                {comment.user === user._id && (
                  <button
                    onClick={() => dispatch(deleteComment(id, comment._id))}
                    type="button"
                    class="btn btn-danger"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Comments;
