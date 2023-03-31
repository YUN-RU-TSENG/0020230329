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
            <RouterProvider router={router} />
        </div>
    )
}

export default App
