const express = require('express');
const { createWorkout, getAllWorkouts, getWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController');
const router = express.Router();

/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Create a new workout
 *     tags: [Workouts]
 *     responses:
 *       201:
 *         description: Workout created successfully
 */
router.post('/', createWorkout);

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Get all workouts
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: List of workouts
 */
router.get('/', getAllWorkouts);

/**
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     summary: Get a workout by ID
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: Workout details
 */
router.get('/:id', getWorkout);

/**
 * @swagger
 * /api/workouts/{id}:
 *   patch:
 *     summary: Update a workout by ID
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: Updated workout details
 */
router.patch('/:id', updateWorkout);

/**
 * @swagger
 * /api/workouts/{id}:
 *   delete:
 *     summary: Delete a workout by ID
 *     tags: [Workouts]
 *     responses:
 *       204:
 *         description: Workout deleted successfully
 */
router.delete('/:id', deleteWorkout);

module.exports = router;
