import { setAlert } from "./action";
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../types/type";
import { setAuthToken } from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  setAuthToken(localStorage.getItem("token"));

  try {
    const response = await axios.get("/api/auth");
    dispatch({ type: USER_LOADED, payload: response.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// REGISTER USER
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const response = await axios.post("/api/users", body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    dispatch({ type: USER_LOADED, payload: response.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post("/api/auth", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    dispatch({ type: USER_LOADED, payload: response.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: LOGIN_FAILURE });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
