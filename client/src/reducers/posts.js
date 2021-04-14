import {
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
} from "../types/type";

const initialState = {
  posts: [],
  post: null,
  comments: [],
  loading: true,
  error: {},
};

const posts = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS_SUCCESS:
      return { ...state, posts: payload, loading: false };
    case GET_POSTS_REQUEST:
      return { ...state, loading: true };
    case GET_POSTS_FAILURE:
      return { ...state, error: payload, loading: false };
  }
  return state;
};

export default posts;
