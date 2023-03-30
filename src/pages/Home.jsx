import { useState } from "react"

import {
    Container,
    Box,
    Typography,
    List,
    ListItem,
    IconButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Fab,
} from "@mui/material"
import {
    Delete,
    FormatListBulleted,
    EmojiEmotions,
    Add,
} from "@mui/icons-material"
import { blueGrey } from "@mui/material/colors"

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

    const [listItems] = useState([
        {
            _created: 1636112613.207888,
            _data_type: "task",
            _is_deleted: false,
            _modified: 1636112613.207898,
            _self_link:
                "https://crudapi.co.uk/api/v1/task/c54ff081-f858-4e5b-8041-4c22f153c926",
            _user: "baeb6fd4-f196-485f-9130-d5455ad16074",
            _uuid: "c54ff081-f858-4e5b-8041-4c22f153c926",
            completed: false,
            title: "My first task",
        },
        {
            _created: 1636112613.207888,
            _data_type: "task",
            _is_deleted: false,
            _modified: 1636112613.207898,
            _self_link:
                "https://crudapi.co.uk/api/v1/task/c54ff081-f858-4e5b-8041-4c22f153c926",
            _user: "baeb6fd4-f196-485f-9130-d5455ad16074",
            _uuid: "c54ff081-f858-4e5b-8041-4c22f153c926",
            completed: false,
            title: "My first task",
        },
        {
            _created: 1636112613.207888,
            _data_type: "task",
            _is_deleted: false,
            _modified: 1636112613.207898,
            _self_link:
                "https://crudapi.co.uk/api/v1/task/c54ff081-f858-4e5b-8041-4c22f153c926",
            _user: "baeb6fd4-f196-485f-9130-d5455ad16074",
            _uuid: "c54ff081-f858-4e5b-8041-4c22f153c926",
            completed: false,
            title: "My first task",
        },
        {
            _created: 1636112613.207888,
            _data_type: "task",
            _is_deleted: false,
            _modified: 1636112613.207898,
            _self_link:
                "https://crudapi.co.uk/api/v1/task/c54ff081-f858-4e5b-8041-4c22f153c926",
            _user: "baeb6fd4-f196-485f-9130-d5455ad16074",
            _uuid: "c54ff081-f858-4e5b-8041-4c22f153c926",
            completed: false,
            title: "My first task",
        },
    ])

    return (
        <Box
            sx={{
                bgcolor: blueGrey[100],
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    paddingY: "12px",
                    minHeight: "100vh",
                }}
            >
                <Box sx={{ marginBottom: "24px" }}>
                    <Typography
                        variant="h5"
                        gutterBottom
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            color: blueGrey[800],
                        }}
                    >
                        Task List
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: blueGrey[700],
                        }}
                    >
                        You can add your tasks here, limit 500 tasks.
                    </Typography>
                </Box>
                <Box>
                    <List
                        dense={true}
                        sx={{
                            borderRadius: "8px",
                            bgcolor: blueGrey[200],
                        }}
                    >
                        {listItems.length === 0 ? (
                            <Box sx={{ textAlign: "center", padding: "12px" }}>
                                <EmojiEmotions />{" "}
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    sx={{
                                        color: blueGrey[700],
                                    }}
                                >
                                    There is empty. Try to add some tasks.
                                </Typography>
                            </Box>
                        ) : (
                            listItems.map((item) => (
                                <ListItem
                                    key={item._uuid}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <Delete
                                                sx={{ color: blueGrey[700] }}
                                            />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: blueGrey[400] }}>
                                            <FormatListBulleted />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.title} />
                                </ListItem>
                            ))
                        )}
                    </List>
                </Box>
                <Box sx={{ position: "fixed", right: "12px", bottom: "12px" }}>
                    <Fab color="primary" aria-label="add">
                        <Add />
                    </Fab>
                </Box>
            </Container>
        </Box>
    )
}

export default Home
