import mongoose from "mongoose";
import Jobs from "../models/jobs.model.js";

export const postJob = async (req,res) => {
  try {
    const {title, description, requirements, salary, location, jobType, position, experience, companyId} = req.body;
    
    const userId = req.id;
    if(!title || !description || !requirements || !salary || !location || !jobType || !position || !experience || !companyId){
      return res.status(400).json({message:'Some Fields Are Empty', success:false});
    }
    const job = await Jobs.create({
      title,
      description,
      requirements: typeof requirements === 'string' ? requirements.split(',') : requirements || [],
      salary: Number(salary),
      location,
      jobType,
      position,
      experienceLevel:experience,
      companyId,
      created_by : userId
    });
    return res.status(200).json({message:'New Job Created', job ,success:true})
  } catch (error) {
    console.log(error)
  }
}
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: 'Invalid Job ID', success: false });
    }

    const { title, description, requirements, salary, location, jobType, position, experience, companyId } = req.body;
    const updateData = { title, description, requirements, salary, location, jobType, position, experience, companyId };

    // Use `await` to get the updated job object
    const job = await Jobs.findByIdAndUpdate(jobId, updateData, { new: true });

    if (!job) {
      return res.status(404).json({ message: 'Job Not Found', success: false });
    }

    return res.status(200).json({ message: 'Job Listing Updated', job, success: true });
  } catch (error) {
    console.log(error);
  }
};


export const getAllJobs = async(req,res)=> {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or:[
        {title:{$regex:keyword,$options:"i"}},
        {description:{$regex:keyword,$options:"i"}},
      ]
    }
    const jobs = await Jobs.find(query);
    if(!jobs){
      return res.status(404).json({message:'Jobs Not Found', success:false});  
    }
    return res.status(200).json({jobs, success:true});
  } catch (error) {
    console.log(error);
  }
}


export const getJobsById = async(req,res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Job ID', success: false });
    }
    const job = await Jobs.findById(id);
    if(!job){
      return res.status(404).json({ message: 'Job Not Found', success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error) 
  }
}

export const getAdminJobs = async(req,res)=> {
  try {
    const adminId = req.id;
    const jobs = await Jobs.find({created_by: adminId});
    if(jobs.length < 1){
      res.status(404).json({ message: 'Job Not Found', success: false });
    }
    res.status(200).json({jobs, success: false });
  } catch (error) {
    
  }
}