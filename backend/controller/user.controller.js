import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const register = async(req,res) => {
  try {
    const {fullname,email,phonenumber,password, role} = req.body;
    if(!fullname || !email || !phonenumber || !password || !role){
      return res.status(400).json({message:'Something is Missing', success:false});
    }
    let isExist  = await User.findOne({email});
    console.log(isExist)
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
    let isExist = await User.findOne({email});
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

export const updateProfile = async (req,res)=>{

  try {
    const {fullname,email,phonenumber, bio, skills} = req.body;
    if(!fullname || !email || !phonenumber || !bio || !skills){
      return res.status(400).json({message:'Something is Missing', success:false});
    }

    const skillsArray = skills.split(',');
    const userId = req.id;
    let user = await User.findById({userId});
    if(!user){
      return res.status(400).json({message:'User not found', success:false});
    }

    // update data
    user.fullname = fullname
    user.email = email
    user.phonenumber = phonenumber
    user.bio = bio
    user.skills = skillsArray

    await user.save();

    user = {
      _id:user._id,
      fullname:user.fullname,
      email:user.email,
      phonenumber:user.phonenumber,
      role:user.role,
      profile:user.profile
    }

    return res.status(200).json({message:'User Update Successfully', user, success:true});
  } catch (error) {
    
  }

}