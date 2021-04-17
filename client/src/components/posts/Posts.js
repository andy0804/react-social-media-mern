import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

import { Loading } from "../layout/Loading";
import { PostForm } from "./PostForm";
import PostItem from "./PostItem";

const Posts = () => {
  const { posts, loading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
    return () => {};
  }, [dispatch]);
  return loading ? (
    <Loading />
  ) : (
    <>
      <h1 class="large text-primary">Posts</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Welcome to the community!
      </p>
      <PostForm />
      {posts.map((post) => {
        return <PostItem key={post._id} posts={post}></PostItem>;
      })}
    </>
  );
};

export default Posts;
