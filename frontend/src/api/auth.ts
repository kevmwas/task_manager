import axios from "axios";
import { Config } from "./config";

export const signin = async (info: any) => {
  return await axios
    .post(Config.AUTH.LOGIN, info)
    .then((token) => {
        localStorage.setItem("auth_token", token.data.token);
        localStorage.setItem("user_data", JSON.stringify(token.data.user));
        window.location.pathname = "/dashboard";
      return { status: 200, data: token.data };
    })
    .catch((error) => {
      return { status: 401, error };
    });
};

export const signup = async (info: any) => {
  return await axios
    .post(Config.AUTH.REGISTER, info)
    .then((token) => {
      localStorage.setItem("auth_token", token.data.token);
      localStorage.setItem("user_data", JSON.stringify(token.data.user));
      window.location.pathname = "/dashboard";
      return { status: 200, data: token.data };
    })
    .catch((error) => {
      return { status: 401, error };
    });
};