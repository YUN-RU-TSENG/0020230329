import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import {
    addTask,
    setAddedTaskSuccess,
    setErrorOfAddTask,
} from "../features/task/taskSlice"

import {
    Breadcrumbs,
    Link,
    Box,
    Toolbar,
    Container,
    Typography,
    Button,
    FormGroup,
    TextField,
    AppBar,
    Modal,
    CircularProgress,
} from "@mui/material"

function CreateTask() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [newTaskTitleError, setNewTaskTitleError] = useState("")

    const {
        isAddedTaskSuccess,
        errorOfAddTask,
        isLoading: isTaskLoading,
    } = useSelector((state) => state.task)

    useEffect(() => {
        if (!isAddedTaskSuccess) return

        dispatch(setAddedTaskSuccess(false))
        navigate("/")
    }, [isAddedTaskSuccess, dispatch])

    function handleNewTaskTitle(event) {
        setNewTaskTitle(event.target.value)
    }

    function addTaskItem(newTask) {
        if (!newTask.title) return setNewTaskTitleError("此欄位不能為空")

        dispatch(addTask({ ...newTask, complete: false }))
    }

    return (
        <>
            <AppBar
                sx={{ paddingX: "24px", marginBottom: "24px" }}
                position="static"
            >
                <Toolbar disableGutters>
                    <Typography variant="h6" component="a" sx={{}}>
                        Tasks APP
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                {/* Error Modal */}
                <Modal
                    open={!!errorOfAddTask}
                    onClose={() => {
                        dispatch(setErrorOfAddTask(null))
                    }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "#fff",
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            新增 Task 失敗
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {errorOfAddTask}
                        </Typography>
                    </Box>
                </Modal>
                <Box>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" href="/">
                            Home
                        </Link>
                        <Typography>Create task</Typography>
                    </Breadcrumbs>
                    <Typography variant="h6" component="h2" gutterBottom>
                        新增 Task
                    </Typography>
                    <Typography variant="subtitle2" component="p" gutterBottom>
                        輸入想要添加的 Task 吧！
                    </Typography>
                    <FormGroup>
                        <TextField
                            id="outlined-basic"
                            label="Task 名稱"
                            variant="outlined"
                            value={newTaskTitle}
                            onChange={handleNewTaskTitle}
                            disabled={isTaskLoading}
                            sx={{ marginBottom: "12px" }}
                            error={!!newTaskTitleError}
                            helperText={newTaskTitleError.message}
                        />
                        <Button
                            variant="contained"
                            sx={{ marginBottom: "12px" }}
                            onClick={() => addTaskItem({ title: newTaskTitle })}
                            disabled={isTaskLoading}
                        >
                            新增任務
                            {isTaskLoading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: "primary",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        margin: "auto",
                                        zIndex: 1,
                                    }}
                                />
                            )}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/")}
                            disabled={isTaskLoading}
                        >
                            取消
                        </Button>
                    </FormGroup>
                </Box>
            </Container>
        </>
    )
}

export default CreateTask
