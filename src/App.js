import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer, Zoom, Slide, Bounce, Flip } from 'react-toastify';

// #region        [ Import Components ]
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import MainPage from "./components/MainPage";

import { Controller as Sorting } from "./components/sorting/Controller"
import Exercises from "./components/exercises/Exercises";
import ExerciseTwo from "./components/exercises/ExerciseTwo";
import ExerciseThree from "./components/exercises/ExerciseThree";
// #endregion

function transitionAnimation() {
  const list = [Zoom, Slide, Bounce, Flip];
  return list[Math.floor(Math.random() * list.length)];
}

function transitionPosition() {
  const list = ['top-right', 'top-center', 'top-left'];
  return list[Math.floor(Math.random() * list.length)];
}

function App() {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<PrivateRoute />} >
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/exercises" element={<PrivateRoute />} >
            <Route path="/exercises" element={<Exercises />} />
          </Route>

          <Route path="/exercisetwo" element={<PrivateRoute />} >
            <Route path="/exercisetwo" element={<ExerciseTwo />} />
          </Route>

          <Route path="/exercisethree" element={<PrivateRoute />} >
            <Route path="/exercisethree" element={<ExerciseThree />} />
          </Route>

          <Route path="/main" element={<MainPage />} />

          <Route path="/sorting" element={<Sorting />} />
        </Routes>
      </Router>

      <ToastContainer
        position={transitionPosition()} autoClose={2000}
        hideProgressBar={false} newestOnTop closeOnClick
        rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover
        transition={transitionAnimation()}
      />
    </div>
  );
}

export default App;
