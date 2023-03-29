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
    console.log(task, task._uuid)
    const response = await api.put(`task/${task._uuid}`, task)
    return response.data
})

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 當 fetchTasks action 開始時，將狀態設置為 loading
            .addCase(fetchTasks.pending, (state) => {
                state.status = "loading"
            })
            // 當 fetchTasks action 完成，將獲取到的 task 列表賦值給 state，並將狀態設置為 succeeded
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.tasks = action.payload.items
            })
            // 當 fetchTasks action 失敗時，將錯誤信息賦值給 state，並將狀態設置為 failed
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            // 當 addTask action 完成時，將新增的 task 加入到 state 中
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(...action.payload.items)
            })
            // 當 deleteTask action 完成時，將被刪除的 task 從 state 中移除
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(
                    (task) => task._uuid !== action.payload
                )
            })
            // 當 updateTask action 完成時，將更新後的 task 賦值給 state 中對應的 task
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(
                    (task) => task._uuid === action.payload.__uuid
                )
                if (index !== -1) {
                    state.tasks[index] = action.payload
                }
            })
    },
})
export default tasksSlice.reducer
