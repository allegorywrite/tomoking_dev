import express from 'express';
// import { register, login } from '../controllers/authController';
import { getLogin, login } from '../controllers/authController';

const router = express.Router();

// router.post('/register', register);
router.post('/login', login);
router.get('/login', getLogin);

export default router;

