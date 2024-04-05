import {
  ALLSCREAMS,
  LOGGED_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
} from "./actions-types";
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

export const userLogged = (token) => {
  try {
    return async function (dispatch) {
      const { data } = await axios.get(
        "https://southamerica-east1-socialape-aef7b.cloudfunctions.net/api/user",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(data, "ESTOO ES DATA");
      return dispatch({
        type: LOGGED_USER,
        payload: data,
      });
    };
  } catch (error) {
    return { error: error.message };
  }
};

export const uploadImage = (formData, token) => {
  try {
    return async function (dispatch) {
      await axios.post(
        "https://southamerica-east1-socialape-aef7b.cloudfunctions.net/api/user/image",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return dispatch({
        type: LOGGED_USER,
      });
    };
  } catch (error) {
    return { error: error.message };
  }
};

export const logoutUser = () => {
  try {
    return async function (dispatch) {
      localStorage.removeItem("FBIdToken");
      delete axios.defaults.headers.common["Authorization"];
      return dispatch({
        type: LOGGED_USER,
      });
    };
  } catch (error) {
    return { error: error.message };
  }
};

export const editUserDetails = (userDetails, token) => {
  try {
    return async function (dispatch) {
      await axios.post(
        "https://southamerica-east1-socialape-aef7b.cloudfunctions.net/api/newDetails",
        userDetails,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return dispatch({
        type: LOGGED_USER,
      });
    };
  } catch (error) {
    return { error: error.message };
  }
};

export const likeScream = (screamId, token) => {
  try {
    return async function (dispatch) {
      console.log(screamId, "ESTO ES SCREAMID");
      const { data } = await axios.get(
        `https://southamerica-east1-socialape-aef7b.cloudfunctions.net/api/scream/${screamId}/like`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return dispatch({
        type: LIKE_SCREAM,
        payload: data,
      });
    };
  } catch (error) {
    return { error: error.message };
  }
};

export const unlikeScream = (screamId, token) => {
  try {
    return async function (dispatch) {
      const { data } = await axios.get(
        `https://southamerica-east1-socialape-aef7b.cloudfunctions.net/api/scream/${screamId}/unlike`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return dispatch({
        type: UNLIKE_SCREAM,
        payload: data,
      });
    };
  } catch (error) {
    return { error: error.message };
  }
};
