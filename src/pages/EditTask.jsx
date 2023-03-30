import AppBar from "@mui/material/AppBar"

import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"

import TextField from "@mui/material/TextField"

function EditTask() {
    function handleClick(event) {
        event.preventDefault()
        console.info("You clicked a breadcrumb.")
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
                <Box>
                    <div role="presentation" onClick={handleClick}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                MUI
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                href="/material-ui/getting-started/installation/"
                            >
                                Core
                            </Link>
                            <Typography color="text.primary">
                                Breadcrumbs
                            </Typography>
                        </Breadcrumbs>
                    </div>
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    Tasks APP
                </Typography>
                <Typography
                    variant="subtitle2"
                    component="p"
                    gutterBottom
                    sx={{}}
                >
                    Tasks APP
                </Typography>
                <FormGroup>
                    <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        sx={{}}
                    />
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Label"
                    />
                    <Button variant="contained" sx={{ marginBottom: "12px" }}>
                        儲存
                    </Button>
                    <Button variant="outlined">取消</Button>
                </FormGroup>
            </Container>
        </>
    )
}

export default EditTask
