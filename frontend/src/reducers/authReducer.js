const initialState = {
  loading: false,
  error: null,
  currentUser: null,
  allUsers: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_REQUEST":
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "SIGNUP_SUCCESS":
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, currentUser: action.payload };
    case "GET_USERS_SUCCESS":
      return { ...state, loading: false, allUsers: action.payload };
    case "SIGNUP_FAILURE":
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
