import axios from "axios";
import { setAlert } from "./action";
import { GET_PROFILE, PROFILE_ERROR } from "../types/type";
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/profile/me");
    dispatch({ type: GET_PROFILE, payload: response.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: PROFILE_ERROR });
  }
};
