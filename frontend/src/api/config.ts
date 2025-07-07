let baseUrl = "http://127.0.0.1:9876";

export const Config = {
  ADMINS: {
    LOGIN: `${baseUrl}/login`,
  },
  ESTATES: {
    ADD_ESTATE: `${baseUrl}/estates/create-estate`,
    MY_ESTATES: `${baseUrl}/estates/my-estates`,
    PUBLIC_ESTATES: `${baseUrl}/estates/all-estates`,
    UPDATE_ESTATE: `${baseUrl}/estates/update-estate`,
    ONE_ESTATE: `${baseUrl}/estates/one-estate`
  },
  USERS: {
    LANDLORD_CARETAKERS: `${baseUrl}/users/landlord-caretakers`,
    CARETAKER_LANDLORDS: `${baseUrl}/users/caretaker-landlords`,
  }
};

export const catchError = (error: any) => {
  if (error.response.status === 401) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh");
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