export const Login = (data) => async (dispatch) => {
  dispatch({ type: "LOGIN_SUCCESS", payload: { data } });
};
export const Register = (data) => async (dispatch) => {
  dispatch({ type: "REGISTER_SUCCESS", payload: { data } });
};
export const LogoutUser = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  dispatch({ type: "LOGOUT" });
};
export const GetloggedinUserPosts = (data) => async (dispatch) => {
  dispatch({ type: "USER_POSTS_SUCCESS", payload: { data } });
};
export const UpdateUserInfo = (data) => async (dispatch) => {
  dispatch({ type: "UPDATE_USER_INFO", payload: { data } });
};
