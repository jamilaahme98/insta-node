import { userModel } from './../../../../DB/model/user.model.js';
import { messageModel } from './../../../../DB/model/message.model.js';

export const sendMessage = async (req,res)=>{
    const {reciverId} = req.params;
    const {message,seen} = req.body;
    const user = await userModel.findById(reciverId);
    if(!user){
      res.status(404).json({message:"reciver not found"});
    }else{
      const newMessage = new messageModel({message:message,reciverId,seen:reciverId});
      const saveMessage = await newMessage.save();
      res.status(201).json({message:'success',saveMessage});
    }
}
export const messageList = async (req,res)=>{
    const messages = await messageModel.find({reciverId:req.user._id});
    res.status(201).json({messgae:'success',messages});
}
export const deletMessage = async (req,res)=>{
    const {id} = req.params;//message id
    const userId = req.user._id;
    const message = await messageModel.findOneAndDelete({_id:id,reciverId:userId});
    if(!message){
        res.status(404).json({message:"invalid delet message"});
    }else{
        res.status(201).json({message:"success"});
    }
}