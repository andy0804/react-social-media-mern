import {
  CLEAR_PROFILE,
  CREATE_PROFILE_ERROR,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  DELETE_EDUCATION_REQUEST,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_FAILURE,
  DELETE_EXPERIENCE_FAILURE,
  DELETE_EXPERIENCE_REQUEST,
  DELETE_EXPERIENCE_SUCCESS,
  GET_PROFILE,
  GET_PROFILE_REQUEST,
  PROFILE_ERROR,
  UPDATE_EDUCATION_FAILURE,
  UPDATE_EDUCATION_REQUEST,
  UPDATE_EDUCATION_SUCCESS,
  UPDATE_EXPERIENCE_FAILURE,
  UPDATE_EXPERIENCE_REQUEST,
  UPDATE_EXPERIENCE_SUCCESS,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_FAILURE,
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
    case UPDATE_EXPERIENCE_REQUEST:
    case DELETE_EXPERIENCE_REQUEST:
    case DELETE_EDUCATION_REQUEST:
    case DELETE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };
    case CREATE_PROFILE_SUCCESS:
    case UPDATE_EDUCATION_SUCCESS:
    case UPDATE_EXPERIENCE_SUCCESS:
    case DELETE_EXPERIENCE_SUCCESS:
    case DELETE_EDUCATION_SUCCESS:
      return { ...state, loading: false };
    case CREATE_PROFILE_ERROR:
    case UPDATE_EDUCATION_FAILURE:
    case UPDATE_EXPERIENCE_FAILURE:
    case DELETE_EDUCATION_FAILURE:
    case DELETE_EXPERIENCE_FAILURE:
    case DELETE_PROFILE_FAILURE:
      return { ...state, error: payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false };

    case DELETE_PROFILE_SUCCESS:
    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], loading: false };

    default:
      return state;
  }
};

export default profile;
