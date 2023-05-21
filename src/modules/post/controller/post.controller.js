import cloudinary from '../../../services/cloudinary.js';
import { postModel } from '../../../../DB/model/post.model.js';
import { commentModel } from '../../../../DB/model/comment.model.js';
import { pagination } from '../../../services/pagination.js';

export const createPost = async(req,res)=>{
    if(!req.files){
       res.status(400).json({mesage:"image required"});
    }else{
      const {title,caption} = req.body;
      const images = [];
      for(const file of req.files){
         const {secure_url} = await cloudinary.uploader.upload(file.path,{
         folder:`gallery/${req.user._id}/post`
        });
        images.push(secure_url);
      }
      const post = await postModel.create({title,caption,userId:req.user._id,images});
      res.status(201).json({mesage:"image required success"});
    }
}
export const getPosts = async(req,res)=>{
    const {page,size} = req.query;
    const{skip,limit}=pagination(page,size)
    const posts = await postModel.find({}).limit(limit).skip(skip).
    populate({
      path:'userId',
      select:'userName'
    });
    const postList = [] ;
    for(const post of posts){
      let comments = await commentModel.find({postId:post._id}).populate({
        path:'userId',
        select:'userName'
      });
      postList.push({post,comments})
    }
    res.status(200).json({message:"success",postList});
}
export const likePost = async(req,res)=>{
    try{
      const {postId}= req.params;
      const post = await postModel.findOneAndUpdate({_id:postId},
        {$addToSet:{likes:req.user._id},
         $pull:{unlike:req.user._id},
      },{new:true}
      )
      res.status(200).json({message:"success",post});
    }catch(error){
      res.status(500).json({message:"catch error"});
    }
}
export const share = async(req,res)=>{
 try{
  const { postId }= req.params;
  const post = await postModel.findOneAndUpdate({_id:postId},{$addToSet:{share:req.user._id}},{new:true});
  res.status(200).json({message:"share success",post});
 }catch(error){
  res.status(500).json({message:"catch error"});
}

}
