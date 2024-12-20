import { useState, useEffect } from 'react'
import { Container, Stack, TextField, Box, Button, Grid, Typography
} from '@mui/material'
import { toast } from 'react-toastify';

import { useExercise } from '../middleware/contextHooks'
import { useAuth } from '../middleware/contextHooks'
// #region              [ components ]
import MainContainer from '../components/MainContainer'
import ExerciseCard from './exercises/ExerciseCard';
import Masonry from '@mui/lab/Masonry'
// #endregion

export default function Profile() {
    const {currentUser, getProfile, updateUser} = useAuth();
    const [profile, setProfile] = useState({});
    const [isDisabled, setIsDisabled] = useState(true)
    const [temp, setTemp] = useState(null)

    const {toasts, clearErrors, exercises, getExercises} = useExercise();
    const [myExercises, setMyExercises] = useState([]);


    useEffect(() => {
        if(!currentUser) {
            getProfile();
        }

        if(currentUser) {
            setProfile(currentUser)
        }

        if(!exercises){
            getExercises();
        }

        if(exercises) {
            setMyExercises(exercises)
        }

       if(toasts){
           toasts.forEach(ele => {
               toast(ele.message, {type: ele.type})
           })
           clearErrors()
       }
    },[currentUser, getProfile, toasts, clearErrors, exercises, getExercises])

    const handleDisabled = e => {
        setIsDisabled(false)
        setTemp(profile)
    }

    const handleCancel = e => {
        setIsDisabled(true)
        setProfile(temp)
        setTemp(null)
    }

    const handleUpdate = e => {
        setIsDisabled(true)
        updateUser(profile)
    }

    return (
        <MainContainer>
            <Container maxWidth="md" sx={{my: 3}}>
                <Stack spacing={2}>
                    {isDisabled
                            ?<Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Button onClick={handleDisabled}>Edytuj</Button>
                            </Box>
                        : null
                    }

                    <TextField
                        label="Numer indeksu" name="username"
                        value={profile.username} disabled={isDisabled}
                        onChange={(e) => setProfile({...profile, username: e.target.value})}
                    />
                    <TextField
                        label="Email" name="email"
                        value={profile.email} disabled={isDisabled}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />

                    {!isDisabled
                        ?   <Stack spacing={2} direction='row'>
                                <Button onClick={handleUpdate}>Zaktualizuj</Button>
                                <Button onClick={handleCancel}>Anuluj</Button>
                            </Stack>
                        : null
                    }
                </Stack>
                <Box variant='rectangular' sx={{ borderRadius: '16px', border: 1 }} mt={4}>
                    <Grid item xs={12} md={9} mt={3} ml={3} mr={3} mb={3}>
                            <Typography variant="h5">Twoje oceny:</Typography>
                            <Masonry columns={4}>
                                {myExercises?.map(exercise => (
                                    <ExerciseCard exercise={exercise} key={exercise._id} />
                                ))}
                            </Masonry>
                    </Grid>
                </Box>
            </Container>
        </MainContainer>
    )
}