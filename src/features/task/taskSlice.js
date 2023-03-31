import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api"

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    const response = await api.get("/task")
    return response.data
})

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
    const response = await api.post("/task", [task])
    return response.data
})

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
    await api.delete(`task/${id}`)
    return id
})

export const updateTask = createAsyncThunk("tasks/updateTask", async (task) => {
    const response = await api.put(`task/${task._uuid}`, task)
    return response.data
})

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        isLoading: false,
        error: null,
        isAddedTaskSuccess: false,
        errorOfAddTask: null,
        isEditedTaskSuccess: false,
        errorOfEditedTask: null,
        errorOfDeleteTask: null,
    },
    reducers: {
        setAddedTaskSuccess(state, action) {
            state.isAddedTaskSuccess = action.payload
        },
        setErrorOfAddTask(state, action) {
            state.errorOfAddTask = action.payload
        },
        setEditedTaskSuccess(state, action) {
            state.isEditedTaskSuccess = action.payload
        },
        setErrorOfEditedTask(state, action) {
            state.errorOfEditedTask = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.isLoading = false
                state.tasks = action.payload.items
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(addTask.pending, (state) => {
                state.isLoading = true
                state.errorOfAddTask = null
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAddedTaskSuccess = true
                state.tasks.push(...action.payload.items)
            })
            .addCase(addTask.rejected, (state, action) => {
                state.isLoading = false
                state.errorOfAddTask = action.error.message
            })
            .addCase(deleteTask.pending, (state) => {
                state.errorOfDeleteTask = null
                state.isLoading = true
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.tasks = state.tasks.filter(
                    (task) => task._uuid !== action.payload
                )
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.isLoading = false
                state.errorOfDeleteTask = action.error.message
            })
            .addCase(updateTask.pending, (state) => {
                state.isLoading = true
                state.errorOfEditedTask = null
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isEditedTaskSuccess = true
                const index = state.tasks.findIndex(
                    (task) => task._uuid === action.payload.__uuid
                )
                if (index !== -1) {
                    state.tasks[index] = action.payload
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoading = false
                state.errorOfEditedTask = action.error.message
            })
    },
})

export default tasksSlice.reducer

export const {
    setAddedTaskSuccess,
    setErrorOfAddTask,
    setEditedTaskSuccess,
    setErrorOfEditedTask,
} = tasksSlice.actions

export const getTaskById = (taskId) => (state) => {
    const taskStore = state.task

    return taskStore.tasks.filter((task) => task._uuid === taskId)?.[0]
}
