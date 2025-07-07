import axios from "axios";
import { catchError, Config, headers } from "./config";

export const newUser = async (event: any) => {
  const data = Object.fromEntries(new FormData(event.target).entries());
  const formData = new FormData();

  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("phone", data.phone);
  formData.append("id_no", data.id_no);
  formData.append("bio", data.bio);
  formData.append("gender", data.gender);
  formData.append("dob", data.dob);
  formData.append("country", data.country);
  formData.append("county", data.county);
  formData.append("location", data.location);
  formData.append("city", data.city);
  formData.append("profile", data.profile);
  formData.append("role", data.role);

  return await axios
    .post(Config.USERS.ADD_USER, formData, headers)
    .then((data) => {
      return { status: 200, data: data.data };
    })
    .catch((error) => {
      console.log(error)
    //  catchError(error);
    });
};

export const getUsers = async () => {
  return await axios
    .get(Config.USERS.ALL_USERS, headers)
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.log(error)
     // catchError(error);
    });
};