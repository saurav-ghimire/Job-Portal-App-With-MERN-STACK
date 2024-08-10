import Jobs from "../models/jobs.model.js";

export const postJob = async (req,res) => {
  try {
    const {title, description, requirements, salary, location, jobType, position, experience, companyId} = req.body;
    const userId = req.id;
    if(title || description || requirements || salary || location || jobType || position || experience || companyId){
      return res.status(400).json({message:'Some Fields Are Empty', success:false});
    }
    const job = await Jobs.create({
      title,
      description,
      requirements : requirements.split(','),
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
export const getAllJobs = async(req,res)=> {
  try {
    const jobs = await Jobs.find();
    return res.status(200).json({jobs, success:true});
  } catch (error) {
    console.log(error)
  }
}