import { Router } from "express";
import * as userController from './controller/user.controller.js';
import { auth, roles } from './../../middlewear/auth.js';
import { HME, fileValidation, myMulter } from './../../services/multer.js';
const router = Router();

router.get('/profile',auth([roles.Admin,roles.User]),userController.getProfile);
router.patch('/profilePic',auth([roles.Admin,roles.User]),myMulter(fileValidation.image).single('image'),HME,userController.profilePic);
router.patch('/profileCoverPic',auth([roles.Admin,roles.User]),myMulter(fileValidation.image).array('image',3),HME,userController.profileCoverPic);
router.patch('/updatePassword',auth([roles.User,roles.Admin]),userController.updatePassword);
router.get('/qrcode',userController.qrcode);

export default router;
