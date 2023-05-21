import mongoose  from 'mongoose';
const connectDB = async()=>{
    return await mongoose.connect(process.env.DBURI)
    .then(res=>{
       console.log("connectdb")
    }).catch(err=>{
       console.log("fail connect db",err);
    });

}
export default connectDB
