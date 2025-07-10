import axios from "axios";
import { catchError, Config, headers } from "./config";

export const newUser = async (info: any) => {
      const formData = new FormData(info.currentTarget);
  
      const data = {
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        password: formData.get("password"),
        id_no: formData.get("id_no"),
        bio: formData.get("bio"),
        gender: formData.get("gender"),
        dob: formData.get("dob"),
        country: formData.get("country"),
        county: formData.get("county"),
        location: formData.get("location"),
        city: formData.get("city"),
        role: formData.get("role") || "user"
      };


  return await axios
    .post(Config.USERS.ADD_USER, data, headers)
    .then((data) => {
      return { status: 200, data: data.data };
    })
    .catch((error) => {
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