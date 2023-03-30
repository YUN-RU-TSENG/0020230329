import {
    Container,
    Box,
    Typography,
    Button,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    FormControlLabel,
    FormGroup,
    Checkbox,
} from "@mui/material"

import { blueGrey } from "@mui/material/colors"

function EditTask() {
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
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Label"
                    />
                </FormGroup>
                <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">
                        We&apos;ll never share your email.
                    </FormHelperText>
                </FormControl>
                <Button>Submit</Button>
                <Button>Cancel</Button>
            </Container>
        </Box>
    )
}

export default EditTask
