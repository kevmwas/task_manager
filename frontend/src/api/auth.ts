import axios from "axios";
import { Config } from "./config";

export const loginUser = async (info) => {
  const data = EncryptText(JSON.stringify(info));
  return await axios
    .post(Config.ADMINS.LOGIN, { data })
    .then((token) => {

      localStorage.setItem("auth_token", token.data.data);
      localStorage.setItem("refresh", token.data.refresh);
      window.location.pathname = "/dashboard";
      return { status: 200, data: token.data };
    })
    .catch((error) => {
      return { status: 401, error };
    });
};