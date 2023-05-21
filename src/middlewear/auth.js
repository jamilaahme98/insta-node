import { userModel } from './../../DB/model/user.model.js';
import jwt from 'jsonwebtoken';
export const roles = {
  Admin:'Admin',
  User:'User',
}
export const auth = (accessRoles=[])=>{
    return async (req,res,next)=>{
     let {token} = req.headers;
      if(!token.startsWith(process.env.BEARERKEY)){
        res.status(400).json({message:'invalied berar key'});
      }else{
        token = token.split(process.env.BEARERKEY)[1];
        const decoded = jwt.verify(token,process.env.AUTHTOKEN);
        if(!decoded){
          res.status(400).json({message:'invalied berar key'});
        }else{
            const user = await userModel.findById(decoded.id).select("_id role");
            if(!user){
              res.status(401).json({message:'not register user'});
            }else{
              if(!accessRoles.includes(user.role)){
                res.status(403).json({message:'not authorized user'})
              }else{
                req.user = user;
                next();
              }
            }
        }
      }
    }
    
}