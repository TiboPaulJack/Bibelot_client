import baseApi from "../assets/baseApi.js";

export function tokenCheck () {
  return fetch(baseApi + "/user/check", {
    method: "POST",
    headers: {
      "authorization": "Bearer " + localStorage.getItem("token"),
    }
  }).then((response) => {
    if (response.status === 401) {
      localStorage.removeItem('token');
    }
    if (response.status === 200) {
      return response.json()
    }
  }).then((data) => {
    return data;
  });
}



