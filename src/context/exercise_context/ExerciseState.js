import { createContext, useReducer } from 'react';
import axios from 'axios';
import exerciseReducer from './exerciseReducer';
import * as ActionTypes from '../ContextActions';

export const ExerciseContext = createContext();

export default function ExerciseState(props){
    const initialstate = {
        exercises: null,
        currentExercise: null,
        toasts: null,
        exerciseCreated: false
    }

    const [state, dispatch] = useReducer(exerciseReducer, initialstate);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'),
        }
    }

    // #region --------------[ Actions ]--------------

    const getExercises = async () => {
        try {
            const res = await axios.get('/exercises', config);
            dispatch({
                type: ActionTypes.GET_EXERCISES_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.EXERCISE_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getExerciseById = async (exerciseId) => {
        try {
            dispatch({
                type: ActionTypes.GET_EXERCISE_BY_ID,
                payload: exerciseId
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.EXERCISE_FAIL,
                payload: err.response.data,
            })
        }
    }

    const createExercise = async (exerciseData) => {
        try {
            const res = await axios.post('/exercises', exerciseData, config);
            dispatch({
                type: ActionTypes.NEW_EXERCISE_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.EXERCISE_FAIL,
                payload: err.response.data,
            })
        }
    }

    const clearErrors = async () => {
        dispatch({
            type: ActionTypes.CLEAR_ERRORS,
        })
    }

    const clearExercises = async () => {
        dispatch({
            type: ActionTypes.CLEAR_EXERCISES
        })
    }

    const clearCurrentExercise = () =>{
        dispatch({type: ActionTypes.CLEAR_CURRENT_EXERCISE})
    }

    // #endregion

    return (
        <ExerciseContext.Provider value={{
            exercises: state.exercises,
            currentExercise: state.currentExercise,
            toasts: state.toasts,
            exerciseCreated: state.exerciseCreated,
            
            clearCurrentExercise,
            getExercises,
            getExerciseById,
            createExercise,
            clearErrors,
            clearExercises

        }}>
            {props.children}
        </ExerciseContext.Provider>
    )
}