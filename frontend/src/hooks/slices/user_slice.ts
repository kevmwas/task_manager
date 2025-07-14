import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, newUser, updateUser } from "../../api/users";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: null;
  phone: string;
  id_no: string | null;
  bio: string | null;
  gender: string | null;
  dob: string | null;
  country: string | null;
  county: string | null;
  location: string | null;
  city: string | null;
  otp_code: string | null;
  otp_expiration: string | null;
  is_active: boolean;
  profile: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  value: User[];
  loading: Boolean;
  error: null;
}

const initialState: UserState = {
  value: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(newUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          state.value.push(action.payload.data);
        }
        state.error = null;
      })
      .addCase(newUser.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload as unknown as User;
        state.value = state.value.map((user) =>
          user && updatedUser && 'id' in updatedUser && user.id === updatedUser.id ? updatedUser : user
        );
        state.error = null; })
}});
