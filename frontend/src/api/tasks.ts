import axios from "axios";
import { catchError, Config, headers } from "./config";
const userData = JSON.parse(localStorage.getItem("user_data"));

export const newTask = async (info: any) => {
  const formData = new FormData(info.currentTarget);

  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    dueDate: formData.get("due_date"),
  };

  if(userData.tole === "admin") {
    data.assignedTo = { id: Number(formData.get("assigned_to")) }
  }

  return await axios
    .post(Config.TASKS.ADD_TASK, data, headers)
    .then((data) => {
      return { status: 200, data: data.data };
    })
    .catch((error) => {
        console.log(error)
    //  catchError(error);
    });
};

export const getMyTasks = async () => {
  return await axios
    .get(Config.TASKS.MY_TASKS, headers)
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      catchError(error);
    });
};

export const getMyTasksCount = async (status: string) => {
  return await axios
    .get(`${Config.TASKS.MY_TASKS_COUNT}/${status}`, headers)
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      catchError(error);
    });
};
