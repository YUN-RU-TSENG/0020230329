import { configureStore } from "@reduxjs/toolkit"
import { taskAPI } from "./services/task"

export const store = configureStore({
    reducer: {
        [taskAPI.reducerPath]: taskAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(taskAPI.middleware),
})
