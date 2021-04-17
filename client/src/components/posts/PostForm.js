import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../actions/posts";

export const PostForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState("");
  const submitPost = (e) => {
    e.preventDefault();
    dispatch(addPost(formData));
  };
  const { text } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form onSubmit={(e) => submitPost(e)} class="form my-1">
        <textarea
          value={text}
          name="text"
          cols="30"
          rows="5"
          onChange={onChange}
          placeholder="Create a post"
          required
        ></textarea>
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};
