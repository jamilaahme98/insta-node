import cloudinary from '../../../services/cloudinary.js';
import { userModel } from './../../../../DB/model/user.model.js';
import bcrypt from "bcrypt";
import QRCode from 'qrcode';

export const getProfile = async (req,res)=>{
    try{
      const user = await userModel.findById(req.user._id);
      res.status(200).json({message:"success",user});
    }catch(error){
        res.status(500).json({message:"server error",error});
    }
}
export const profilePic = async(req,res)=>{
    try{ 
      if(!req.file){
        res.status(400).json({message:'plz upload profile pic'});
      }else{
        const {secure_url} = await cloudinary.uploader.upload(req.file.path,{
          folder:`user/${req.user._id}/profilePic`
        });
        const user = await userModel.findByIdAndUpdate(req.user._id,{profilePic:secure_url});
        res.status(200).json({message:'success'});
      }
    }catch(err){
      res.status(500).json({message:'catch error'});
    }
}
export const profileCoverPic = async(req,res)=>{
    try{ 
      if(!req.files){
        res.status(400).json({message:'plz upload profile pic'});
      }else{
        const images = [];
        for(const file of req.files){
           const {secure_url} = await cloudinary.uploader.upload(file.path,{
           folder:`user/${req.user._id}/profileCoverPic`
          });
          images.push(secure_url);
        }
        const user = await userModel.findByIdAndUpdate(req.user._id,{coverPic:images});
        res.status(200).json({message:'success'});
      }
    }catch(err){
      res.status(500).json({message:'catch error'});
    }
}
export const updatePassword = async(req,res)=>{
  const { oldPassword,newPassword } = req.body;
  const user = await userModel.findById(req.user._id);
  const match = await bcrypt.compare(oldPassword,user.password);
  ///res.json(user.password);
  if(!match){
    res.json({message:'in-valid password'});
  }else{
    bcrypt.hash(newPassword,8,async function(err,hash){
      await userModel.findByIdAndUpdate({_id:user._id},{password:hash});
      res.json({message:'Done password update successfully'});
    })
  }
}
export const qrcode = async(req,res)=>{
  let link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/user/getProfile`
  QRCode.toDataURL("Instagram",{type:'terminal'}, function (err, url) {
    res.json(url);
    console.log(url);
  })
}