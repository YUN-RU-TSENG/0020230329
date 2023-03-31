import { Typography, Container, Link } from "@mui/material"
import { useNavigate } from "react-router-dom"

function NotFound() {
    const navigate = useNavigate()

    return (
        <Container maxWidth="lg">
            <Typography color="text.primary">404</Typography>
            <Link onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
                Go Home
            </Link>
        </Container>
    )
}

export default NotFound
