import { Schema,Types,model } from "mongoose";
const commentSchema  = new Schema({
   text:{
        type:String,
        required:true,
    },
    userId:{
        type:Types.ObjectId,
        required:true,
        ref:'user',
        required:true,
    },
    postId:{
        type:Types.ObjectId,
        required:true,
        ref:'post',
        required:true,
    },
    likes:[{type:Types.ObjectId,ref:'post'}],
    ////unlike:[{type:Types.ObjectId,ref:'post'}],
    counts:{type:Number,default:0},
},{timestamps:true})

commentSchema.post('findOneAndUpdate',async function(){
    let docToUpdate = await this.model.findOne({_id:this.getQuery()._id});
    docToUpdate.counts = docToUpdate.likes.length ;
    docToUpdate.save();
})
export const commentModel = model('comment',commentSchema);
