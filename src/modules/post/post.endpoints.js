import { roles } from "../../middlewear/auth.js";

export const endpoint = {
  createPost:[roles.Admin,roles.User],
  creatComment:[roles.Admin,roles.User],
  likePost:[roles.Admin,roles.User],
  ///unlikePost:[roles.Admin,roles.User],
  likeComment:[roles.Admin,roles.User],
  deleteComment:[roles.Admin,roles.User],
  sendMessage:[roles.Admin,roles.User],
  messageList:[roles.Admin,roles.User],
  deletMessage:[roles.Admin,roles.User],
  share:[roles.Admin,roles.User],
}