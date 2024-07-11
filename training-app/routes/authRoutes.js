const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post('/login', login);

module.exports = router;
