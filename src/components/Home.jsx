import {useState, useEffect} from 'react'
import { useNavigate, Link} from 'react-router-dom'
import {
    Grid, TextField, Button, Typography, CssBaseline, Box, Avatar, InputAdornment, Paper
} from '@mui/material'
import { toast } from 'react-toastify';
import Copyright from '../components/Copyright'

// #region      [ Icons ]
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// #endregion

import { useAuth } from '../middleware/contextHooks';

export default function Home() {
    const {loginUser, clearErrors, toasts, isAuthenticated} = useAuth();

    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '', email: '', password: '', confirmPassword: '',
    })

    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if(isAuthenticated) navigate('/main')

        if(toasts) {
            toasts.forEach(ele => {
                toast(ele.message, {
                    type: ele.type
                })
            });
        }
    }, [toasts, isAuthenticated, clearErrors, navigate])

    const handleLogin = () => {
        const { email, password} = user
        if(!email || !password) {
            toast('Proszę wypełnić wszystkie pola', {type: 'error'})
            return
        }

        loginUser(user)
    }
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid 
                item xs={false}
                sm={4} md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/iIJrUoeRoCQ)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        mt: 8, display: 'flex', mx: 4,
                        flexDirection: 'column', alignItems: 'center'
                    }}
                >

                    <Avatar sx={{ m: 1, backgroundColor: 'secondary.main'}}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Logowanie
                    </Typography>

                    <Grid container spacing={2} sx={{mt: 3}}>
                        <Grid item xs={12}>
                            <TextField
                                placeholder='Wprowadź swój email' name='email'
                                label='Email' value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                placeholder='Wprowadź hasło' name='password'
                                label='Hasło' value={user.password}
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setUser({...user, password: e.target.value})}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                    </InputAdornment>
                                }} />
                        </Grid>
                    </Grid>
                    <Button 
                        onClick={handleLogin}
                        fullWidth sx={{
                        mt: 3, mb: 2
                    }}>
                        Zaloguj
                    </Button>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/register">
                                Nie masz konta? Zarejestruj się
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ mt: 6 }}>
                <Copyright />
                </Box>
            </Grid>
        </Grid>
    )
}