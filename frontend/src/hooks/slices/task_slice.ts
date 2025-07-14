import { createSlice } from '@reduxjs/toolkit'
import { fetchTasks, fetchTasksCount } from '../../api/tasks';

interface TaskUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

type TaskStatus = "CANCELLED" | "COMPLETED" | "IN_PROGRESS" | "PENDING";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  createdBy: TaskUser;
  assignedTo: TaskUser;
  createdAt: string;
  updatedAt: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface TasksState {
  value: Task[];
  loading: Boolean,
  error: null,
}

const initialState: TasksState = {
  value: [],
  loading: false,
  error: null,
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export interface CounerState {
  value: {to_do: Number | 0, in_progress: Number | 0, completed: Number | 0, cancelled: Number | 0 };
  loading: Boolean,
  error: null,
}

const counterState: CounerState = {
  value: {
    to_do: 0,
    in_progress: 0,
    completed: 0,
    cancelled: 0
  },
  loading: false,
  error: null,
}

export const tasksCounter = createSlice({
  name: 'tasks_counter',
  initialState: counterState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksCount.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksCount.fulfilled, (state: any, action) => {
        state.loading = false;
        state.value = action.payload;
        state.error = null;
      })
      .addCase(fetchTasksCount.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error ? action.error : null;
      });
  },
});
