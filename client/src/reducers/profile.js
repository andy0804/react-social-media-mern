import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILE_REQUEST,
  PROFILE_ERROR,
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
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true };
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };

    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false };

    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], loading: false };
    default:
      return state;
  }
};

export default profile;
