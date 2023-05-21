import { Router } from "express";
import { HME, fileValidation, myMulter } from './../../services/multer.js';
import * as postController from './controller/post.controller.js';
import { postModel } from "../../../DB/model/post.model.js";
import { auth, roles } from "../../middlewear/auth.js";
import { endpoint } from "./post.endpoints.js";
const router = Router();

router.post('/',auth(endpoint.createPost),myMulter(fileValidation.image).array('image',5),HME,postController.createPost);
router.get('/',postController.getPosts);
router.patch('/likePost/:postId',auth(endpoint.likePost),postController.likePost);
/////router.patch('/unlikePost/:postId',auth(endpoint.unlikePost),postController.unlikePost);
router.patch('/share/:postId',auth(endpoint.share),postController.share);

export default router;

