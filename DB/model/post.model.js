import { Schema,Types,model } from "mongoose";
const postSchema  = new Schema({
   title:{
        type:String,
        required:true,
    },
    caption:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    location: {
        type: String,
    },
    images:{
        type:Array,
        required:true,
    },
    userId:{
        type:Types.ObjectId,
        required:true,
        ref:'user'
    },
    likes:[{type:Types.ObjectId,ref:'user'}],
    /////unlike:[{type:Types.ObjectId,ref:'user'}],
    share:[{type:Types.ObjectId,ref:'user'}],
    counts:{type:Number,default:0},
    commentsId:[{type:Types.ObjectId,ref:'comment'}],
},{timestamps:true})

postSchema.post('findOneAndUpdate',async function(){
   let docToUpdate = await this.model.findOne({_id:this.getQuery()._id});
   docToUpdate.counts = docToUpdate.likes.length;
   docToUpdate.save();
})
export const postModel = model('post',postSchema);

