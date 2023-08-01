export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_REQ":
      return { loading: true };
    case "LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "UPDATE_USER_INFO":
      return { ...state, userInfo: action.payload.data };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "REGISTER_REQ":
      return { loading: true };
    case "REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "REGISTER_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userLoggedInReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_POSTS_REQ":
      return { loading: true };
    case "USER_POSTS_SUCCESS":
      return { loading: false, logginUserProfile: action.payload };
    case "USER_POSTS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
