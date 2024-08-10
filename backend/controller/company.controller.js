import mongoose from "mongoose"
import Company from "../models/company.model.js"

export const registerCompany = async(req,res) => {
  try {
    const {companyname} = req.body
    if(!companyname){
      return res.status(400).json({
        message:'Company Name is required',
        success:false
      })
    }

    let company = await Company.findOne({name:companyname, userId:req.id});
    if(company){
      return res.status(400).json({message:'Company Already Exist', success:false});
    }
    company = await Company.create({
      name : companyname,
      userId: req.id
    })
    return res.status(201).json({message:'Company Successfully Created', company, success:true});

  } catch (error) {
    console.log(error)
  }
}

export const getCompany = async (req,res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({userId});
    if(companies.length < 1){
      return res.status(404).json({message:'Companies Not Found', success:false})
    }
    return res.status(200).json({companies, success:true})
  } catch (error) {
    console.log(error)
  }
}

export const getCompanyById = async(req,res) => {
try {
  const companyId = req.params.id;
  
  // Validate if companyId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res.status(400).json({ message: 'Invalid Company ID', success: false });
  }

  

  const company = await Company.findById(companyId);

  if(!company){
    return res.status(404).json({message:'Company Not Found', success:false}) 
  }
  
  return res.status(200).json({company, success:true});

} catch (error) {
  console.log(error)
}
}

export const updateCompany =async(req,res)=>{
  try {
    const companyId = req.params.id;
      // Validate if companyId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res.status(400).json({ message: 'Invalid Company ID', success: false });
  }

    const {name, description, website, location}  = req.body;
    const updateData = {name, description, website, location};
    const company = await Company.findByIdAndUpdate(companyId, updateData, {new:true});
    if(!company){
      return res.status(404).json({message:'Company Not Found', success:false});
    };
    
    return res.status(200).json({
      message:'Company Information Updated',
      success:true
    });
  } catch (error) {
    console.log(error);
  }
}


export const deleteCompany = async (req,res) => {
  try {
    const companyId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: 'Invalid Company ID', success: false });
    }
    const isExist = await Company.findById(companyId);
    if(!isExist){
      return res.status(404).json({message:'Company Not Found', success:false});
    }
    await Company.findByIdAndDelete(companyId);
    return res.status(201).json({message:'Company Successfully Deleted', success:true});
    

  } catch (error) {
    console.log(error);
  }
}