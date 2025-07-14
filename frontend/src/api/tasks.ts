import axios from "axios";
import { catchError, Config, headers } from "./config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("tasks/fetch-tasks", async () => {
  return await axios
    .get(Config.TASKS.MY_TASKS, headers)
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      catchError(error);
    });
});

export const fetchTasksCount = createAsyncThunk("tasks/fetch-count", async (status: string) => {
  return await axios
  .get(`${Config.TASKS.MY_TASKS_COUNT}/${status}`, headers)
  .then((data) => {
    return data.data;
  })
  .catch((error) => {
    catchError(error);
  });
});

export const newTask = async (data: any) => {
  return await axios
    .post(Config.TASKS.ADD_TASK, data, headers)
    .then((data) => {
      return { status: 200, data: data.data };
    })
    .catch((error) => {
      catchError(error);
    });
};

export const updateTask = async (data: any, params: Number) => {
  return await axios
    .patch(`${Config.TASKS.UPDATE_TASK}/${params}`, data, headers)
    .then((data) => {
      return { status: 200, data: data.data };
    })
    .catch((error) => {
      catchError(error);
    });
};