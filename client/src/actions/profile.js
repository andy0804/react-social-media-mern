import api from "../utils/api";
import { setAlert } from "./action";
import {
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  GET_PROFILE,
  GET_PROFILE_REQUEST,
  PROFILE_ERROR,
} from "../types/type";
export const getCurrentProfile = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });

    const response = await api.get("/profile/me");
    dispatch({ type: GET_PROFILE, payload: response.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    console.log("Hey!!");
    const config = { headers: { "Content-Type": "application/json" } };
    dispatch({ type: CREATE_PROFILE_REQUEST });

    const response = await api.post("/profile", formData, config);
    dispatch({ type: CREATE_PROFILE_SUCCESS, payload: response.data });
    dispatch({ type: GET_PROFILE, payload: response.data });
    dispatch(
      setAlert(edit ? "Profile update" : "Profile Successfully created")
    );
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};
