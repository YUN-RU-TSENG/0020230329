import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import {
    updateTask,
    setEditedTaskSuccess,
    setErrorOfEditedTask,
    getTaskById,
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
    FormControlLabel,
    Checkbox,
    TextField,
    AppBar,
    CircularProgress,
    Modal,
} from "@mui/material"

function EditTask() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    const {
        isLoading: isTaskLoading,
        isEditedTaskSuccess,
        errorOfEditedTask,
    } = useSelector((state) => state.task)
    const initEditTask = useSelector(getTaskById(params.id))

    const [editedTask, setEditedTask] = useState({
        title: initEditTask.title,
        complete: initEditTask.complete,
    })
    const [editedTaskTitleError, setEditedTaskTitleError] = useState(null)

    useEffect(() => {
        if (!isEditedTaskSuccess) return

        dispatch(setEditedTaskSuccess(false))
        navigate("/")
    }, [isEditedTaskSuccess, dispatch])

    function updateTaskItem() {
        if (!editedTask.title) return setEditedTaskTitleError("此欄位不能為空")

        dispatch(updateTask({ ...initEditTask, ...editedTask }))
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
                    open={!!errorOfEditedTask}
                    onClose={() => {
                        dispatch(setErrorOfEditedTask(null))
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
                            修改 Task 失敗
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {errorOfEditedTask}
                        </Typography>
                    </Box>
                </Modal>
                <Box>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" href="/">
                            Home
                        </Link>
                        <Typography>Edit task</Typography>
                    </Breadcrumbs>

                    <Typography variant="h6" component="h2" gutterBottom>
                        編輯 Edit
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        component="p"
                        gutterBottom
                        sx={{}}
                    >
                        修改你的 Task 吧！
                    </Typography>
                    <FormGroup>
                        <TextField
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                            value={editedTask.title}
                            error={!!editedTaskTitleError}
                            helperText={editedTaskTitleError}
                            onChange={(e) => {
                                setEditedTask((prevState) => ({
                                    ...prevState,
                                    title: e.target.value,
                                }))
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={editedTask.complete}
                                    onChange={(e) => {
                                        setEditedTask((prevState) => ({
                                            ...prevState,
                                            complete: e.target.checked,
                                        }))
                                    }}
                                />
                            }
                            label="已完成"
                        />
                        <Button
                            variant="contained"
                            sx={{ marginBottom: "12px" }}
                            onClick={updateTaskItem}
                            disabled={isTaskLoading}
                        >
                            修改任務
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

export default EditTask
