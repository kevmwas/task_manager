import { configureStore } from '@reduxjs/toolkit'
import { taskSlice, tasksCounter } from './slices/task_slice'
import { profile, userSlice } from './slices/user_slice'

export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    tasks_count: tasksCounter.reducer,
    users : userSlice.reducer,
    profile: profile.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch