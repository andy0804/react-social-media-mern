import {
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  ADD_POST_REQUEST,
  ADD_POST_FAILURE,
  ADD_POST_SUCCESS,
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
    case UPDATE_POST_SUCCESS:
      console.log("ID", payload.id);

      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };
    case UPDATE_POST_REQUEST:
      return { ...state };
    case UPDATE_POST_FAILURE:
      return { ...state, error: payload, loading: false };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload.id),
        loading: false,
      };
    case DELETE_POST_REQUEST:
      return { ...state, loading: true };
    case DELETE_POST_FAILURE:
      return { ...state, error: payload, loading: false };

    // add post

    case ADD_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_POST_SUCCESS:
      return { ...state, posts: [payload, ...state.posts], loading: false };
    case ADD_POST_FAILURE:
      return { ...state, error: payload, loading: false };
  }
  return state;
};

export default posts;
