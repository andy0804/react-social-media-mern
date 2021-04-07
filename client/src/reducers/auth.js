import { REGISTER_FAIL, REGISTER_SUCCESS } from "../types/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenicated: null,
  loading: true,
  user: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_FAIL:
      return { ...state, ...payload, isAuthenicated: false, loading: false };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenicated: true,
        loading: false,
      };

    default:
      return state;
  }
};

export default auth;
