import { postModel } from './../../../../DB/model/post.model.js';
import { commentModel } from './../../../../DB/model/comment.model.js';

export const creatComment = async(req,res)=>{
    const {text} = req.body;
    const {id} = req.params;
    const post = await postModel.findById(id);
    if(!post){
        res.status(404).json({message:"connect comment on post not exist"});
    }else{
        const comment = await commentModel.create({text,userId:req.user._id,postId:id});
       await postModel.findByIdAndUpdate(id,{$push:{commentsId:comment._id}});
        res.status(201).json({message:"success"});
    }
}
export const getComments=async(req,res)=>{
    let comments  = await commentModel.find({});
    res.json(comments);
}
//like comment
export const likeComment = async (req, res) => {
    try{
        const {postId}= req.params;
        const {id} = req.params;
        const comment = await commentModel.findOneAndUpdate({_id:postId},
          {$push:{likes:req.user._id},
           $pull:{unlike:req.user._id},
        },{new:true}
        );
        //res.json(comment);
        res.status(200).json({message:"success",comment});
    }catch(error){
        res.status(500).json({message:"catch error"});
    }
}
//delete comment
export const deleteComment = async (req,res)=>{
    const {id} = req.params; //comment id
    const {postId}= req.params;
    const comment = await commentModel.findOneAndDelete({_id:postId});
    if(!comment){
        res.json({message:"invalid delet comment"});
    }else{
        res.json({message:"success"});
    }
}
