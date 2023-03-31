import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAddTaskMutation } from "@/app/services/task"

import {
    Breadcrumbs,
    Link,
    Box,
    Typography,
    Button,
    FormGroup,
    TextField,
    Modal,
    CircularProgress,
} from "@mui/material"

function CreateTask() {
    const navigate = useNavigate()

    const [addTask, { isLoading: isAddTasksLoading }] = useAddTaskMutation()

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [newTaskTitleError, setNewTaskTitleError] = useState(null)
    const [isModalShow, setIsModalShow] = useState(false)
    const [modalError, setModalError] = useState(null)

    function handleClose() {
        setIsModalShow(false)
        setModalError(null)
    }

    function handleNewTaskTitle(event) {
        setNewTaskTitle(event.target.value)
    }

    async function addTaskItem(newTask) {
        if (!newTask.title) return setNewTaskTitleError("此欄位不能為空")

        try {
            await addTask([{ ...newTask, complete: false }]).unwrap()
            navigate("/")
        } catch (error) {
            setIsModalShow(true)
            setModalError(error.status + " " + error.data.error)
        }
    }

    return (
        <Box>
            {/* Error Modal */}
            <Modal
                open={isModalShow}
                onClose={handleClose}
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
                        boxShadow: 4,
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
                        {modalError}
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
                        disabled={isAddTasksLoading}
                        sx={{ marginBottom: "12px" }}
                        error={!!newTaskTitleError}
                        helperText={newTaskTitleError}
                    />
                    <Button
                        variant="contained"
                        sx={{ marginBottom: "12px" }}
                        onClick={() => addTaskItem({ title: newTaskTitle })}
                        disabled={isAddTasksLoading}
                    >
                        新增任務
                        {isAddTasksLoading && (
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
                        disabled={isAddTasksLoading}
                    >
                        取消
                    </Button>
                </FormGroup>
            </Box>
        </Box>
    )
}

export default CreateTask
