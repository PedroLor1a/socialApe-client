import { ALLSCREAMS } from "./actions-types";

const initialState = {
  screams: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALLSCREAMS:
      return { ...state, screams: action.payload };
    default:
      return state;
  }
};

export default reducer;
