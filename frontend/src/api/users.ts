import axios from "axios";
import { catchError, Config, headers } from "./config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetch-users", async () => {
  return await axios
    .get(Config.USERS.ALL_USERS, headers)
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
     catchError(error);
    });
});

export const updateUser = createAsyncThunk("users/update-user", async (data: any) => {
  return await axios
    .patch(`${Config.USERS.UPDATE_USER}/${data.id}`, data, headers)
    .then((data) => {
      return { status: 200, data: data.data };
    })
    .catch((error) => {
      catchError(error);
    });
});

export const newUser = createAsyncThunk("users/new-user", async (data) => {
  return await axios
    .post(Config.USERS.ADD_USER, data, headers)
    .then((data) => {
      return { status: 200, data: data.data };
    })
    .catch((error) => {
      catchError(error);
    });
});