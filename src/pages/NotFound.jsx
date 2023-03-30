import { Typography, AppBar, Toolbar, Container } from "@mui/material"

function NotFound() {
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
                <Typography color="text.primary">404</Typography>
            </Container>
        </>
    )
}

export default NotFound
