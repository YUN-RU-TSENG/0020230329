import {
    Breadcrumbs,
    Link,
    Box,
    Toolbar,
    Container,
    Typography,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    AppBar,
} from "@mui/material"

function CreateTask() {
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

export default CreateTask
