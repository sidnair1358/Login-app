import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const signup =
  (firstName, lastName, email, password) => async (dispatch) => {
    dispatch({ type: "SIGNUP_REQUEST" });
    try {
      const response = await axios.post(`${apiUrl}user/register`, {
        firstName,
        lastName,
        email,
        password,
      });
      dispatch({ type: "SIGNUP_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "SIGNUP_FAILURE", payload: error.response.data });
    }
  };

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });
  try {
    const response = await axios.post(`${apiUrl}user/login`, {
      email,
      password,
    });
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
  }
};
export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}user/`);
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(error.message);
  }
};

export const clearErrors = () => {
  return {
    type: "CLEAR_ERRORS",
  };
};
