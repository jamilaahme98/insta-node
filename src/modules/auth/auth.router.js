import {Router} from 'express';
const router = Router();
import * as authController from './controller/auth.controller.js';

router.post('/signup',authController.signup);
router.get('/confirmEmail/:token',authController.confirmEmail);
router.get('/signin',authController.signin);
router.get('/sendCode',authController.sendCode);
router.get('/forgetPassword',authController.forgetPassword);
router.get('/getAllUsers',authController.getAllUsers);

export default router;
