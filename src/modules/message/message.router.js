import {Router} from 'express';
import * as messageController from './controller/message.controller.js';
import { HME, fileValidation, myMulter } from './../../services/multer.js';
import { auth, roles } from "../../middlewear/auth.js";
import { endpoint } from "../post/post.endpoints.js";
const router = Router();

router.post('/:reciverId',auth(endpoint.sendMessage),messageController.sendMessage);
router.get('/message',auth(endpoint.messageList),messageController.messageList);
router.delete('/:id',auth(endpoint.deletMessage),messageController.deletMessage);

export default router;
