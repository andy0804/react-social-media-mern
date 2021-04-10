import { setAlert } from "./action";
import api from "../utils/api";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGIN_REQUEST,
  CLEAR_PROFILE,
} from "../types/type";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  setAuthToken(localStorage.getItem("token"));

  try {
    const response = await api.get("/auth");
    dispatch({ type: USER_LOADED, payload: response.data });
  } catch (errors) {
    dispatch({
      type: AUTH_ERROR,
      msg: errors.response.statusText,
      status: errors.response.status,
    });
  }
};

// REGISTER USER
export const register = ({ name, email, password }) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const response = await api.post("/users", body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
      msg: errors.response.statusText,
      status: errors.response.status,
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  console.log("Hey");
  dispatch({ type: LOGIN_REQUEST });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const response = await api.post("/auth", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAILURE,
      msg: errors.response.statusText,
      status: errors.response.status,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
