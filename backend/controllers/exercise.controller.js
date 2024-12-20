const Exercise = require('../models/exercise.model');
const colors = require('colors');

const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find({ user: req.user.id });
        res.json(exercises);
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const getExerciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findOne({ _id: req.params.id, user: req.user.id });

        if(!exercise) return res.status(404).json([
            {
                message: 'Result not found',
                type: 'error'
            }
        ])
        res.json(exercise);
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const createExercise = async (req, res) => {
    try {
        const { formResult, exerciseName } = req.body;
        const newExercise = new Exercise({
            exerciseName,
            formResult,
            user: req.user.id
        });
        
        await newExercise.save();

        if(!newExercise) return res.status(400).json([{ message: 'Result not created', type: 'error' }]);

        res.json(newExercise);
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    createExercise,
    getExercises,
    getExerciseById
}