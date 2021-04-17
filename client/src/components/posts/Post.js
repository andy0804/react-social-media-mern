import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../actions/posts";
import { Loading } from "../layout/Loading";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import PostItem from "./PostItem";

export const Post = ({ match }) => {
  const { post, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <div>
      <> {loading && <Loading />} </>
      <>
        <Link to="/posts" className="btn">
          Back to Posts
        </Link>
        {!loading && post && (
          <>
            <PostItem showActions={false} posts={post}></PostItem>
            <CommentForm post={post} id={match.params.id} />
            <Comments id={match.params.id} comments={post.comments} />
          </>
        )}
      </>
    </div>
  );
};
