import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom"

import Home from "./pages/Home"
import EditTask from "./pages/EditTask"
import CreateTask from "./pages/CreateTask"
import NotFound from "./pages/NotFound"

import { Toolbar, Typography, AppBar, Container } from "@mui/material"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<Home />} />
            <Route path="edit-task/:id" element={<EditTask />} />
            <Route path="create-task" element={<CreateTask />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
)

function App() {
    return (
        <div>
            <AppBar sx={{ paddingX: "24px" }} position="fixed">
                <Toolbar disableGutters>
                    <Typography variant="h6" component="a" sx={{}}>
                        Tasks APP
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ paddingTop: "76px" }}>
                <RouterProvider router={router} />
            </Container>
        </div>
    )
}

export default App
