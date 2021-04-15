import api from "../utils/api";
import { setAlert } from "./action";
import {
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
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
