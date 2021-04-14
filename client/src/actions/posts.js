import api from "../utils/api";
import { setAlert } from "./action";
import {
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
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
