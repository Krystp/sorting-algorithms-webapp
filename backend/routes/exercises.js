const router = require('express').Router();
const auth = require('../middleware/authMiddleware');

const {
  getExercises,
  createExercise,
  getExerciseById
} = require('../controllers/exercise.controller')

router.get('/', [auth], getExercises)

router.post('/', [auth], createExercise)

router.get('/:id', [auth], getExerciseById)


module.exports = router;