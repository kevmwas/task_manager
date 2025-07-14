import { createSlice } from "@reduxjs/toolkit";
import { fetchMyProfile, fetchUsers, newUser, updateUser } from "../../api/users";

export interface User {
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
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        // Replace or add the profile in state.value
        const profile = action.payload;
        if (profile && profile.id) {
          const idx = state.value.findIndex((user) => user.id === profile.id);
          if (idx !== -1) {
            state.value[idx] = profile;
          } else {
            state.value.push(profile);
          }
        }
        state.error = null;
      })
      .addCase(fetchMyProfile.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
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

export interface ProfileState {
    value: User;
    loading: Boolean;
    error: null;
  }
  
  const profileState: ProfileState = {
    value: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        password: null,
        phone: "",
        id_no: null,
        bio: null,
        gender: null,
        dob: null,
        country: null,
        county: null,
        location: null,
        city: null,
        otp_code: null,
        otp_expiration: null,
        is_active: false,
        profile: "",
        role: "",
        createdAt: "",
        updatedAt: ""
    },
    loading: false,
    error: null,
  };

export const profile = createSlice({
    name: "profile",
    initialState: profileState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchMyProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchMyProfile.fulfilled, (state, action) => {
          state.loading = false;
          const profile = action.payload;
          if (profile && profile.id) {
            state.value = profile;
          }
          state.error = null;
        })
        .addCase(fetchMyProfile.rejected, (state) => {
          state.loading = false;
          state.error = null;
        })
  }});
