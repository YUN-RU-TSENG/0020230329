import { Box, Typography, Link, Stack } from "@mui/material"
import { blueGrey } from "@mui/material/colors"

function NotFound() {
    return (
        <Box
            sx={{
                bgcolor: blueGrey[100],
            }}
        >
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0}
                sx={{ minHeight: "100vh" }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    component="h2"
                    sx={{
                        fontWeight: 700,
                        color: blueGrey[800],
                    }}
                >
                    404，回首頁 <Link href="#">Link</Link>
                </Typography>
            </Stack>
        </Box>
    )
}

export default NotFound
