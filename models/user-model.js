const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema({

 email:{
    type:String,
    required:true,
 },
 username:{
  type:String,
  required:true,
 },
password:{
    type:String,
    required:true,
}

}

);

// userSchema.pre('save',async function(){
// const user=this;
// if(user.isModified('password')){
//     next();
// }
//   try {
    
//    const saltRound=await bcrypt.genSalt(10);
//    const hash_password=await bcrypt.hash(user.password,saltRound);
//    user.password=hash_password;
//   } catch (error) {
//     next(error)
//   }

          
// })

// userSchema.methods.generateToken= function(){
//    try {
//      return jwt.sign({
//         userId:this._id.toString(),
//         email:this.email,
//         isAdmin:this.isAdmin,
//      },chutiya,{
//         expiresIn:"30d",
//      });

//    } catch (error) {
//      console.error(error);
//    }
// };
userSchema.methods.tokenPayload=function(){
  return{
      user_id:this._id,
      email:this.email,
      
  }
}
const User=new mongoose.model("User",userSchema);
module.exports=User;