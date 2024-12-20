import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function ExerciseCard(props) {
    return (
        <Card variant='shaded'>
            <CardContent>
                <Typography variant='h6'>
                    {props.exercise.exerciseName}
                </Typography>


                <Typography color='text.secondary'>
                    {props.exercise.formResult}%
                </Typography>
            </CardContent>
        </Card>
    );
}