import { useState } from "react"

import {
    Box,
    Toolbar,
    Container,
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
} from "@mui/material"
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    ModeEdit as ModeEditIcon,
} from "@mui/icons-material"

// import { useSelector, useDispatch } from "react-redux"
// import {
//     fetchTasks,
//     addTask,
//     deleteTask,
//     updateTask,
// } from "../features/task/taskSlice"

function Home() {
    // const taskStore = useSelector((state) => state.task)
    // const dispatch = useDispatch()

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
                <List
                    sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                    }}
                >
                    {[0, 1, 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`

                        return (
                            <div key={value}>
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
                                        onClick={handleToggle(value)}
                                        dense
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={
                                                    checked.indexOf(value) !==
                                                    -1
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
                                            primary={`Line item ${value + 1}`}
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
            >
                <AddIcon />
            </Fab>
        </>
    )
}

export default Home
