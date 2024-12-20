import { useContext } from "react";
import { AuthContext } from "../context/auth_context/AuthState";
import { ExerciseContext } from '../context/exercise_context/ExerciseState';

export function useAuth() {
    return useContext(AuthContext);
}

export function useExercise(){
    return useContext(ExerciseContext);
}