const Workout = require('../models/workoutModel');
const { sendEmail } = require('../services/emailService');

exports.createWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.create(req.body);

    await sendEmail(req.body.athleteEmail, 'New workout assigned', 'workoutReminder', { workout });

    res.status(201).json({ status: 'success', data: { workout } });
  } catch (err) {
    next(err);
  }
};

exports.getAllWorkouts = async (req, res, next) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json({ status: 'success', data: { workouts } });
  } catch (err) {
    next(err);
  }
};

exports.getWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).send('Workout not found');
    res.status(200).json({ status: 'success', data: { workout } });
  } catch (err) {
    next(err);
  }
};

exports.updateWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!workout) return res.status(404).send('Workout not found');
    res.status(200).json({ status: 'success', data: { workout } });
  } catch (err) {
    next(err);
  }
};

exports.deleteWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).send('Workout not found');
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    next(err);
  }
};
