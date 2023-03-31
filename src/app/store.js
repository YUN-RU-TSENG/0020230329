import { configureStore } from "@reduxjs/toolkit"
import { taskAPI } from "@/app/services/task"

export const store = configureStore({
    reducer: {
        [taskAPI.reducerPath]: taskAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(taskAPI.middleware),
})
