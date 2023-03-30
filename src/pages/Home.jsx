import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import {
    fetchTasks,
    // addTask,
    // deleteTask,
    // updateTask,
} from "../features/task/taskSlice"

import {
    Box,
    Toolbar,
    Container,
    Modal,
    Typography,
    Checkbox,
    AppBar,
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
} from "@mui/material"

import {
    Add as AddIcon,
    Delete as DeleteIcon,
    ModeEdit as ModeEditIcon,
} from "@mui/icons-material"

function Home() {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const taskStore = useSelector((state) => state.task)

    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])

    // function getTaskItem(newTask) {
    //     dispatch(fetchTasks(newTask))
    // }

    // function addTaskItem(newTask) {
    //     dispatch(addTask(newTask))
    // }

    // function deleteTaskItem(id) {
    //     dispatch(deleteTask(id))
    // }

    // function updateTaskItem({ _uuid, completed, title }) {
    //     dispatch(updateTask({ _uuid, completed, title }))
    // }

    const [checked, setChecked] = useState([0])
    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    return (
        <>
            <AppBar sx={{ paddingX: "24px" }} position="fixed">
                <Toolbar disableGutters>
                    <Typography variant="h6" component="a" sx={{}}>
                        Tasks APP
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ paddingTop: "76px" }}>
                <List
                    sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                    }}
                >
                    {taskStore.isLoading && (
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
                    {taskStore.error && (
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box>
                                <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    異常錯誤
                                </Typography>
                                <Typography
                                    id="modal-modal-description"
                                    sx={{ mt: 2 }}
                                >
                                    {taskStore.error}
                                </Typography>
                            </Box>
                        </Modal>
                    )}
                    {taskStore.tasks.map((task) => {
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
                                            >
                                                <ModeEditIcon />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="comments"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton
                                        role={undefined}
                                        onClick={handleToggle(task)}
                                        dense
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={
                                                    checked.indexOf(task) !== -1
                                                }
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{
                                                    "aria-labelledby": labelId,
                                                }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            id={labelId}
                                            primary={`Line item ${task._uuid}`}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </div>
                        )
                    })}
                </List>
            </Container>
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
