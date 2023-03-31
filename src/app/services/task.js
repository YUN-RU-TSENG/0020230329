import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const taskAPI = createApi({
    reducerPath: "taskAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.DEV
            ? "/api"
            : import.meta.env.VITE_BASE_API_URL,
    }),
    tagTypes: ["Tasks"],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => {
                return {
                    url: "/task",
                    headers: {
                        Authorization: `Bearer ${
                            import.meta.env.VITE_BASE_API_URL_AUTH_TOKEN
                        }`,
                    },
                }
            },
            providesTags: ["Tasks"],
        }),
        addTask: builder.mutation({
            query(task) {
                return {
                    url: `/task`,
                    method: "POST",
                    body: task,
                    headers: {
                        Authorization: `Bearer ${
                            import.meta.env.VITE_BASE_API_URL_AUTH_TOKEN
                        }`,
                    },
                }
            },
            invalidatesTags: ["Tasks"],
        }),
        updateTask: builder.mutation({
            query: (task) => {
                return {
                    url: `/task/${task._uuid}`,
                    method: "PUT",
                    body: task,
                    headers: {
                        Authorization: `Bearer ${
                            import.meta.env.VITE_BASE_API_URL_AUTH_TOKEN
                        }`,
                    },
                }
            },
            invalidatesTags: ["Tasks"],
        }),
        deleteTask: builder.mutation({
            query(taskId) {
                return {
                    url: `/task/${taskId}`,
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${
                            import.meta.env.VITE_BASE_API_URL_AUTH_TOKEN
                        }`,
                    },
                }
            },
            invalidatesTags: ["Tasks"],
        }),
    }),
})

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = taskAPI
