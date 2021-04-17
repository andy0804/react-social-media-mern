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
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_FAILURE,
  DELETE_EDUCATION_REQUEST,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_FAILURE,
  DELETE_EXPERIENCE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_FAILURE,
  CLEAR_PROFILE,
  LOGOUT,
  GET_PROFILES_FAILURE,
  GET_PROFILES_REQUEST,
  GET_PROFILES_SUCCESS,
  GET_PROFILE_BY_ID_REQUEST,
  GET_PROFILE_BY_ID_SUCCESS,
  GET_PROFILE_BY_ID_FAILURE,
  GET_GITREPO_FAILURE,
  GET_GITREPO_REQUEST,
  GET_GITREPO_SUCCESS,
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
    dispatch(setAlert("Education Successfully deleted", "success"));
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

//delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EDUCATION_REQUEST });

    const response = await api.delete(`/profile/education/${id}`);
    dispatch({ type: DELETE_EDUCATION_SUCCESS, payload: response.data });
    dispatch({ type: GET_PROFILE, payload: response.data });
    dispatch(setAlert("Education Successfully Deleted", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: DELETE_EDUCATION_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};

// delete education
export const deleteExperience = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EXPERIENCE_REQUEST });

    const response = await api.delete(`/profile/experience/${id}`);
    dispatch({ type: DELETE_EXPERIENCE_SUCCESS, payload: response.data });
    dispatch({ type: GET_PROFILE, payload: response.data });
    dispatch(setAlert("Education Successfully updated", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: DELETE_EXPERIENCE_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};

// delete account and profile

// delete education
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure ? This cannot be undone.")) {
    try {
      dispatch({ type: DELETE_PROFILE_REQUEST });

      const response = await api.delete(`/profile/`);
      dispatch({ type: DELETE_PROFILE_SUCCESS, payload: response.data });
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: LOGOUT });
      dispatch(setAlert("Your account has been permanently deleted.", "info"));
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: DELETE_PROFILE_FAILURE,
        msg: error.response.statusText,
        status: error.response.status,
      });
    }
  }
};

// Get User Profiles
export const getUserProfiles = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROFILES_REQUEST });

    const response = await api.get(`/profile/`);
    dispatch({ type: GET_PROFILES_SUCCESS, payload: response.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GET_PROFILES_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};

// GET PROFILE BY ID
export const getUserProfileById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROFILE_BY_ID_REQUEST });

    const response = await api.get(`/profile/user/${id}`);
    dispatch({ type: GET_PROFILE_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GET_PROFILE_BY_ID_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};

export const clearProfiles = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
};
// get hithub repos

export const getGithubRepos = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_GITREPO_REQUEST });

    const response = await api.get(`/profile/github/${id}`);
    dispatch({ type: GET_GITREPO_SUCCESS, payload: response.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GET_GITREPO_FAILURE,
      msg: error.response.statusText,
      status: error.response.status,
    });
  }
};
