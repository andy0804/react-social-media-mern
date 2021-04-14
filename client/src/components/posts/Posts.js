import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

const Posts = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  console.log("data", posts);
  useEffect(() => {
    dispatch(getPosts());
    return () => {};
  }, []);
  return (
    <div>
      <h1> Posts</h1>
    </div>
  );
};

export default Posts;
