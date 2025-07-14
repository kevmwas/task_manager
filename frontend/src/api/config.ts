let baseUrl = "http://127.0.0.1:5700";

export const Config = {
  AUTH: {
    LOGIN: `${baseUrl}/login`,
    REGISTER: `${baseUrl}/register`,
  },
  USERS: {
    ADD_USER: `${baseUrl}/v1/add-user`,
    ALL_USERS: `${baseUrl}/v1/all-users`,
    UPDATE_USER: `${baseUrl}/v1/update-user`,
    MY_PROFILE: `${baseUrl}/v1/my-profile`,
  },
  TASKS: {
    ADD_TASK: `${baseUrl}/v1/add-task`,
    MY_TASKS: `${baseUrl}/v1/my-tasks`,
    MY_TASKS_COUNT: `${baseUrl}/v1/task-count`,
    UPDATE_TASK: `${baseUrl}/v1/update-task`,
  },
};

export const catchError = (error: any) => {
  if (error.response.status === 403) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    window.location.pathname = "/";
  } else {
    return {
      status: error.response.status,
      message: error.response.data.message,
      text: error.response.statusText,
    };
  }
};

export const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    "Content-Type": "application/json",
  },
};