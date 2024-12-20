import {useState, useEffect} from 'react'
import { useNavigate, Link} from 'react-router-dom'
import {
    Grid, TextField, Button, Typography, CssBaseline, Container, Box, Avatar, ListItemSecondaryAction, useRadioGroup, InputAdornment
} from '@mui/material'
import { toast } from 'react-toastify';
import Copyright from '../components/Copyright'

// #region      [ Icons ]
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// #endregion

import { useAuth } from '../middleware/contextHooks';

export default function Register() {
    const {registerUser, clearErrors, toasts, isAuthenticated} = useAuth();

    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '', email: '', password: '', confirmPassword: '',
    })

    const [showPassword, setShowPassword] = useState({
        password: false, confirmPassword: false
    })

    useEffect(() => {
        if(isAuthenticated) navigate('/login')

        if(toasts) {
            toasts.forEach(ele => {
                toast(ele.message, {
                    type: ele.type
                })
            });
        }
    }, [toasts, isAuthenticated, clearErrors, navigate])

    const handleRegister = () => {
        const { username, email, password, confirmPassword} = user
        if(!username || !email || !password || !confirmPassword) {
            toast('Proszę wypełnić wszystkie pola', {type: 'error'})
            return
        }

        if(password !== confirmPassword) {
            toast('Hasła nie są identyczne', {type: 'error'})
            return
        }

        registerUser(user)
    }
    return (
        <Container maxWidth="xs">
            <CssBaseline />

            <Box
                sx={{
                    marginTop: 8, display: 'flex', mb: 6,
                    flexDirection: 'column', alignItems: 'center'
                }}
            >

                <Avatar sx={{ m: 1, backgroundColor: 'secondary.main'}}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Rejestracja
                </Typography>

                <Grid container spacing={2} sx={{mt: 3}}>
                    <Grid item xs={12}>
                        <TextField
                            placeholder='Wprowadź swój numer indeksu' name='username'
                            label='Numer indeksu' value={user.username}
                            onChange={(e) => setUser({...user, username: e.target.value})} />
                    </Grid>
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
                            type={showPassword.password ? 'text' : 'password'}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" onClick={() => setShowPassword({...showPassword, password: !showPassword.password})}>
                                    {showPassword.password ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                </InputAdornment>
                            }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            placeholder='Potwierdź hasło' name='confirmPassword'
                            label='Potwierdź hasło' value={user.confirmPassword}
                            type={showPassword.confirmPassword ? 'text' : 'password'}
                            onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" onClick={() => setShowPassword({...showPassword, confirmPassword: !showPassword.confirmPassword})}>
                                    {showPassword.confirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                </InputAdornment>
                            }} />
                    </Grid>
                </Grid>
                <Button 
                    onClick={handleRegister}
                    fullWidth sx={{
                    mt: 3, mb: 2
                }}>
                    Zarejestruj
                </Button>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to="/Login">
                            Masz już konto? Zaloguj się
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Copyright sx={{ mt: 4}} />
        </Container>
    )
}