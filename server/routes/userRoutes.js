import express from 'express';
const  router = express.Router();
import {
  authUser,
  registerUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  findEmail,
  findPW,
  resetPW,
  getUserById,
  deleteUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post('/findemail',findEmail)
router.post('/findpw',findPW)
router.post('/resetpw',resetPW)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, getUserById)


export default router;
