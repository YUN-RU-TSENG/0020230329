import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./main.css"
import CssBaseline from "@mui/material/CssBaseline"
import { store } from "./app/store"
import { Provider } from "react-redux"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <CssBaseline />
            <App />
        </Provider>
    </React.StrictMode>
)
