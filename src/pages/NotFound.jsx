import { Typography, Box, Link } from "@mui/material"
import { useNavigate } from "react-router-dom"

function NotFound() {
    const navigate = useNavigate()

    return (
        <Box>
            <Typography color="text.primary">404</Typography>
            <Link onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
                Go Home
            </Link>
        </Box>
    )
}

export default NotFound
