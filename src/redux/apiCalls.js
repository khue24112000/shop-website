import { loginFailure, loginStart, loginSuccess, logout } from "./userSlice";
import { publicRequest, userRequest } from "../utils/requestMethod";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err.response.status);
    dispatch(loginFailure());
  }
};

export const verifyLogin = async (dispatch) => {
  const request = userRequest();
  try {
    await request.post("/auth/verifyLogin");
  } catch (err) {
    if (err.response.status === 403) dispatch(logout());
  }
};
