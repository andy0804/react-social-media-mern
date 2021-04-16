import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, dislike, like } from "../../actions/posts";
import { clearProfiles } from "../../actions/profile";
import { useHistory } from "react-router";

const PostItem = ({ posts }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log("Post ID", posts.user);
  console.log("LOGGED IN  ID", user._id);

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link
          onClick={(e) => {
            e.preventDefault();
            dispatch(clearProfiles());
            history.push({
              pathname: `/profile/${posts.user}`,
            });
          }}
          to={`/profile/${posts.user}`}
        >
          <img className="round-img" src={posts.avatar} alt="" />
          <h4>{posts.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{posts.text}</p>
        <p className="post-date">
          Posted on <Moment format="MM/DD/YYYY">{posts.date}</Moment>
        </p>
        <button
          onClick={() => dispatch(like(posts._id))}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up"></i>
          <span>{posts.likes.length}</span>
        </button>
        <button
          onClick={() => dispatch(dislike(posts._id))}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to="/post" className="btn btn-primary">
          Discussion{" "}
          <span className="comment-count">{posts.comments.length}</span>
        </Link>
        {!loading && user._id === posts.user && (
          <button
            onClick={() => dispatch(deletePost(posts._id))}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
