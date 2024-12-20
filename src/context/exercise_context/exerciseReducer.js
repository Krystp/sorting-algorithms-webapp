import * as ActionTypes from '../ContextActions'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case ActionTypes.NEW_EXERCISE_SUCCESS:
            let exercises = state.exercises ? state.exercises : [];

            return{
                ...state,
                exerciseCreated: true,
                currentExercise: action.payload,
                exercises: [...exercises, action.payload]
            }
        case ActionTypes.GET_EXERCISES_SUCCESS:
            return{
                ...state,
                exercises: action.payload
            }
        case ActionTypes.EXERCISE_FAIL:
            return{
                ...state,
                toasts: action.payload
            }
        case ActionTypes.GET_EXERCISE_BY_ID:
            return {
                ...state,
                currentExercise: state.exercises ? state.exercises.find(exercise => exercise._id === action.payload) : null
            }
        case ActionTypes.CLEAR_ERRORS:
            return {
                ...state,
                toasts: null
            }
        case ActionTypes.CLEAR_CURRENT_EXERCISE:
            return {
                ...state,
                currentExercise: null,
                exerciseCreated: false
            }
        case ActionTypes.CLEAR_EXERCISES:
            return {
                ...state,
                exercises: null,
                currentExercise: null,
                exerciseCreated: false,
                toasts: null
            }
        default:
            return state;
    }
}