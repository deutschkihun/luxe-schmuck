import express from 'express';
const  router = express.Router();
import {
  authUser,
  registerUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  findEmail
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/register').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post('/findemail',findEmail)

export default router;
