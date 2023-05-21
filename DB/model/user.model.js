import { Schema,model } from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema  = new Schema({
    userName:{
        type:String,
        required:[true,'username is required'],
    },
    Fullname:{
        type:String,
        required:[true,'fullname is required'],
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true,'email already exists']
    },
    password:{
        type:String,
        required: [true, 'Password is required'],
    },
    age:Number,
    gender:{
        type:String,
        default:'male',
        enum:['male','female']
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    profilePic:String,
    coverPic:Array,
    phone:{
      type:String,
    },
    role:{
        type:String,
        default:'User',
        enum:['User','Admin']
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    sendCode:{
        type:String,
        default:null,
    }
},{timestamps:true})
userSchema.pre("save",async function (){
    this.password=bcrypt.hashSync(this.password,parseInt(process.env.SALTROUND));
})
export const userModel = model('user',userSchema);
