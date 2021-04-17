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
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
} from "../types/type";

const initialState = {
  posts: [],
  post: null,
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

    // GET post
    case GET_POST_REQUEST:
      return { ...state, loading: true };
    case GET_POST_SUCCESS:
      return { ...state, loading: false, post: payload };
    case GET_POST_FAILURE:
      return { ...state, loading: false, error: payload };

    // ADD COMMENT
    case ADD_COMMENT_REQUEST:
      return { ...state, loading: true };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comments: payload },
      };
    case ADD_COMMENT_FAILURE:
      return { ...state, loading: false, error: payload };

    //DELETE COMMENT

    case DELETE_COMMENT_REQUEST:
      return { ...state, loading: true };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload.id
          ),
        },
      };
    case DELETE_COMMENT_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default posts;
