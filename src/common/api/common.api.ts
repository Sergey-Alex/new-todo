import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "ad0a4a46-01ec-4eaa-a254-bf3c8cf959b9",
  },
});
