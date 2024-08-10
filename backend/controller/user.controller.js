import jwt from "jsonwebtoken";
import User from "../models/user.model";
import bcrypt from 'bcryptjs';

export const register = async(req,res) => {
  try {
    const {fullname,email,phonenumber,password, role} = req.body;
    if(!fullname || !email || !phonenumber || !password || !role){
      return res.status(400).json({message:'Something is Missing', success:false});
    }
    let isExist  = await User.find({email});
    if(isExist){
      return res.status(400).json({message:'Account already exist with this email', success:false});
    }
    const hashPassword = await bcrypt.hash(password, 8);
    await User.create({
      fullname,
      email,
      phonenumber,
      password : hashPassword,
      role
    });
    return res.status(200).json({message:'Account Successfully Created', success:true});
  } catch (error) {
    console.log('Error', error);
    res.json({error})
  }
}

export const login = async (req,res) => {
  try {
    const {email, password, role} = req.body;
    if(!email || !password || !role){
      return res.status(400).json({message:'Something is Missing', success:false});
    }
    const isExist = await User.findOne({email});
    if(!isExist){
      return res.status(400).json({message:'Incorrect Email or Password', success:false});
    }
    const isPasswordMatch = await bcrypt.compare(password, isExist.password);
    if(!isPasswordMatch){
      return res.status(400).json({message:'Incorrect Email or Password', success:false});
    }

    // checkRole
    if(role !== isExist.role){
      return res.status(400).json({message:'Account doesnot exist with the current role ', success:false});
    }

    const tokenData = {
      userId : isExist._id,
      role:isExist.role
    }
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET,{expiresIn:'1d'});
    
    isExist = {
      _id:isExist._id,
      fullname:isExist.fullname,
      email:isExist.email,
      phonenumber:isExist.phonenumber,
      role:isExist.role,
      profile:isExist.profile
    }

    return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
      message:`Welcome Back ${isExist.fullname}`,
      success:true,
      token:token
    });


  } catch (error) {
    console.log('Error', error)
  } 
}


export const logout = async (req,res) => {
  try {
    return res.status(200).cookie("token","",{maxAge:0}).json({message:'Logout Successfully', success:true});
  } catch (error) {
    console.log(error)
  }
}