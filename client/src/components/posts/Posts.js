import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

import { Loading } from "../layout/Loading";
import PostItem from "./PostItem";

const Posts = () => {
  const { posts, loading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  console.log("data", posts);
  useEffect(() => {
    dispatch(getPosts());
    return () => {};
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <>
      {posts.map((post) => {
        return <PostItem key={post._id} posts={post}></PostItem>;
      })}
    </>
  );
};

export default Posts;
