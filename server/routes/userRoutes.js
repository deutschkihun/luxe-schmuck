import express from 'express';
const  router = express.Router();
import {
  authUser,
  registerUser,
  getUsers,
  getUserProfile,
  updateUserProfile
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/register').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
