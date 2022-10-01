import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import LockOutlined from "@mui/icons-material/LockOutlined"
import { useState } from "react"
import { login } from "../../lib"
import { useNavigate } from "react-router-dom"

const Login = ({ setToken }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [error,setError] = useState({ display: false, message: "" })
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await login(formData)
        if (response.message) {
            return setError({...error, display: true, message: response.message})
        } else {
            setToken(response)
            navigate("/home")
        }
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined></LockOutlined>
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        error={error.display}
                        helperText={error.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Login