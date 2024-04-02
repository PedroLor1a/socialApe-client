import { ALLSCREAMS } from "./actions-types";
import axios from "axios";

export const allScreams = () => {
  try {
    return async function (dispatch) {
      const { data } = await axios(
        "https://southamerica-east1-socialape-aef7b.cloudfunctions.net/api/screams"
      );
      return dispatch({
        type: ALLSCREAMS,
        payload: data,
      });
    };
  } catch (error) {
    return { error: error.message };
  }
};
