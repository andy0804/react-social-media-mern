import api from "../utils/api";
import { setAlert } from "./action";
import {
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  GET_PROFILE,
  GET_PROFILE_REQUEST,
  PROFILE_ERROR,
  UPDATE_EDUCATION_REQUEST,
  UPDATE_EDUCATION_SUCCESS,
  UPDATE_EDUCATION_FAILURE,
  UPDATE_EXPERIENCE_REQUEST,
  UPDATE_EXPERIENCE_SUCCESS,
  UPDATE_EXPERIENCE_FAILURE,
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
      setAlert(
        edit
          ? "Profile Successfully Updated!"
          : "Profile Successfully created!",
        "success"
      )
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
export const updateEducation = (formData, history) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    dispatch({ type: UPDATE_EDUCATION_REQUEST });

    const response = await api.put("/profile/education", formData, config);
    dispatch({ type: UPDATE_EDUCATION_SUCCESS, payload: response.data });
    dispatch({ type: GET_PROFILE, payload: response.data });
    dispatch(setAlert("Education Successfully updated", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: UPDATE_EDUCATION_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};

export const updateExperience = (formData, history) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    dispatch({ type: UPDATE_EXPERIENCE_REQUEST });

    const response = await api.put("/profile/experience", formData, config);
    dispatch({ type: UPDATE_EXPERIENCE_SUCCESS, payload: response.data });
    dispatch({ type: GET_PROFILE, payload: response.data });
    dispatch(setAlert("Education Successfully updated", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: UPDATE_EXPERIENCE_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};
