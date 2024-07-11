const express = require('express');
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User details
 */
router.get('/:id', getUser);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Updated user details
 */
router.patch('/:id', updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     responses:
 *       204:
 *         description: User deleted successfully
 */
router.delete('/:id', deleteUser);

module.exports = router;
