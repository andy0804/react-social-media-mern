import {
  CLEAR_PROFILE,
  CREATE_PROFILE_ERROR,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  GET_PROFILE,
  GET_PROFILE_REQUEST,
  PROFILE_ERROR,
  UPDATE_EDUCATION_FAILURE,
  UPDATE_EDUCATION_REQUEST,
  UPDATE_EDUCATION_SUCCESS,
  UPDATE_EXPERIENCE_SUCCESS,
} from "../types/type";
const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;
  console.log("PROFILE CALLED", action);

  switch (type) {
    case CREATE_PROFILE_REQUEST:
    case GET_PROFILE_REQUEST:
    case UPDATE_EDUCATION_REQUEST:
      return { ...state, loading: true };
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };
    case CREATE_PROFILE_SUCCESS:
    case UPDATE_EDUCATION_SUCCESS:
      return { ...state, loading: false };
    case CREATE_PROFILE_ERROR:
    case UPDATE_EDUCATION_FAILURE:
      return { ...state, error: payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false };

    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], loading: false };
    default:
      return state;
  }
};

export default profile;
