import { Schema,Types,model } from "mongoose";
const messageSchema = new Schema({
    sender:{
        type: Types.ObjectId,
        ref: 'user',
    },
    message:{
    type:String,
    required:true,
   },
   reciverId:{
    type: Types.ObjectId,
    ref:'user',
    required:true,
   },
   createdAt: {
    type: Date,
    default: Date.now,
   },
   seen: [{type:Types.ObjectId,ref:'user'}],
},{timestamps:true});

export const messageModel = model('message',messageSchema);
