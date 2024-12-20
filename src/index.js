import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'simplebar/dist/simplebar.min.css'
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from '@mui/material/styles';
import lightTheme from './themes/lightTheme';

//#region       [ States ]
import AuthState from './context/auth_context/AuthState';
import ExerciseState from './context/exercise_context/ExerciseState';
//#endregion
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={lightTheme}>
      <AuthState>
        <ExerciseState>
          <App />
        </ExerciseState>
      </AuthState>
    </ThemeProvider>
);


