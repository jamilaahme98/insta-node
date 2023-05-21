import { Router } from "express";
import { HME, fileValidation, myMulter } from './../../services/multer.js';
import { auth, roles } from "../../middlewear/auth.js";
import * as commentController from './controller/comment.controller.js';
import { endpoint } from "../post/post.endpoints.js";
const router = Router();

router.post('/:id/comment',auth(endpoint.creatComment),commentController.creatComment);
router.get('/',commentController.getComments);
router.patch('/like/:postId',auth(endpoint.likeComment),commentController.likeComment);
router.delete('/:postId',auth(endpoint.deleteComment),commentController.deleteComment);

export default router;
