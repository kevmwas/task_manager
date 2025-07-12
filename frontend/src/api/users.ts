import axios from "axios";
import { catchError, Config, headers } from "./config";

export const newUser = async (data: any) => {
  return await axios
    .post(Config.USERS.ADD_USER, data, headers)
    .then((data) => {
      return { status: 200, data: data.data };
    })
    .catch((error) => {
      catchError(error);
    });
};

export const updateUser = async (data: any, params: number) => {
  return await axios
    .patch(`${Config.USERS.UPDATE_USER}/${params}`, data, headers)
    .then((data) => {
      console.log(data)
      return { status: 200, data: data.data };
    })
    .catch((error) => {
      console.log(error)
      catchError(error);
    });
};

export const getUsers = async () => {
  return await axios
    .get(Config.USERS.ALL_USERS, headers)
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
     catchError(error);
    });
};