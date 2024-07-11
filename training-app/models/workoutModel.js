const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  exercises: [{ type: String, required: true }],
  duration: { type: Number, required: true },
  trainer: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  athlete: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
 
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
