import {
  ALLSCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOGGED_USER,
} from "./actions-types";

const initialState = {
  credentials: {},
  likes: [],
  notifications: [],
  screams: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALLSCREAMS:
      return { ...state, screams: action.payload };
    case LOGGED_USER:
      return { ...state, credentials: action.payload };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.name,
            screamId: action.payload.screamId,
          },
        ],
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.screamsId !== action.payload.screamsId
        ),
      };
    default:
      return state;
  }
};

export default reducer;
