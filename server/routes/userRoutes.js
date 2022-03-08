import express from 'express';
const router = express.Router();
import {
  registerUser,
  getUsers,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/register').post(registerUser).get(protect, admin, getUsers);

export default router;
