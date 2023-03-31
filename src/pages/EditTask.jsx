import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { useUpdateTaskMutation, useGetTasksQuery } from "@/app/services/task"

import {
    Breadcrumbs,
    Link,
    Box,
    Typography,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    CircularProgress,
    Modal,
} from "@mui/material"

function EditTask() {
    const navigate = useNavigate()
    const params = useParams()

    const { data: tasksData, isLoading, isSuccess } = useGetTasksQuery()

    const [
        updateTask,
        { isLoading: isUpdateTasksLoading, isSuccess: isUpdateSuccess },
    ] = useUpdateTaskMutation()

    const [editedTask, setEditedTask] = useState({
        title: "",
        complete: false,
    })

    const [editedTaskTitleError, setEditedTaskTitleError] = useState(null)
    const [isModalShow, setIsModalShow] = useState(false)
    const [modalError, setModalError] = useState(null)

    function handleClose() {
        setIsModalShow(false)
        setModalError(null)
    }

    useEffect(() => {
        if (!isSuccess) return
        setEditedTask({
            title: getTaskById(tasksData, params.id).title,
            complete: getTaskById(tasksData, params.id).complete,
        })
    }, [tasksData])

    useEffect(() => {
        if (!isUpdateSuccess) return
        navigate("/")
    }, [isUpdateSuccess])

    async function updateTaskItem() {
        if (!editedTask.title) return setEditedTaskTitleError("此欄位不能為空")

        try {
            await updateTask({
                ...getTaskById(tasksData, params.id),
                ...editedTask,
            }).unwrap()
        } catch (error) {
            setIsModalShow(true)
            setModalError(error.status + " " + error.data.error)
        }
    }

    function getTaskById(tasks, taskId) {
        return tasks?.items.filter((task) => task._uuid === taskId)?.[0]
    }

    return (
        <>
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
                            修改 Task 失敗
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
                            disabled={isUpdateTasksLoading || isLoading}
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
                                    disabled={isUpdateTasksLoading || isLoading}
                                />
                            }
                            label="已完成"
                        />
                        <Button
                            variant="contained"
                            sx={{ marginBottom: "12px" }}
                            onClick={updateTaskItem}
                            disabled={isUpdateTasksLoading || isLoading}
                        >
                            修改任務
                            {(isLoading || isUpdateTasksLoading) && (
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
                            disabled={isUpdateTasksLoading || isLoading}
                        >
                            取消
                        </Button>
                    </FormGroup>
                </Box>
            </Box>
        </>
    )
}

export default EditTask
