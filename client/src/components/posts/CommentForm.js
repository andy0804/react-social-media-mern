import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../actions/posts";

const CommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const initialState = { text: "" };
  const [formData, setFormData] = useState(initialState);
  const { text } = formData;
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(addComment(id, formData));
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form onSubmit={onSubmit} class="form my-1">
        <textarea
          onChange={onChange}
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          value={text}
          required
        ></textarea>
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
