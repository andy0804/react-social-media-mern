import api from "../utils/api";
import { setAlert } from "./action";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POST_FAILURE,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
} from "../types/type";

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_POSTS_REQUEST });

    const response = await api.get("/posts");
    dispatch({ type: GET_POSTS_SUCCESS, payload: response.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GET_POSTS_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};

export const like = (id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_POST_REQUEST });

    const response = await api.put(`/posts/like/${id}`);
    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: { id, likes: response.data },
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: UPDATE_POST_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};

export const dislike = (id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_POST_REQUEST });

    const response = await api.put(`/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: { id, likes: response.data },
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: UPDATE_POST_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    const response = await api.delete(`/posts/${id}`);
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: { id },
    });
    dispatch(setAlert("Post successfully deleted", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: DELETE_POST_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };

    dispatch({ type: ADD_POST_REQUEST });

    const response = await api.post(`/posts`, formData, config);
    dispatch({
      type: ADD_POST_SUCCESS,
      payload: response.data,
    });
    dispatch(setAlert("Post successfully added", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: ADD_POST_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_REQUEST });

    const response = await api.get(`/posts/${id}`);
    dispatch({ type: GET_POST_SUCCESS, payload: response.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GET_POST_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};

//add comment
export const addComment = (id, formData) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };

    dispatch({ type: ADD_COMMENT_REQUEST });

    const response = await api.post(`/posts/comment/${id}`, formData, config);
    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: response.data,
    });
    dispatch(setAlert("Commments successfully added", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: ADD_COMMENT_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};

//delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COMMENT_REQUEST });

    await api.delete(`/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: { id: commentId },
    });
    dispatch(setAlert("Post successfully deleted", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: DELETE_POST_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};
