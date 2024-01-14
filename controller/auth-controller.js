const User=require("../models/user-model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");

const home=async (req,res)=>{
  try {
    
   res.status(200).send("how are you");


  } catch (error) {
    console.log(error);
  }
}
const register=async (req,res)=>{
    try {
        
     const {email,username,password}=req.body;
     let userExist= await User.findOne({email:email});
     if(userExist){
      return res.status(400).json({msg:"email already"});
     }
     const user=new User;
     user.email=email;
     user.username=username;
     user.password=password;
    
    userExist=await user.create({email:email,username:username,password:password});
     await user.save();
     const payload=user.tokenPayload();
     const token=await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:eval(process.env.EXPIRES_IN)});
       res.status(201).cookie('token',token,{
        expiresIn:eval(process.env.EXPIRES_IN),
        httpOnly:true,
        sameSite:"none"
    }).json({msg:"userCreated",token:token,user:user});


    } catch (error) {
      console.log(error);
        res.status(500).json({mssg:"internal server error",err:JSON.stringify(error)})
    }
}



///login

 const login=async(req,res)=>{
  try {
    const {email,password}=req.body;
    const userExist=await User.findOne({email});
      
    if(!userExist){ return res.status(400).json({message:"Invalid Credentials"});}
    
    //const user=(userExist.password===password)
    if(userExist.password===password){
      const payload=userExist.tokenPayload();
      const token=await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:eval(process.env.EXPIRES_IN)});
      res.status(200).cookie('token',token,{
        expiresIn:eval(process.env.EXPIRES_IN),
        httpOnly:true,
        sameSite:"none"
    }).json({
        msg:"Login successful",
        
        token:token
      });
    }
    else{
    res.status(401).json({message:"Invalid Credentials"})

    }


  } catch (error) {
    res.status(500).json("internal server error");
  }

 }
const isValidUser=async(req,res)=>{
  try{
    const token=req.cookies?.token||req.headers['token'];
    if(!token) return res.status(200).json({success:false});
    console.log(token);
    const dt=jwt.verify(token,process.env.SECRET_KEY);
    if(!dt)
    {
        return res.status(200).json({success:false});

    }
    else
    {
        return res.status(200).json({success:true}); 
    }
  }
  catch(err)
  {
    return res.status(500).json({success:false,mssg:err}); 
  }

}


module.exports={home,register,login,isValidUser};