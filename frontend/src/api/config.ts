let baseUrl = "http://127.0.0.1:5700";

export const Config = {
  AUTH: {
    LOGIN: `${baseUrl}/login`,
    REGISTER: `${baseUrl}/register`,
  },
};

export const catchError = (error: any) => {
  if (error.response.status === 401) {
    localStorage.removeItem("auth_token");
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
    authorization: `Bearer ${localStorage.getItem("auth_token")}`,
  },
};