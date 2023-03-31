import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
    useGetTasksQuery,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
} from "@/app/services/task"

import {
    Box,
    Checkbox,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Fab,
    CircularProgress,
    Stack,
    Modal,
    Typography,
} from "@mui/material"

import {
    Add as AddIcon,
    Delete as DeleteIcon,
    ModeEdit as ModeEditIcon,
} from "@mui/icons-material"

function Home() {
    const navigate = useNavigate()

    const { data: tasksData, isLoading: isGetTasksLoading } = useGetTasksQuery()

    const [updateTask, { isLoading: isUpdateTasksLoading }] =
        useUpdateTaskMutation()

    const [deleteTask, { isLoading: isDeleteTasksLoading }] =
        useDeleteTaskMutation()

    const [isModalShow, setIsModalShow] = useState(false)
    const [modalError, setModalError] = useState(null)

    const handleClose = () => {
        setIsModalShow(false)
        setModalError(null)
    }

    async function deleteTaskItem(id) {
        try {
            await deleteTask(id).unwrap()
        } catch (error) {
            setIsModalShow(true)
            setModalError(error.status + " " + error.data.error)
        }
    }

    async function updateTaskItem(taskId, complete) {
        try {
            await updateTask({
                _uuid: taskId,
                complete,
            }).unwrap()
        } catch (error) {
            setIsModalShow(true)
            setModalError(error.status + " " + error.data.error)
        }
    }

    return (
        <>
            <Box>
                <List
                    sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                    }}
                >
                    {(isDeleteTasksLoading ||
                        isGetTasksLoading ||
                        isUpdateTasksLoading) && (
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={0}
                            sx={{
                                position: "fixed",
                                bgcolor: "#cfcfcf50",
                                top: "0",
                                left: "0",
                                right: "0",
                                bottom: "0",
                            }}
                            zIndex="9"
                        >
                            <CircularProgress />
                        </Stack>
                    )}
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
                                刪除失敗
                            </Typography>
                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                            >
                                {modalError}
                            </Typography>
                        </Box>
                    </Modal>
                    {tasksData?.items.map((task) => {
                        const labelId = `checkbox-list-label-${task._uuid}`
                        return (
                            <div key={task._uuid}>
                                <ListItem
                                    secondaryAction={
                                        <Box>
                                            <IconButton
                                                edge="end"
                                                aria-label="comments"
                                                sx={{ marginRight: "12px" }}
                                                onClick={() =>
                                                    navigate(
                                                        `/edit-task/${task._uuid}`
                                                    )
                                                }
                                            >
                                                <ModeEditIcon />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="comments"
                                                onClick={() =>
                                                    deleteTaskItem(task._uuid)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={!!task.complete}
                                                onChange={(e) => {
                                                    updateTaskItem(
                                                        task._uuid,
                                                        e.target.checked
                                                    )
                                                }}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{
                                                    "aria-labelledby": labelId,
                                                }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            id={labelId}
                                            primary={task.title}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </div>
                        )
                    })}
                </List>
            </Box>
            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: "fixed", right: "24px", bottom: "24px" }}
                onClick={() => navigate("/create-task")}
            >
                <AddIcon />
            </Fab>
        </>
    )
}

export default Home
