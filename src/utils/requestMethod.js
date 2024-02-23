import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// const currentUser = user && JSON.parse(user).currentUser;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export function userRequest() {
  const TOKEN = JSON.parse(localStorage.getItem("user"))?.accessToken || "";
  return axios.create({
    baseURL: BASE_URL,
    headers: { token: `bearer ${TOKEN}` },
  });
}
